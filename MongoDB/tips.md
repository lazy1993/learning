# MongoDB 入门篇

> https://www.cnblogs.com/clsn/p/8214194.html

## 数据库管理系统

* 数据（英语：data），是指未经过处理的原始记录。  

* 数据库管理系统（英语：database management system，缩写：DBMS） 是一种针对对象数据库，为管理数据库而设计的大型电脑软件管理系统。  

* 数据库管理系统主要分为俩大类：RDBMS、NoSQL。  

## NoSQL 是什么？  

* NoSQL是对不同于传统的关系数据库的数据库管理系统的统称。  

* 两者（RDBMS 和 NoSQL）存在许多显著的不同点，其中最重要的是NoSQL不使用SQL作为查询语言。其数据存储可以不需要固定的表格模式，也经常会避免使用SQL的JOIN操作，一般有水平可扩展性的特征。  

* 对NoSQL最普遍的解释是“非关联型的”，强调Key-Value Stores和文档数据库的优点，而不是单纯的反对RDBMS。  

* NoSQL中的四大家族主要是：列存储、键值、图像存储、文档存储。  

* NoSQL的优势：高可扩展性、分布式计算、没有复杂的关系、低成本、架构灵活、半结构化数据。  

* MongoDB 的缺点：  
    多表关联： 仅仅支持Left Outer Join  
    SQL 语句支持： 查询为主，部分支持  
    多表原子事务： 不支持  
    多文档原子事务：不支持  
    16MB 文档大小限制，不支持中文排序 ，服务端 Javascript 性能欠佳  

* MongoDB 的优势：  
    📢 MongoDB是开源产品

    📢 On GitHub Url：https://github.com/mongodb

    📢  Licensed under the AGPL，有开源的社区版本

    📢 起源& 赞助by MongoDB公司，提供商业版licenses 许可

    这些优势造就了mongodb的丰富的功能：

  JSON 文档模型、动态的数据模式、二级索引强大、查询功能、自动分片、水平扩展、自动复制、高可用、文本搜索、企业级安全、聚合框架MapReduce、大文件存储GridFS  



* BSON是由10gen开发的一个数据格式，目前主要用于MongoDB中，是MongoDB的数据存储格式。  

* MongoDB中document以BSON形式存放  

* MongoDB适用场景：网站数据、缓存等大尺寸、低价值的数据。在高伸缩性的场景，用于对象及JSON数据的存储。  

* MongoDB 慎用场景：PB 数据持久存储大数据分析数据湖、搜索场景：文档有几十个字段，需要按照任意字段搜索并排序限制等、ERP、CRM或者类似复杂应用，几十上百个对象互相关联、需要参与远程事务，或者需要跨表，跨文档原子性更新的、100% 写可用：任何时间写入不能停。  

* MongoDB数据库默认是没有用户名及密码的，即无权限访问限制。  

* 用户创建语法：  
    {
      user: "<name>", 
      pwd: "<cleartext password>", 
      customData: { <any information> }, 
      roles: [ 
        { role: "<role>", 
        db: "<database>" } | "<role>", 
        ... 
      ] 
    }

* 语法说明：  

    user字段：用户的名字;

    pwd字段：用户的密码;

    cusomData字段：为任意内容，例如可以为用户全名介绍;

    roles字段：指定用户的角色，可以用一个空数组给新用户设定空角色；

    roles 字段：可以指定内置角色和用户定义的角色。  

*  创建管理员角色用户的时候，必须到admin下创建。 删除的时候也要到相应的库下操作。  





