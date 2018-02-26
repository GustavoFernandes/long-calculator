var gulp = require('gulp');
var ts = require('gulp-typescript');
var Server = require('karma').Server;

gulp.task('default', function () {
  return gulp.src('src/**/*.ts')
      .pipe(ts({
        noImplicitAny: true,
        outFile: 'main.js'
      }))
      .pipe(gulp.dest('dist'));
});

gulp.task('test', function (done) {
  Server.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function () {
    done();
  });
});
