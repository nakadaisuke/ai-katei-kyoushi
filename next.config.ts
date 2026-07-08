import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ローカルの開発サーバーに 127.0.0.1 やLAN内の別ホスト名からアクセスすると、
  // Next.jsがdevリソース（HMRなど）を同一オリジンでないとしてブロックし、
  // ページは表示されてもクリックが効かなくなることがあるための対策。
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.0.7"],
};

export default nextConfig;
