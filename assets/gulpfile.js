'use strict';

//plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');
var browserSync = require("browser-sync");
var uglify = require('gulp-uglify');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var reload = browserSync.reload;

//variables
var config = {
    server: {
        baseDir: "../home.html"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "slava.bedilo"
};
//image minify
gulp.task('imgmin', () => {
	return gulp.src('./img/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('../img'));
});


//Work with css
gulp.task('css', function () {
  gulp.src('./scss/**/*.scss')
    //sass to css
    .pipe(sass().on('error', sass.logError))
    //autoprefixes
    .pipe(autoprefixer())
    //css to min.css
    .pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../css'))
    .pipe(reload({ stream:true }));
});

//Work with js
gulp.task('scripts', function() { 
  gulp.src(['./js/*.js']) 
    .pipe(uglify().on('error', function(e){
        console.log(e);
    }))
    .pipe(gulp.dest('../js'));


}); 

//server
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: '../'
    }
  });

});

gulp.task('watch', function(){
  gulp.watch('scss/*.scss', ['css']);
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('../*.html').on("change", browserSync.reload);
});

//'Gulp' in console, and...
gulp.task('default', ['server', 'watch', 'scripts', 'css']);

//Other tasks
//delete unused css
gulp.task('uncss', function () {
    return gulp.src('../css/main.min.css')
        .pipe(uncss({
            html: ['../index.html']
        }))
        .pipe(gulp.dest('../css'));
});

//Task for sprites
gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('./img/sprite/*.*') // images for sprites
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
                algorithm: 'left-right',
                padding: 5,
            }));

    spriteData.img.pipe(gulp.dest('../img/'));
    spriteData.css.pipe(gulp.dest('../css/'));
});