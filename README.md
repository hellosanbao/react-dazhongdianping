
## create-react-app使用

全局安装create-react-app

```
npm i create-react-app
```

执行create-react-app初始化命令

```
npx create-react-app my-project
```

默认情况下，create-react-app会将webpack的一些配置放在`react-scripts`这个npm包中,如果想要修改默认配置，执行如下命令即可暴露出配置文件

```
npm run eject
```


## webpackDevServer服务器代理
老版本的create-react-app代理起来比较容易，只需要在`package.json`中增加一个代理字段即可，如下

`package.json`
```js
{
    //...
    //..
    //.
    "proxy":{
        "/api":{
            "target":"http://localhost:8000/"
        }
    }
}
```

而新版本的create-react-app这样写就会报错

```shell
When specified, "proxy" in package.json must be a string.
Instead, the type of "proxy" was "object".
Either remove "proxy" from package.json, or make it a string.
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! r-d-m@0.1.0 start: `react-scripts start`
npm ERR! Exit status 1
```

意思很明确，proxy字段需要的是字符串，而不是对象，而proxy如果只能穿简单的字符串，如下

```js
{
    //...
    //..
    //.
    "proxy":"http://localhost:8000/"
}
```

那么我们就只能代理一个域名,那么如果想代理多个域名怎么办呢？

可以借助`http-proxy-middleware`以及devScrver提供的一些钩子来实现代理

在露出create-react-app的devServer配置文件`config/webpackDevServer.config.js`可以看到

在devServer的before钩子函数中有这么一段

```js
    if (fs.existsSync(paths.proxySetup)) {
    // This registers user provided middleware for proxy reasons
    require(paths.proxySetup)(app);
    }
```
那么这里就是进行代理中间件注册的地方，根据配置代码可以查找到`paths.proxySetup`映射的就是`src/setupProxy.js`而且该文件导出的是一个function，接受的是express的app对象。

所以`src/setupProxy.js`中这样写即可添加代理中间件,devserver会自己加载这个文件并use你配置的代理中间件

```js
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost:8000/' }))
    app.use(proxy('/api2', { target: 'http://localhost:9090/' }))
}


```


## 本地数据mock

两种方式(推荐第二种，简单)：

第一种，本地起一台node服务器，将mock的数据以json文件的形式放在本地server中，然后通过代理到react项目上进行请求，本地起服务器可以借助`http-server`或者`anywhere`来实现，代理方法上面已讲

第二种，利用create-react-app自身的特性，将mock数据已json文件的形式放在项目根目录的publick目录下，例如：`publick/mock/data.json`
那么请求的时候直接`fetch('/mock.data.json')`即可



