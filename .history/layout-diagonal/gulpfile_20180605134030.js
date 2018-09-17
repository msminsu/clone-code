const os = require('os');
const fs = require('fs');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const header = require('gulp-header');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const autoPrefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const zip = require('gulp-zip');
const home = os.homedir();

const ui_static = /^win/.test(process.platform) ? `//ui-static/wwwroot/promo/bns/history/2018/180607_warrior` : `/Volumes/wwwroot/promo/bns/history/2018/180607_warrior`;

const autoprefixer_browsers = ['last 4 version', 'not IE 8'];

const Path = {
    local: `${__dirname}`,
    
    local_src_sass: `${__dirname}/src/sass`,
    local_src_js: `${__dirname}/src/js`,
    local_src_img: `${__dirname}/src/img`,
    local_src_html: `${__dirname}/src/html`,
    
    local_dist_css: `${__dirname}/dist/css`,
    local_dist_js: `${__dirname}/dist/js`,
    local_dist_img: `${__dirname}/dist/img`,
    
    ui_static_css: `${ui_static}/css`,
    ui_static_js: `${ui_static}/js`,
    ui_static_img: `${ui_static}/img`
};

const banner = () =>{
    let date = new Date();
    return [
        '/**',
        ` * @project: 180607_warrior`,
        ` * @author: NCSOFT`,
        ' * @update : ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
        ' */', ''
    ].join('\n');
};

let compileJs = () =>{
    gulp.src(`${Path.local_src_js}/**/*.js`)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(Path.local_dist_js))
        .pipe(gulp.dest(Path.ui_static_js));
};

let compileSass = () =>{
    gulp.src(`${Path.local_src_sass}/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(header(banner()))
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(autoPrefixer(autoprefixer_browsers))
        .pipe(sourcemaps.write(`.`))
        .pipe(gulp.dest(Path.local_dist_css))
        .pipe(gulp.dest(Path.ui_static_css));
};

let minifyImg = (e) =>{
    let filePath = e && e.history[0];
    let event = e && e.event;
    
    filePath = filePath || `${Path.local_src_img}/**/*+(.png|.jpg|.gif)`;
    
    if(event === 'unlink'){
        let fileName = filePath.split('/').pop();
        fs.unlinkSync(`${Path.local_dist_img}/${fileName}`);
        fs.unlinkSync(`${Path.ui_static_img}/${fileName}`);
        
        return;
    }
    
    gulp.src([filePath])
        .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5})
            ])
        )
        .pipe(gulp.dest(Path.local_dist_img))
        .pipe(gulp.dest(Path.ui_static_img));
};

gulp.task('dev', () =>{
    compileJs();
    compileSass();
    // minifyImg();
    
    watch(`${Path.local_src_js}/**/*.js`, compileJs);
    // watch(`${Path.local_src_img}/**/*+(.png|.jpg|.gif)`, minifyImg);
    watch(`${Path.local_src_sass}/**/*.scss`, compileSass);
    
    watch(`${Path.local}/src/**/*`, (e) =>{
        console.log(`${e.event}: ${e.path.split('/').pop()}`);
    });
});

gulp.task('packaging', () =>{
    return gulp.src([`${Path.local}/dist/**/*`])
               .pipe(zip(`180607_warrior.zip`))
               .pipe(gulp.dest(`${home}/Desktop/packaging`));
});