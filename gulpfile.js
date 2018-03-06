var gulp = require('gulp');
var ts = require('gulp-typescript');
var Server = require('karma').Server;

gulp.task('default', ['build']);

gulp.task('build', ['build-html'], function () {
  return gulp.src('src/**/*.ts')
      .pipe(ts({
        noImplicitAny: true,
        outFile: 'main.js'
      }))
      .pipe(gulp.dest('docs'));
});

gulp.task('build-html', ['build-css'], function () {
  return gulp.src('src/index.html')
      .pipe(gulp.dest('docs'));
});

gulp.task('build-css', function () {
  return gulp.src('src/styles.css')
      .pipe(gulp.dest('docs'));
});

gulp.task('test', function (done) {
  Server.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function () {
    done();
  });
});
