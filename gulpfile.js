var fs = require('fs'),
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  svgstore = require('gulp-svgstore'),
  svgmin = require('gulp-svgmin'),
  image = require('gulp-image'),
  cheerio = require('gulp-cheerio'),
  path = require('path'),
  postcss = require('gulp-postcss'),
  notify = require("gulp-notify"),
  flexibility = require('postcss-flexibility');

var src = {
  root: 'src',
  jade: 'src/jade/pages/**/*.jade',
  sass: 'app/assets/scss/*.scss',
  js: 'src/js/**/*.js',
  img: 'src/img/*',
  data: 'src/data/*.json',
  fonts: 'src/fonts/*'
};

var dest = {
  root: 'dist',
  css: 'app/assets/stylesheets/',
  js: 'dist/js',
  img: 'dist/img/',
  data: 'dist/data/',
  fonts: 'dist/fonts'
};

gulp.task('sass', function () {
  gulp.src(src.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'ie9'))
    .pipe(postcss([flexibility]))
    // .pipe(csso())
    .pipe(gulp.dest(dest.css))
    .pipe(notify("styles done"));
});

gulp.task('csso', function () {
  return gulp.src(dest.css + 'style.css')
    .pipe(csso())
    .pipe(gulp.dest(dest.css));
});

gulp.task('image', function () {
  gulp.src(src.img)
    .pipe(image())
    .pipe(gulp.dest(dest.img));
});

gulp.task('dev', ['sass'], function () {
  gulp.watch(src.sass, ['sass']);
});

gulp.task('default', ['dev']);
