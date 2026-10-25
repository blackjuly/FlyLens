# 飞镜下载站

这是一个可直接放进独立公开仓库的 GitHub Pages 静态站，只包含产品介绍与下载入口，不包含飞镜 App 源码，也不把 APK 提交进 Git 历史。

## 推荐的仓库结构

建议新建一个公开仓库，例如 `flylens-download`，把本目录内的文件复制到该仓库根目录。应用源码继续留在原来的私有仓库或本地。

为什么要分开：

- GitHub Free 的 Pages 需要公开仓库；Pages 网站本身始终公开。
- 私有仓库里的 Release 附件需要登录并具备权限，不能作为公开下载地址。
- 单独的下载仓库只公开 Landing Page、发布说明和 APK Release，不会暴露 App 源码。

## 发布前配置

编辑 `site-config.js`：

```js
window.FLYLENS_SITE = {
  repository: "https://github.com/你的用户名/flylens-download",
  apkAsset: "flylens.apk",
  version: "3.20",
  qrImage: ""
};
```

页面的下载按钮和二维码会使用这个稳定地址：

```text
https://github.com/你的用户名/flylens-download/releases/latest/download/flylens.apk
```

以后发布新版本时，只要 Release 附件继续命名为 `flylens.apk`，页面和二维码地址都不用改。

## 发布 APK

1. 在公开下载仓库中创建 Release，例如 tag `v3.20`。
2. 上传 APK，附件名必须是 `flylens.apk`。
3. 将 Release 标记为最新正式版本，不要只保存成 draft。
4. 用浏览器无登录状态打开稳定下载地址，确认可以直接下载。

APK 不要直接 commit 到仓库；它应只作为 Release asset 上传。

## 开启 GitHub Pages

1. 打开公开下载仓库的 `Settings → Pages`。
2. 在 `Build and deployment → Source` 中选择 **GitHub Actions**。
3. 推送到 `main` 后，`.github/workflows/pages.yml` 会自动部署。
4. 部署完成后，页面地址通常是：

```text
https://你的用户名.github.io/flylens-download/
```

## 二维码策略

未配置仓库地址时，页面显示占位二维码。填入 `repository` 后，页面会生成指向 GitHub Release 稳定下载地址的二维码。

正式发布时建议把二维码固化成本地文件，避免依赖在线二维码服务：把生成好的 SVG 保存为 `assets/download-qr.svg`，然后设置：

```js
qrImage: "assets/download-qr.svg"
```

收到最终 GitHub 仓库地址后，可以在发布前完成这一步。

## 本地预览

```powershell
python -m http.server 4173
```

然后打开 `http://localhost:4173/`。
