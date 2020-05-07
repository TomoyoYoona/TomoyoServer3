const fs = require('fs');
const child_process = require('child_process');
const iconv=require('iconv-lite');
const path=require('path');
const spawn=require('cross-spawn');

const p=path.join(__dirname,'./','py','fuck');
console.log(p);
(async()=>{

    const child=spawn('python',['"PCA PLSR.py']);
    
    for(var i=0; i<3; i++) {
    //创建三个子进程
        var workerProcess = child_process.exec('python support.py '+i, { encoding:'buffer' }, function (error, stdout, stderr) {
            if (error) {
                console.log(error.stack);
                console.log('Error code: '+error.code);
                console.log('Signal received: '+error.signal);
            }
            var out= iconv.decode(stdout, 'cp936');
            console.log('stdout输出'+out);
            console.log('stderr: ' + stderr);
        });
        workerProcess.on('exit', function (code) {
            console.log('子进程已退出，退出码 '+code);
        });
    
    
        // var workprocess=await child_process.exec.__promisify__('python support.py'+i,{encoding:'buffer'});
        // console.log(workprocess.stderr);
        // console.log(workprocess.stdout);
    
    }
    

})()