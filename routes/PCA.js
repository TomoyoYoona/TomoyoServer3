const {PCA,postFile,writeLog}=require('../controller/PCA');
const fs=require('fs');
const router=require('koa-router')();
const path=require('path');
const {SuccessModel,ErrorModel}=require('../model/resModel');
const loginCheck=require('../middleware/loginCheck');
const loginCheck_=require('../middleware/loginCheck_');


const send=require('koa-send');
const child_process=require('child_process');
const util=require('util');

router.prefix('/api/PCA');

//postFile路由用于接收并处理文件
//先使用postFile()函数接收文件，然后PCA()函数运行Python，得到结果文件，最后返回文件的id。然后客户端使用这个id加上文件名，请求结果文件。请求路由为getFile
//在得到结果文件时，需要使用writeLog()函数修改日志，增加文件id、用户名等信息
router.post('/postFile',loginCheck,async(ctx,next)=>{
    ctx.body={};
    console.log('开始上传数据...');
    postFile(ctx);
    console.log('开始修改日志...');
    const postResult=await writeLog(ctx);
    if(postResult.err){
        ctx.body=new ErrorModel('上传失败');
        return console.log('上传失败');
    }
    const id=postResult;
    console.log('开始处理数据...');



    //开始执行python文件：
    // const result=PCA(id);
    // if(result.errno){
        
    //     ctx.body=new ErrorModel('处理数据失败');
    //     return console.log('处理数据失败');
    // }
    // else{
    //     ctx.body.id=id;
    // }
    // const PCA=child_process.exec('python "./py/PCA PLSR.py"',(error,stdout,stderr)=>{
    //     if(error){
    //         return console.log('执行失败',stderr);
    
    //     }
    //     ctx.body.id=id;
    //     console.log('输出：',stdout);
    //     console.log('错误：',stderr);
    // })
    // PCA.on('exit',(code)=>{
    //     console.log('执行完毕，退出码：',code);
    //     return;
    // })
    // PCA.on('close',(code)=>{
    //     console.log('关闭：',code);
    //     return;
    // })
    // PCA.on('error',(code)=>{
    //     console.log('出错：',code);
    //     return;
    // })
    const exec= util.promisify(require('child_process').exec);
    const {stdout,stderr}=await exec('python "./py/PCA PLSR.py"');
    //ctx.body.id=id;
    console.log('输出：',stdout);
    console.log('错误：',stderr);
    return ;
})


//客户端请求文件，url格式为/getFile?f=pca_test&id=1。这里暂时没用到id
//注意需要登录确认，并且核实是否是本人的文件
router.get('/getFile',loginCheck_,async(ctx,next)=>{
    // if(!(ctx.query.f&&ctx.query.id)){
    //     ctx.body=new ErrorModel('不存在的url');
    //     return console.log('不存在的url');
    // }
    //文件名在url的ctx.query.f里面
    // const fileName=path.join(__dirname,'../','py',ctx.query.f+'.xlsx');
    const fileName='./py/'+ctx.query.f+'.xlsx';
    const f=fs.createReadStream(fileName);
    // ctx.set('Content-Type','application/force-download');
    ctx.attachment(ctx.query.f);
    await send(ctx,fileName);
    console.log('名字：',fileName);
    return;
})

// router.post('/postFile',loginCheck,async(ctx,next)=>{
//     fs.readFile('../py/log.json',(err,data)=>{
//         if(err){
//             return console.log('读取文件失败');
//         }
//         var logData=data.toString();
//         logData=JSON.parse(logData);
//         const id=logData.data

//         const file=ctx.request.body.files.file;
//         const reader=fs.createReadStream(file.path);
//         const saveName;
//     })

// })


router.post('/uploadfile', async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../','public') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";
});


module.exports=router;