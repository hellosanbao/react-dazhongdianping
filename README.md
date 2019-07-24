
### create-react-app使用

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