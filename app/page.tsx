import DonationCard from "./DonationCard";

const features = [
  {
    className: "feature-auto-format",
    title: "自动排版",
    body: "自动识别场头与正文，排成正确格式，并在场次目录中标记日/夜气氛。",
    image: "/feature-auto-format.webp",
    alt: "Tracé 自动识别剧本格式并在场次目录中标记日夜气氛",
    width: 3024,
    height: 1964,
  },
  {
    className: "feature-trace-document",
    title: ".trace 文稿",
    body: "纯文本格式让文稿保持轻盈，所有批注与灵感白板都会随文件一同保存。",
    image: "/feature-trace-document.webp",
    alt: "轻盈的 Tracé 纯文本文稿格式",
    width: 3024,
    height: 1964,
  },
  {
    className: "feature-themes",
    title: "选择主题",
    body: "在多种主题配色之间自由切换，让写作界面更贴近你的习惯。",
    image: "/feature-themes.webp",
    alt: "Tracé 多种剧本写作主题配色",
    width: 1486,
    height: 965,
  },
  {
    className: "feature-pdf-export",
    title: "PDF 导出",
    body: "自动排版首页，支持 US Letter 与 A4 页面，并提供多种导出字体。",
    image: "/feature-pdf-export.webp",
    alt: "Tracé 自动排版 PDF 首页与页面预览",
    width: 3024,
    height: 1964,
  },
  {
    className: "feature-card-wall",
    title: "卡片墙",
    body: "按剧本顺序或日/夜气氛浏览全部场次，从整体节奏重新看见故事。",
    image: "/feature-card-wall.webp",
    alt: "Tracé 按日夜气氛分类浏览剧本场次的卡片墙",
    width: 3456,
    height: 2161,
  },
];

const macDownloadHref =
  "https://github.com/JoeXie-trace/Trace-_Website/releases/download/v1.1/Trace_v1.1_macOS.dmg";

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="主导航">
        <a className="wordmark" href="#top" aria-label="Tracé 首页">
          Tracé<span className="wordmark-dot">.</span>
        </a>
        <div className="nav-links">
          <a href="#features">功能</a>
          <a href="#support">支持项目</a>
          <a
            href="mailto:yiqiaoxie33+trace@gmail.com"
            aria-label="通过邮件向 Tracé 提交问题反馈"
          >
            问题反馈
          </a>
          <a
            className="nav-social"
            href="https://www.xiaohongshu.com/user/profile/66015ece000000000600cc80"
            target="_blank"
            rel="noreferrer"
            aria-label="访问 Tracé 的小红书主页"
          >
            <img src="/xiaohongshu.png" alt="" aria-hidden="true" />
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-copy">
          <div className="hero-title-lockup">
            <h1>Tracé<span className="hero-title-dot">.</span></h1>
            <div className="hero-icon-stage">
              <img className="hero-title-icon" src="/trace-icon.png" alt="Tracé 应用图标" />
            </div>
          </div>
          <p className="hero-description">
            设计极简、功能好用的剧本写作软件，并且永久免费！
          </p>
          <div className="platform-downloads" aria-label="Tracé 平台下载">
            <div className="platform-option">
              <span className="platform-label">macOS</span>
              <a
                className="primary-button"
                href={macDownloadHref}
                download
                aria-label="下载 Tracé macOS 安装包"
              >
                <span className="apple-mark" aria-hidden="true"></span>
                下载
              </a>
            </div>
            <div className="platform-option">
              <span className="platform-label">iPadOS</span>
              <span className="coming-soon-button" aria-disabled="true">即将上线</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Tracé 在 MacBook 与 iPad 上的剧本编辑页面">
            <img
              className="hero-screenplay-preview"
              src="/script-page-preview.webp"
              alt="Tracé 在 MacBook 上的剧本编辑页面"
              width="2882"
              height="2059"
            />
            <img
              className="hero-ipad-preview"
              src="/ipad-device.webp"
              alt="Tracé 在 iPad 上的剧本页面"
              width="1617"
              height="972"
            />
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="features-heading">
          <h2>功能</h2>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <article className={`feature ${feature.className}`} key={feature.title}>
              <div className="feature-copy">
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
              <figure className="feature-image">
                <img
                  src={feature.image}
                  alt={feature.alt}
                  width={feature.width}
                  height={feature.height}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </article>
          ))}
        </div>
      </section>

      <section className="showcase" id="inspiration">
        <div className="showcase-copy">
          <h2>灵感模式。<br />故事不是列表，它是一张可以漫游的地图。</h2>
          <p>
            把剧本场次拖入无限白板，添加便签、文本与连接关系。
            所有灵感都跟随同一份 Tracé 文稿保存。
          </p>
          <ul>
            <li>在画布上自由排布所有场次</li>
            <li>场次卡片、便签、文本框与箭头</li>
            <li>每份文稿独立保存白板状态</li>
          </ul>
        </div>
        <figure className="showcase-image device-showcase-image">
          <img
            src="/灵感白板.webp"
            alt="Tracé 灵感白板界面"
            width="3895"
            height="2164"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      <section className="support" id="support">
        <div className="support-copy">
          <h2>Tracé 永久免费。<br />如果它帮你写完了一个故事，可以请我喝一杯<span className="donation-emoji">咖啡😊</span></h2>
          <p>
            制作Tracé的初衷是满足我在电脑和iPad之间接力写作剧本的需求。因为是出于个人需求，就肯定有许多功能上的局限性，如果你有很好的想法或者发现了bug。欢迎联系反馈，一起让这个软件变得更好
          </p>
        </div>
        <DonationCard />
      </section>

      <footer>
        <a className="wordmark footer-wordmark" href="#top">Tracé<span className="wordmark-dot">.</span></a>
        <div className="footer-links">
          <a href="mailto:yiqiaoxie33+trace@gmail.com">联系作者</a>
          <span>© 2026 Tracé</span>
        </div>
      </footer>
    </main>
  );
}
