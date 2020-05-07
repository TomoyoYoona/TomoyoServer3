const env=process.env.NODE_ENV;//环境变量

let MYSQL_CONF;
let REDIS_CONF;

//两个配置信息分别为开发环境时和生产环境时。
if (env==='dev'){
    //mysql的配置
    MYSQL_CONF={
        host:'localhost',
        user:'root',
        password:'8918501110',
        port:'3306',
        database:'myblog'
    }
    //redis的配置
    REDIS_CONF={
        port:8891,
        host:'127.0.0.1',
        password:'lyhredis19268'
    }
}
if(env==='production'){
    MYSQL_CONF={
        host:'localhost',
        user:'root',
        password:'8918501110',
        port:'3306',
        database:'myblog'
    }
    REDIS_CONF={
        port:8891,
        host:'127.0.0.1',
        password:'lyhredis19268'
    }
}
module.exports={MYSQL_CONF,REDIS_CONF}