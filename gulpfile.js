const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');
const plugins = require('gulp-load-plugins')();

const SRC = 'src';
const PUBLIC = './';


// Pug
gulp.task('pug', (done) => {
  gulp
    .src(`${SRC}/*.pug`)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError()
    }))
    .pipe(plugins.pug())
    .pipe(gulp.dest(PUBLIC));
  done();
});


// Styles
gulp.task('scss', (done) => {
  gulp
    .src(`${SRC}/*.scss`)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError()
    }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer(
      ['last 2 versions', '> 1%'],
      { cascade: false }
    ))
    .pipe(plugins.cssnano())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(PUBLIC));
  done();
});


// Scripts
gulp.task('js', () =>
  gulp
    .src(`${SRC}/*.js`)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError(err => ({
        title: 'Webpack',
        message: err.message
      }))
    }))
    .pipe(named())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(PUBLIC))
);


// Image optimizations
gulp.task('img', () =>
  gulp
    .src([`${SRC}/blocks/**/img/*.*`, `${SRC}/common/img/*.*`])
    .pipe(plugins.imagemin([
      imageminJpegRecompress({
        loops: 4,
        min: 50,
        max: 65,
        quality: 'high',
        strip: true,
        progressive: true
      }),
      imageminPngquant({quality: '50-80'})
    ]))
    .pipe(gulp.dest(`${PUBLIC}/img`))
);


// PNG-sprite
gulp.task('png-sprite', () => {
  const spriteData = gulp
    .src([`${SRC}/blocks/**/icon/*.*`, `${SRC}/common/icon/*.*`])
    .pipe(plugins.spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.scss',
      cssFormat: 'scss',
      algorithm: 'left-right',
      padding: 20,
      cssTemplate: './src/common/scss/sprite-template.scss'
    }));

  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(plugins.imagemin([
      imageminPngquant({quality: '50-80'}),
    ]))
    .pipe(gulp.dest(`${PUBLIC}`));

  const cssStream = spriteData.css
    .pipe(gulp.dest(`${SRC}/common/scss`));

  return merge(imgStream, cssStream);
});


// Clean
gulp.task('cleanImg', () => del(`${PUBLIC}/img`));
gulp.task('clean', gulp.parallel('cleanImg'));


// Server
gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: PUBLIC,
      index: 'index.html'
    },
    port: 8800,
    open: false,
    reloadOnRestart: true,
  });
});


// Watch
gulp.task('watch', () => {
  gulp.watch([
    `${SRC}/blocks/**/*.pug`,
    `${SRC}/common/pug/*.pug`,
    `${SRC}/index.pug`
  ]).on('change', gulp.series('pug', browserSync.reload));

  gulp.watch([
    `${SRC}/blocks/**/*.scss`,
    `${SRC}/common/scss/*.scss`,
    `${SRC}/style.scss`
  ]).on('change', gulp.series('scss', browserSync.reload));

  gulp.watch([
    `${SRC}/blocks/**/*.js`,
    `${SRC}/common/js.js`,
    `${SRC}/script.js`
  ]).on('change', gulp.series('js', browserSync.reload));

  gulp.watch([
    `${SRC}/blocks/**/img/*`,
    `${SRC}/common/img/*`
  ]).on('change', gulp.series('cleanImg', 'img', browserSync.reload));
});


// Default
gulp.task('default', gulp.series(
  gulp.parallel('clean', 'png-sprite'),
  gulp.parallel('img', 'pug', 'scss', 'js'),
  gulp.parallel('server', 'watch')
));
