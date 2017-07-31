var gulp = require('gulp');
var gulpInject = require('gulp-inject');
var nodemon = require('nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];


gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], { read: false });
    var injectOptions = {
        ignorePath: '/public'
    };
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };
    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(gulpInject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});


gulp.task('serve', ['inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: jsFiles
    }

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('restarting');
        });
});