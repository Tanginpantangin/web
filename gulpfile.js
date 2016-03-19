'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

// Styles
gulp.task('styles', function() {
  return gulp.src(['app/**/*.less', '!app/bower_components/**/*.less', '!app/bower_components/**/*.css'], {
          base: './'
      })
      .pipe(less())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('./'));
});
