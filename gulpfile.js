'use strict';

const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const changed = require('gulp-changed');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const gulpStylelint = require('gulp-stylelint');
const imagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const imageminWebp = require('imagemin-webp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const posthtml = require('gulp-posthtml');
const posthtmlInclude = require('posthtml-include');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const svgstore = require('gulp-svgstore');
const uglify = require('gulp-uglify');

const paths = {
  SOURCE: 'source/',
  DEST: 'build/',
  CSS: {
    src: 'source/less/',
    dest: 'build/css/',
  },
  JS: {
    src: 'source/js/',
    dest: 'build/js/',
  },
  IMG: {
    src: 'source/img/',
    dest: 'build/img/',
  },
};

gulp.task('html', () =>
  gulp
    .src(paths.SOURCE + '*.html')
    .pipe(plumber())
    .pipe(
      changed(paths.DEST, {
        hasChanged: changed.compareContents,
      }),
    )
    .pipe(posthtml([posthtmlInclude()]))
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      }),
    )
    .pipe(gulp.dest(paths.DEST)),
);

gulp.task('css', () =>
  gulp
    .src(`${paths.CSS.src}/style.less`)
    .pipe(plumber())
    .pipe(
      changed(paths.CSS.dest, {
        hasChanged: changed.compareContents,
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(
      gulpStylelint({
        fix: true,
      }),
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.CSS.dest))
    .pipe(browserSync.stream()),
);


gulp.task('cssmin', () =>
  gulp
    .src(paths.CSS.src + 'style.less')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.CSS.dest)),
);

gulp.task('javascript', () =>
  gulp
    .src([paths.JS.src + '**/*.js'])
    .pipe(plumber())
    .pipe(
      changed(paths.JS.dest, {
        hasChanged: changed.compareContents,
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.JS.dest))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.JS.dest)),
);

gulp.task('images', () =>
  gulp
    .src(paths.IMG.src + '**/*.{jpg,jpeg,png,svg}')
    .pipe(plumber())
    .pipe(
      changed(paths.IMG.dest, {
        hasChanged: changed.compareLastModifiedTime,
      }),
    )
    .pipe(
      imagemin([
        imageminOptipng({
          optimizationLevel: 3,
        }),
        imageminJpegtran({
          progressive: true,
        }),
        imageminMozjpeg({
          quality: 85,
        }),
        imageminSvgo({
          removeViewBox: false,
        }),
      ]),
    )
    .pipe(gulp.dest(paths.IMG.dest)),
);

gulp.task('webp', () =>
  gulp
    .src(paths.IMG.src + '**/*.{png,jpg,jpeg}')
    .pipe(plumber())
    .pipe(
      changed(paths.IMG.dest, {
        extension: '.webp',
        hasChanged: changed.compareLastModifiedTime,
      }),
    )
    .pipe(
      imagemin([
        imageminWebp({
          quality: 90,
        }),
      ]),
    )
    .pipe(
      rename({
        extname: '.webp',
      }),
    )
    .pipe(gulp.dest(paths.IMG.dest)),
);

gulp.task('sprite', () =>
  gulp
    .src(paths.IMG.src + 'icon-*.svg')
    .pipe(plumber())
    .pipe(
      svgstore({
        inlineSvg: true,
      }),
    )
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(paths.IMG.dest)),
);

gulp.task('refresh', done => {
  browserSync.reload(), done();
});

gulp.task('browserSync', () =>
  browserSync.init({
    server: paths.DEST,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  }),
);

gulp.task('clean', () => del(paths.DEST));

gulp.task('copy', () =>
  gulp
    .src([paths.SOURCE + 'fonts/**/*.{woff,woff2}', paths.SOURCE + '*.ico'], {
      base: paths.SOURCE,
    })
    .pipe(plumber())
    .pipe(
      changed(paths.DEST, {
        hasChanged: changed.compareLastModifiedTime,
      }),
    )
    .pipe(gulp.dest(paths.DEST)),
);

gulp.task('build', gulp.series('css', 'cssmin', 'javascript', 'images', 'webp', 'sprite', 'copy', 'html'));
gulp.task('clean', gulp.series('clean'));
gulp.task('start', gulp.series('build', 'browserSync'));

gulp.watch(paths.CSS.src + '**/*.less', gulp.series('css', 'cssmin'));
gulp.watch(paths.IMG.src + '**/*.svg', gulp.series('images', 'refresh'));
gulp.watch(paths.IMG.src + '**/*.{png,jpg,jpeg}', gulp.series('images', 'webp', 'refresh'));
gulp.watch(paths.IMG.src + 'icon-*.svg', gulp.series('sprite', 'html', 'refresh'));
gulp.watch(paths.JS.src + '**/*.js', gulp.series('javascript', 'refresh'));
gulp.watch(paths.SOURCE + '*.html', gulp.series('html', 'refresh'));
gulp.watch(paths.SOURCE + '*.ico', gulp.series('copy', 'refresh'));
gulp.watch(paths.SOURCE + 'fonts/**/*.{woff,woff2}', gulp.series('copy', 'refresh'));
