// Require plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    chmod = require('gulp-chmod'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    data = require('gulp-data'),
    fs = require('fs'),
    imagemin = require('gulp-imagemin'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util');

var config = {
    src: 'src/',
    dest: 'dist/',
    sassPattern: 'sass/**/*.+(sass|scss)',
    jsPattern: 'js/**/*.js',
    jadePattern: 'jade/**/*.jade',
    imgPattern: 'img/**/*',
    production: !!util.env.production // Those two exclamations turn undefined into a proper false.
};

// Tasks
gulp.task('html', function(){
    gulp.src(config.src + 'jade/**/!(_)*.jade')
    .pipe(plumber())
    .pipe(data(function(file){
        return JSON.parse(fs.readFileSync('./db.json'));
    }))
    .pipe(jade({
        pretty: config.production ? false : true
    }))
    .pipe(gulp.dest(config.dest));
});

gulp.task('css', function(){
    gulp.src(config.src + 'sass/style.+(sass|scss)')
    .pipe(plumber())
    .pipe(config.production ? util.noop() : sourcemaps.init())
    .pipe(sass({
        outputStyle: (config.production ? 'compressed' : 'nested')
    }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(autoprefixer({
        browsers: ['last 5 versions']
    }))
    .pipe(config.production ? util.noop() : sourcemaps.write())
    .pipe(gulp.dest(config.dest + 'css'));
});

gulp.task('js', function(){
    return gulp.src([
        config.src + 'js/script.js',
        config.src + 'js/1-modules/sidebar.js'
    ])
    .pipe(plumber())
    .pipe(concat('script.min.js'))
    .pipe(config.production ? uglify() : util.noop())
    .pipe(gulp.dest(config.dest + 'js'));
});

gulp.task('img', function(){
    return gulp.src(config.src + config.imgPattern)
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(chmod(666))
    .pipe(gulp.dest(config.dest + 'img'));
});

gulp.task('server', function(){
    connect.server({
        root: config.dest,
        port: 8000
    });
});

// Watch task
gulp.task('watch', function(){
    gulp.watch(config.src + config.jadePattern, ['html']);
    gulp.watch(config.src + config.sassPattern, ['css']);
    gulp.watch(config.src + config.jsPattern, ['js']);
});

// Default task
gulp.task('default', ['html', 'css', 'js', 'img', 'server', 'watch']);
