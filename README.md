## 项目建立
### nodejs后端建立
首先，根据`后端配置笔记.md`中的 `配置koa2` 和 `配置pm2` 过程生成一个开发koa2和pm2的开发环境。然后在脚手架中编写服务端代码。

配置并开启redis、mysql和nginx服务。

### 前端静态代码
编写前端静态页面，并使用 `http-server -p 8001` 开启httpserver服务

### 前后端联调
上述配置完成后，进入后端文件夹`npm run dev`开启后端服务，同时开启所需的所有服务。使用浏览器访问，并调试。

## 上传至服务器
在云端服务器中重新进行后端、前端的配置，并使用ftp上传自己的相应的项目代码文件至相应的文件夹中。再次调试

## 站点的更新
我们使用github在本地监测代码更新，每次根据github的更新来手动将更新应用到云端服务器中。


## 站点功能设计
目前为止，仅限本人编写博客，并提供编辑页面（由于限制编辑人员，所以内容可直接为html代码）

提供一个隐藏的登录url，使用数据库中的（目前）唯一的一个用户来登录。不提供用户注册

提供游客评论功能，记录评论内容、游客ip、掩名、发表时间、id以及对应的blogid到数据库中。删除评论暂时只能直接对数据库操作

## 前后端接口设计
`/api/blog/list`    列出博客列表

>如果list后带有参数 `?isadmin=1` 则显示用户的博客管理界面（当然要先判断已否登录）

`/api/blog/detail`  博客详细信息

`/api/blog/update`  更新博客

`/api/blog/new`     新建博客

`/api/blog/del`     删除博客

`/api/user/login`   用户登录

`/api/serverInfo`   获取访问次数等可以公开的信息

`/api/guest/newComment`    发表游客评论

需要使用post请求。内含ip、fakeName、content、blogId这几个键值

`/api/guest/commentList`    获取评论



如果服务器遭受内网arp攻击，则会表现为大量的内网数据流入流出





- 修改各个配置文件中的www文件路径为www.js
- 修改jquery、moment、zh-cn为本地
- 修改为bootstrap4 同时修改navbar部分的代码
- 增加图标