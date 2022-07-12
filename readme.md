# 使用uni-app
官网地址

https://uniapp.dcloud.net.cn/

## 安装官方工具（推荐）

## 安装官方包（不推荐，有巨坑！完全没有维护过的文档。。。）

![image-20220711141003152](readme.assets/image-20220711141003152.png)

```
基于@vue框架：

Wepy框架
uni-app框架(国内推荐这个，兼容性好，模板多)
myvue框架

基于@React框架：

Remax框架
Taro框架
chameleon框架（推荐，原生支持跨端开发）

```

## 初始化项目

项目文件结构







推荐网路请求包

```
npm install @escook/request-miniprogram
```

全局状态插件

```
# wx官网文档推荐
npm i mobx-miniprogram mobx-miniprogram-bindings
# 基于uni-app则是vuex
npm i vuex


# 基于下一代全局状态插件(推荐，我也是基于它开发的。)
npm i pinia
```

