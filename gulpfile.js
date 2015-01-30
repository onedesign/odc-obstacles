'use strict';

var gulp = require('gulp');

// Load Plugins

var $              = require('gulp-load-plugins')();
var browserSync    = require('browser-sync');

// STYLES

gulp.task('styles', function () {
  return gulp.src(('./styles/**/*.css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe($.size());
});

// TEMPLATES

gulp.task('templates', function() {
  return gulp.src(['index.html'])
    .pipe(browserSync.reload({stream:true, once: true}));
});

// SCRIPTS

gulp.task('scripts', function () {
  return gulp.src(['scripts/**/*.js'])
    .pipe(browserSync.reload({stream:true, once: true}));
});

// BROWSER-SYNC

gulp.task('browserSync', function() {
  browserSync.init(null,
    {
      open: false,
      browser: 'google chrome',
      server: {
          baseDir: "./"
      }
  });
});

// WATCH

gulp.task('watch', function () {
  gulp.watch('styles/**/*.css', ['styles']);
  gulp.watch('scripts/**/*.js', ['scripts']);
  gulp.watch(['index.html'], ['templates']);
});

// DEFAULT

gulp.task('default', ['templates', 'styles', 'scripts', 'browserSync', 'watch']);