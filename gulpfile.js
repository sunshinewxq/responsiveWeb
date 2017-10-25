// 引入6个插件
var gulp = require('gulp');
var rev = require('gulp-rev');//哈希码
var revReplace = require('gulp-rev-replace');//将index文件更新成最新
var useref = require('gulp-useref');//自动打包
var filter = require('gulp-filter');//筛选和恢复
var uglify = require('gulp-uglify');//压缩js
var csso = require('gulp-csso');//压缩css

gulp.task('default',function(){
    var jsFilter = filter('**/*.js',{restore: true});
    var cssFilter = filter('**/*.css',{restore: true});
    var indexHtmlFilter = filter(['**/*','**/index.html'],{restore: true});

    return gulp.src('src/index.html')//将文件拿过来
        //文件流
        .pipe(useref())//分析注释标志
        .pipe(jsFilter)//将JS文件压缩出来
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)//将CSS文件压缩出来
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())//更新
        .pipe(gulp.dest('dist'));
});
