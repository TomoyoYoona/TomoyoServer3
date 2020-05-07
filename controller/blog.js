
const{exec,escape}=require('../db/mysql');
const xss=require('xss');
const removeRN=str=>{
    str=str.replace(/[\r\n]/g,'');
    return str;
}

const  getList=async (author,keyword)=>{
    author=escape(author);
    keyword=keyword===''?'':escape(keyword);
    let sql=`select * from blogs where 1=1 `;
    if(author!=="''"){
        sql+=`and author=${author} `;
    }
    if(keyword){
        sql+=`and title like '%${keyword}%' `;
    }
    sql+=`order by createtime desc;`;
    return await exec(sql);
}
const getDetail=async (id)=>{
    id=escape(id);
    let sql=`select * from blogs where id=${id}`;
    //这里因为select语句从数据库中返回json数组（虽然这里数组长度只有1），我们只需要取第一个就行，所以加个then
    const rows=await exec(sql);
    return rows[0];
}


const newBlog=async (blogData={})=>{
    let title=(blogData.title);
    let content=(blogData.content);
    let author=blogData.author;
    let catelog=blogData.catelog;
    const createtime=Date.now();
    title=escape(title);
    // content=removeRN(content);
    content=escape(content);
    author=escape(author);
    catelog=escape(catelog);
    let sql=`insert into blogs (title,content,createtime,author,catelog) values(
        ${title},${content},${createtime},${author},${catelog})`;
    const insertData=await exec(sql);
    return {
        id:insertData.insertId
    }
}


const updateBlog=async (id,blogData={})=>{
    let title=blogData.title;
    let content=blogData.content;
    let catelog=blogData.catelog;
    title=escape(title);
    // content=removeRN(content);
    content=escape(content);
    catelog=escape(catelog);
    const sql=`
    update blogs set title=${title},content=${content},catelog=${catelog} where id=${id};
    `;
    const data=await exec(sql);
    return data.affectedRows>0?true:false;
    
}
const delBlog=async (id,author)=>{
    id=escape(id);
    author=escape(author);
    const sql=`
    delete from blogs where id=${id} and author=${author};`;
    
    return await exec(sql).then(deleteData=>{
        return deleteData.affectedRows>0?true:false;
    })
}

const getTitleList=async (catelog)=>{
    const sql=`
    select id,title,createtime from blogs where catelog='${catelog}'`;
    return await exec(sql);

}

module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
    getTitleList
}