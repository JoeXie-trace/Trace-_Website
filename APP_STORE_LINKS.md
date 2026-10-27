# App Store Connect 网页地址

新增文件：`public/privacy/index.html`、`public/support/index.html`、`public/info-pages.css`；首页页脚已加入链接。

当前 `vercel.json` 使用 `npm run build:static`，构建会将 public 内容复制至 dist，包含两页。无需新建仓库、数据库或登录系统。

部署现有官网后，以正式 HTTPS 域名为前缀填写：

- 隐私政策网址：`https://你的官网域名/privacy/`
- 技术支持网址：`https://你的官网域名/support/`
- 营销网址：`https://你的官网域名/`
- 可选隐私选择网址：`https://你的官网域名/privacy/#choices`

不要填写 GitHub 仓库文件编辑地址或 localhost。公开发布后，使用未登录浏览器确认两页可访问、联系邮箱正确，再填入 App Store Connect。

隐私文案基于当前 App 源码与既有官网邮箱，开发者 Yiqiao Xie；不包含自行假定的收集型 SDK 或固定保留期限。发布前复核实际使用的服务、诊断共享及支持邮箱处理方式与文案一致。新增服务时应同步更新政策和 App Store 隐私回答。

验证：`npm run build:static` 成功，本地浏览器能访问两页、展开 FAQ；本次未 commit/push 或部署。
