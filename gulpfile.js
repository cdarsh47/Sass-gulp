var gulp=require('gulp');
var util=require('gulp-util');
var sass=require('gulp-sass');
var autoprefixer=require('gulp-autoprefixer');
var minifycss=require('gulp-minify-css');
var rename=require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var tinypng = require('gulp-tinypng-unlimited');
var log=util.log;
gulp.task('default',function(){
	console.log('p');
});
/*var sassFiles='sass-design.scss',cssDest='styles/';
gulp.task('styles',function(){
	gulp.src(sassFiles).pipe(sass().on('error',sass.logError)).pipe(gulp.dest(cssDest));
});
gulp.task('watch',function(){
	gulp.watch(sassFiles,['styles']);
});*/
var sassFiles='sass-design.scss',cssDest='styles/',minifyDest='./styles/minified/';
var jsFiles='./js/*.js',miniFiles='./js/dist/*.js';
var imgSrc='./images/*',miniDest='./compressed/';
gulp.task("sass",function(){
  log("generate css files"+(new Date()).toString());
  gulp.src(sassFiles).pipe(sass({style:'expanded'}))
  					 .pipe(autoprefixer("last 3 version","ie 8","ie 9"))
  					 .pipe(gulp.dest(cssDest))
  					 .pipe(rename({suffix:'.min'})).pipe(minifycss())
  					 .pipe(gulp.dest(minifyDest));
});

gulp.task('scripts',function(){
   log("js file minification");
   gulp.src(jsFiles).pipe(uglify()).pipe(gulp.dest('./js/dist'));
});

gulp.task('concat',function(){
  log("Concatinating the minified files");
  //gulp.src(['./js/dist/temp.js','./js/dist/BrandControllers.js']).pipe(concat('all.js')).pipe(gulp.dest('./js/dist'));
  gulp.src(miniFiles).pipe(concat('all.js')).pipe(gulp.dest('./js/combined'));
});

gulp.task('sass-watch',function(){
  log("Watching scss files for modifications");
  gulp.watch(sassFiles,['sass']);
});

gulp.task('js-watch',function(){
  log("Watching js files for modifications");
  gulp.watch(jsFiles,['scripts']);
});

gulp.task('image-min',function(){
  log("Minifying the images");
  //gulp.src(imgSrc).pipe(imagemin([imagemin.jpegtran({progressive:true}),imagemin.optipng({optimizationLevel:5})])).pipe(gulp.dest(miniDest));
  gulp.src(imgSrc).pipe(tinypng()).pipe(gulp.dest(miniDest));
});
//gulp.task('jsfire',['scripts','concat']);