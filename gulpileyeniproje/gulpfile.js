const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const minifyJS = require('gulp-minify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('img',() =>{
return  gulp.src('src/img/*')
.pipe(imagemin())
.pipe(gulp.dest('dist/img'))
.pipe(browserSync.stream());
});

gulp.task('html', () => {
    gulp.src('./*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('sass', () =>{
    gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/js/**/*.js", ['js']);
    gulp.watch("./*.html", ['html']);
});

gulp.task('default', () => {
    runSequence(
        'html',
        'img',
        'js',
        'sass',
        'browser-sync',
        'watch'
    );
});