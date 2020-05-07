const {exec,escape}=require('../db/mysql');
const xss=require('xss');

const newComment=async (commentData={})=>{
    let ipAdress=commentData.ip;
    let fakeName=xss(commentData.fakeName);
    let content=xss(commentData.content);
    let blogId=commentData.blogId;
    const createtime=Date.now();
    ipAdress=escape(ipAdress);
    fakeName=escape(fakeName);
    content=escape(content);
    let sql=`insert into comments (fakename,content,ip,createtime,blogid) values(
        ${fakeName},${content},${ipAdress},${createtime},${blogId}
    );`;
    const insertData=await exec(sql);
    return{
        id:insertData.insertId
    }

}

const commentList=async (blogId)=>{
    blogId=escape(blogId);
    let sql=`select * from comments where blogid=${blogId};`;
    return await exec(sql);
}


module.exports={
    newComment,
    commentList
}
