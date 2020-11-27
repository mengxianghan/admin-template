# 后台模板

## 发布流程
```text
1. 安装依赖
2. 代码打包（针对要发布的环境进行打包，打包后的文件存放在 dist 目录下）
3. 复制 dist 目录下代码进行发布
```

## 安装依赖
```
npm install
or
# 推荐使用
npm install --registry https://registry.npm.taobao.org
```

### 本地运行
```
npm run serve
```

### 开发环境
```
npm run build:dev
```

### 测试环境
```
npm run build:test
```

### 预生产环境
```
npm run build:pre
```

### 生产环境
```
npm run build:prod
```

### 性能分析
```
npm run build:report
```

### 配置代理
```
location /api/ {
    rewrite /api/(.*?)$ /$1 break;
    proxy_pass https://zsback-test.53zaixian.com;
}
```
