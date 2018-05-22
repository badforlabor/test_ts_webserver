//gulpfile.js
    
let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsp = ts.createProject('tsconfig.json'); //ʹ��tsconfig.json�ļ�����tsc
let exec = require('child_process').exec;

let child;
//Ŀ¼����
const PATHS = {
	scripts:['./src/**/*.ts'],
	output:'./build',
};
//����ts�ļ�
gulp.task('build-ts',['restart'],function(){
	return gulp.src(PATHS.scripts)
		.pipe(tsp())
		.pipe(gulp.dest(PATHS.output));    
});
//����ts�ļ��仯
gulp.task('watch-ts',['build-ts'],function(){    
	gulp.watch(PATHS.scripts,['build-ts']);
});
//�Զ�����������
gulp.task('restart',function(){
	child = exec('supervisor -w build ./build/server.js',(error,stdout,stderr)=>{
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
		if (error !== null) {
			console.log(`exec error: ${error}`);
		}
	});
});
//��������
gulp.task('dev',['build-ts','restart','watch-ts']);