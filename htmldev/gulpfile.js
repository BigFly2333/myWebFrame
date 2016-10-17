/**
 * Created by xumin on 16/10/14.
 */
var gulp = require('gulp');
var watch = require('gulp-watch');
var changed = require('gulp-changed');
var less = require('gulp-less');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var base64 = require('gulp-base64');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var browsersync = require('browser-sync');
//var babel = require("gulp-babel");

gulp.task('default', ['watch']);

gulp.task('less', function(){
    return gulp.src('./src/less/**/*.less')//less源文件
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed('./dist/css', {extension: '.css'}))
        .pipe(less())    //执行编译
        .pipe(gulp.dest('./dist/css'));  //输出目录
});

gulp.task('sass', function(){
    return gulp.src('./src/scss/**/*.scss')//scss源文件
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed('./dist/css', {extension: '.css'}))
        .pipe(sass())    //执行编译
        .pipe(gulp.dest('./dist/css'));   //输出目录
});

gulp.task('watch',['browsersync'], function(){
    gulp.watch('./src/**/*.less', ['less']);
    gulp.watch('./src/**/*.scss', ['sass']);
    //gulp.watch('./src/**/*.js', ['babel']);
    //gulp.watch(config.images, ['images']);
});

gulp.task('base64',['less','sass'], function() {
    return gulp.src('./dist/css/**/*.css')
        .pipe(base64({
            baseDir: '',
            extensions: ['svg','gif','png', /\.jpg#datauri$/i],
            maxImageSize: 8 * 1024, // bytes
            debug: false
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('autoprefixer',['base64'], function () {
    return gulp.src('./dist/css/**/*.css')
        .pipe(autoprefixer({
            browsers: [
                "ie >= 8",
                "ie_mob >= 10",
                "ff >= 26",
                "chrome >= 30",
                "safari >= 6",
                "opera >= 23",
                "ios >= 5",
                "android >= 2.3",
                "bb >= 10"
            ],
            cascade: false}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('minifycss',['autoprefixer'], function() {
    return gulp.src('./dist/css/**/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('browsersync',['minifycss'], function() {
    browsersync({
        server: {
            baseDir: ''
        },
        port: 3001,
        files: [
            './dist/**/*.css',
            './dist/**/*.js',
            './img/**',
            './html/**/*.html'
        ]
    });
});


//gulp.task("babel", function () {
//    return gulp.src("./src/**/*.js")
//        .pipe(changed('./dist', {extension: '.js'}))
//        .pipe(babel({
//            presets: ['es2015']
//        }))
//        .pipe(gulp.dest("./dist"));
//});
