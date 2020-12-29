## XY Upload SDK DEMO
此项目是小鱼上传sdk的使用示例demo，包含单文件上传和多文件上传的使用方法

技术栈：react+typescript
### 1. 准备工作
在运行项目之前，请先在src/utils/config.ts中配置上传所需的信息
```javascript
// todo 第三方上传需配置信息
export const config ={
 // 必填：api 服务地址
  server: '',
  // 必填：企业id
  enterpriseId: '',
  // 必填：sdktoken
  sdkToken: '',
  // 必填：storeType
  storeType: '',
  // 选填：上传文件类型限制 例：['video/mp4','image/jpeg']，若不设置，可上传任何格式文件
  supportFileTypes: []
}
```
### 2. 运行项目
#### 安装
```
$ yarn install
or
$ npm install
```
#### 运行
```
$ yarn start
or
$ npm run start
```