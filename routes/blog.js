const router=require('koa-router')();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
    getTitleList
}=require('../controller/blog');
const {SuccessModel,ErrorModel}=require('../model/resModel');
const loginCheck=require('../middleware/loginCheck');

router.prefix('/api/blog');

router.get('/list',async (ctx,next)=>{
    let author=ctx.query.author||'';
    const keyword=ctx.query.keyword||'';
    if(ctx.query.isadmin){
        console.log('is admin')
        if(ctx.session.username==null){
            //未登录
            console.error('is admin,but no login');
            ctx.body=new ErrorModel('未登录');

            return;
        }
        author=ctx.session.username;
    }

    const listData=await getList(author,keyword);
    ctx.body=new SuccessModel(listData);
})

router.get('/titleList',async (ctx,next)=>{
    const catelog=ctx.query.catelog;
    const listData=await getTitleList(catelog);
    ctx.body=new SuccessModel(listData);
    
})

router.get('/detail',async(ctx,next)=>{
    const detailData=await getDetail(ctx.query.id);
    ctx.body=new SuccessModel(detailData);
})


router.post('/new',loginCheck,async (ctx,next)=>{
    const body=ctx.request.body;
    body.author=ctx.session.username;
    const data=await newBlog(body);
    ctx.body=new SuccessModel(data);

})

router.post('/update',loginCheck,async (ctx,next)=>{
    const ifSuccess=await updateBlog(ctx.query.id,ctx.request.body);
    ctx.body=ifSuccess?(new SuccessModel()):(new ErrorModel('更新博客失败'));

})

router.post('/del',loginCheck,async (ctx,next)=>{
    const ifSuccess=await delBlog(ctx.query.id,ctx.session.username);
    ctx.body=ifSuccess?(new SuccessModel()):(new ErrorModel('删除博客失败'));

})


module.exports=router