const {ErrorModel}=require('../model/resModel');
const fs=require('fs');
const path=require('path');

module.exports=async(ctx,next)=>{
    // const data=await fs.readFile.__promisify__('../py/log.json');
    // fs.readFile.__promisify__().then()
    // fs.readFile('../py/log.json',(err,data)=>{        
    //     if(err){
    //         ctx.body=new ErrorModel('读取log失败');
    //         return console.error('读取log失败2');
    //     }
        
    // })
    const fileName=path.join(__dirname,'../','py','log.json');
    const promise=new Promise((resolve,reject)=>{
        fs.readFile(fileName,async(err,data)=>{
            if(err){
                ctx.body=new ErrorModel('读取log失败');
                return console.error('读取log失败1');
            }
            var logData=data.toString();
            logData=JSON.parse(logData);
            resolve(logData);
            return;
        })
        return;
    })
    const logData=await promise;
    for(var i=0;i<logData.data.length;i++){
        if(logData.data[i].username===ctx.session.username){
            await next();
            return;
        }
    }
    // logData.data.forEach(async(item) => {
    //     if(item.username==ctx.session.username){
    //         await next();
    //         return;
    //     }
        
    // });

    //ctx.body=new ErrorModel('用户不匹配')
}