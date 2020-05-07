const child_process=require('child_process');
const fs=require('fs');
const path=require('path');
const pyname=path.join(__dirname,'../','py','PCA PLSR.py')


//以后这个要加id
const excepy=(id)=>{
    try{
        console.log('开始运行py');
        return child_process.exec.__promisify__(`python ${pyname}`);

    }
    catch(err){
        console.log('运行时出问题');
        return;
    }

}

module.exports=excepy;