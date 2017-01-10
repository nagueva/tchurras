var gulp  = require('gulp'),
  concat  = require('gulp-concat'),
  uglify  = require('gulp-uglify'),
  htmlmin = require('gulp-htmlmin'),
  rimraf  = require('rimraf'),
  sass    = require('gulp-sass'),
  panini  = require('panini'),
  babel   = require('gulp-babel'),
  browserSync = require('browser-sync').create();

var project_url = 'tchurras.dev';

function build_html(done){
  gulp.src('./src/pages/**/*.html')
    .pipe(panini({
      root: './src/pages',
      layouts: './src/layouts',
      partials: './src/partials',
      data: './src/data'
    }))
    .pipe(htmlmin({collapseWhitespace: false, removeComments: true}))
    .pipe(gulp.dest('./dist'));
  done();
}
function reset_html(done){
  panini.refresh();
  done();
}
function build_css(done){
  gulp.src('./src/assets/css/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
  done();
}
function build_js(done){
  gulp.src([
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/foundation-sites/js/foundation.core.js',
    './bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
    './bower_components/foundation-sites/js/foundation.util.keyboard.js',
    './bower_components/foundation-sites/js/foundation.util.box.js',
    './bower_components/foundation-sites/js/foundation.util.triggers.js',
    './bower_components/foundation-sites/js/foundation.util.motion.js',
    './bower_components/foundation-sites/js/foundation.reveal.js',
    './src/assets/js/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'));
  done();
}
function build_img(done){
  gulp.src('./src/assets/img/*')
    .pipe(gulp.dest('./dist/assets/img'));
  done();
}
gulp.task('build:html', build_html);
gulp.task('build:css', build_css);
gulp.task('build:js', build_js);
gulp.task('build:img', build_img);
gulp.task('build', gulp.parallel(build_html, build_css, build_js, build_img));

function clean(done){
  rimraf('./dist',done);
}
gulp.task('clean', clean);

function browser_sync(done){
  browserSync.init({
    proxy: project_url,
    open:false,
    logLevel: 'silent'
  });
  console.log('\033[1mAccess URL\033[0m: http://'+project_url+':3000');
  done();
}
gulp.task('browser:sync', browser_sync);

function watch(done){
  gulp.watch('./src/pages/**/*.html')
    .on('all', gulp.series(build_html, browserSync.reload));
  gulp.watch('./src/{layouts,partials,data}/**/*')
    .on('all', gulp.series(reset_html, build_html, browserSync.reload));
  gulp.watch('./src/assets/css/*.scss', build_css);
  gulp.watch('./src/assets/js/*.js')
    .on('all', gulp.series(build_js, browserSync.reload));
  gulp.watch('./src/assets/img/*', build_img);
  done();
}
gulp.task('watch', watch);

gulp.task('serve', gulp.series(
  clean,
  gulp.parallel(build_html, build_css, build_js, build_img),
  watch,
  browser_sync
));
