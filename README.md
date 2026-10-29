# 飞镜 FlyLens

**手机是镜头，也是提词器。**

飞镜是一款 Android 摄像头与语音跟随提词工具。连接电脑时，用手机给 OBS 提供画面，同时看着手机上的文稿录制；只用手机拍口播时，让提词器悬浮在原厂相机上，跟着你的声音自动滚动。

[下载 Android APK](https://github.com/blackjuly/FlyLens/releases/latest/download/flylens.apk) · [访问官网 / 扫码下载](https://blackjuly.github.io/FlyLens/) · [完整使用指南](https://blackjuly.github.io/FlyLens/guide.html) · [留言与反馈](https://github.com/blackjuly/FlyLens/issues/1)

## 两种拍摄方式

### 手机 + OBS：边拍摄，边看稿

把 Android 手机变成电脑上的摄像头，适合直播、教程录制和视频会议等场景。

- 通过 Wi-Fi 或 USB 连接 OBS，使用 DroidCam OBS 插件接收手机画面。
- 提词器只显示在手机上，提词文字不会进入 OBS 的摄像画面。
- 支持分辨率、帧率、H.264 / H.265、镜头和音频等连接与拍摄设置。
- 文稿靠近手机镜头，录制时可以看着镜头自然表达。

[查看 OBS 插件安装与连接步骤 →](https://blackjuly.github.io/FlyLens/guide.html#obs)

### 原厂相机 + 悬浮提词器：只拿手机也能拍口播

把提词器切换成独立悬浮窗，再打开手机自带相机录像。

- 提词器悬浮在相机上方，位置、大小与高度可调。
- 开启语音跟随后，按朗读进度自动滚动，已读文字逐渐变灰。
- 可以在应用内提词器与悬浮提词器之间切换。
- 也可使用定速滚动，并随时手动调整阅读位置。

**录像时要继续语音跟随，请在系统无障碍设置里开启「飞镜共享麦克风」。** 首次切换时可按提示点击「去开启」。不同手机系统的兼容情况可能不同；暂时无法共享声音时，可以改用定速滚动。

[查看悬浮提词器设置 →](https://blackjuly.github.io/FlyLens/guide.html#overlay) · [查看共享麦克风开启方法 →](https://blackjuly.github.io/FlyLens/guide.html#accessibility)

## 提词按你的节奏来

- **离线语音识别**：在手机本地识别朗读内容，音频不上传。
- **阅读进度可见**：已读内容变灰，位置标记帮助找到当前进度。
- **显示可调**：修改文稿、字号、滚动速度与镜像，适应不同拍摄距离。
- **高度单独调整**：拖动底部把手改变高度，也支持双指缩放与手动滑动。

共享麦克风无障碍服务用于跟读采音和承载提词悬浮窗，不读取屏幕内容、不记录按键，也不代替你点击。

## 第一次使用

1. [下载 APK](https://github.com/blackjuly/FlyLens/releases/latest/download/flylens.apk)，安装到 Android 手机上，按提示允许相机与麦克风权限。
2. 在飞镜右上角「⋮ → 设置 → 提词器 → 文字」中粘贴文稿，调整字号与语音跟随。
3. **搭配 OBS**：电脑安装 [OBS Studio](https://obsproject.com/download) 和 [DroidCam OBS 插件](https://droidcam.app/obs/)，添加 DroidCam OBS 来源，填写飞镜顶部「状态」里的 **Wi-Fi IP** 与端口 **4747**。
4. **只用手机录像**：点击蓝色「提」按钮，选择「切换到悬浮提词器」，按提示开启共享麦克风，再打开原厂相机录像。

搭配 OBS 使用语音跟随时，请关闭 DroidCam OBS 来源中的「启用音频 / Enable Audio」，并在 OBS 中使用电脑或其他麦克风。手机音频推流会暂停飞镜的语音跟随。

详细的操作截图、USB 连接与常见问题见 [完整使用指南](https://blackjuly.github.io/FlyLens/guide.html)。

## 安装与兼容

- 支持 Android 6.0 及以上。
- 原厂相机录像时的悬浮语音跟随建议使用 Android 10 及以上，实际效果取决于手机系统。
- 当前为 MVP 体验版，欢迎反馈手机型号、系统版本和使用中遇到的问题。

## 交流与支持

有问题或建议，欢迎到 [留言与反馈](https://github.com/blackjuly/FlyLens/issues/1) 分享；也可以在 [官网留言区](https://blackjuly.github.io/FlyLens/#comments) 阅读大家的反馈。

如果飞镜帮你更自然地完成了录制，欢迎在仓库右上角点一个 **Star**，支持后续更新。
