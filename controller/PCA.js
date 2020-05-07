const execpy=require('../utils/execpy');
const path=require('path');
const fs=require('fs');
const {SuccessModel,ErrorModel}=require('../model/resModel');

const PCA=async(id)=>{
    const data=await execpy(1);
    if(!data.stderr){
        console.log('执行py出错');
        return new ErrorModel();
    }
    console.log('error:',data.stderr);
    console.log('out:',data.stdout);
    return new SuccessModel();
}

const postFile=(ctx)=>{

    // const promise=new Promise((resolve,reject)=>{
        //从客户端接收文件
        // console.log('Tomoyo:',ctx.request.files.file);
        const file=ctx.request.files.file;
        const readStream=fs.createReadStream(file.path);
        let saveName='siliao-end-2.xlsx';
        // console.log('fuK');
        saveName=path.join(__dirname,'../','py',saveName);
        const writeStream=fs.createWriteStream(saveName);
        readStream.pipe(writeStream);
        return ctx.body.text='上传成功';
    // })
    // return promise;
}
const writeLog=async(ctx)=>{
    //读取并修改../py/log.json文件
    const promise=new Promise((resolve,reject)=>{
        const fileName=path.join(__dirname,'../','py','log.json');
        fs.readFile(fileName,(err,data)=>{
            if(err){
                resolve({err:1});
                ctx.body=new ErrorModel('读取log失败');
                return console.error('读取log失败');
            }
            var logData=data.toString();
            logData=JSON.parse(logData);
            var id=logData.total+1;
            logData.data.push({
                id:id,
                username:ctx.session.username
            }); 
            var str=JSON.stringify(logData);
            fs.writeFile(fileName,str,(err)=>{
                if(err){
                    resolve({err:2});
                    return console.log('写入log失败');
                }
            })
            resolve(id);

        })

    })
    return promise;
}



module.exports={PCA,postFile,writeLog};