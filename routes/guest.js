const router=require('koa-router')();
const {
    newComment,
    commentList
}=require('../controller/guest');
const {
    SuccessModel,
    ErrorModel
}=require('../model/resModel');

router.prefix('/api/guest');

router.get('/commentList',async (ctx,next)=>{
    if(!ctx.query.blogId){
        ctx.body=new ErrorModel('获取评论列表失败');
        return;
    }
    const blogId=ctx.query.blogId;
    const listData=commentList(blogId);
    ctx.body=new SuccessModel(listData);

})

router.post('/newComment',async(ctx,next)=>{
    const body=ctx.request.body;
    const result=await newComment(body);
    ctx.body=new SuccessModel(result);

})

module.exports=router;