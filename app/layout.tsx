import "./globals.css";

export const metadata = {
  title: "Tracé - 极简中文剧本写作软件",
  description:
    "Tracé 是一款为 macOS 而生的极简中文剧本写作软件，提供场景目录、卡片墙、灵感白板与 PDF 导出。",
  icons: {
    icon: "/trace-icon.png",
    shortcut: "/trace-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
