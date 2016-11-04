//Plugins

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var del = require('del');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

//Patchs

var dir = 'app/';
var scss_patch = dir +'scss/';
var css_patch = dir +'css/';
var js_patch = dir +'js/';
var build = 'build';

//Tasks

//Sass to css + autoprefix + min
gulp.task('sass', function () {
    return gulp.src(scss_patch + 'simpleselect.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 25 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(css_patch));
});

//Browser sync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: dir,
            index: 'test.html'
        },
        notify: false
    });
});


//Watch

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch(scss_patch + '*.scss', ['sass']);
    gulp.watch(css_patch + '*.css', browserSync.reload);
    gulp.watch(js_patch + '*.js', browserSync.reload);
    gulp.watch(dir + '*.html', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync(build);
});

gulp.task('build', ['clean', 'sass'], function() {

    var buildcss = gulp.src(css_patch + '/simpleselect.css')
        .pipe(gulp.dest(build + '/css'));

    var buildmincss = gulp.src(css_patch + '/simpleselect.css')
        .pipe(cssnano())
        .pipe(rename('simpleselect.min.css'))
        .pipe(gulp.dest(build + '/css'));

    var buildjs = gulp.src(js_patch + '/simpleselect.js')
        .pipe(gulp.dest(build + '/js'));

    var buildminjs = gulp.src(js_patch + '/simpleselect.js')
        .pipe(uglify())
        .pipe(rename('simpleselect.min.js'))
        .pipe(gulp.dest(build + '/js'));


    var buildscss = gulp.src(scss_patch + '/simpleselect.scss')
        .pipe(gulp.dest(build + '/scss'));
});

