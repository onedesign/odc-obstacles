'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var Pageres = require('pageres');
var runSequence = require('gulp-run-sequence');

// STYLES

gulp.task('styles', function () {
  return gulp.src(('./styles/**/*.css'))
    .pipe(browserSync.reload({stream:true}));
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
      notify: false,
      browser: 'google chrome',
      port: 1111,
      server: {
          baseDir: "./"
      }
  });
});

// SCREENSHOTS

gulp.task('screenshot', ['styles', 'templates'], function () {
  return new Pageres({ delay: 2 })
    .src('localhost:1111', ['320x2500', '1200x2000'])
    .dest(__dirname + '/screenshots')
    .run();
});

// WATCH

gulp.task('watch', function () {
  gulp.watch('styles/**/*.css', ['styles', 'screenshot']);
  gulp.watch('scripts/**/*.js', ['scripts']);
  gulp.watch(['index.html'], ['templates', 'screenshot']);
});

// DEFAULT

gulp.task('default', function(callback) {
  runSequence(
    [
      'templates',
      'styles',
      'scripts',
      'browserSync',
      'watch'
    ],
    'screenshot',
    callback
  );
});
