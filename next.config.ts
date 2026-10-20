import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // imagem Docker enxuta: .next/standalone leva só o necessário para rodar (ver Dockerfile)
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  // o rodapé de debug que o site atual mostra não pode se repetir: nada de
  // poweredByHeader e nenhum modo de desenvolvimento em produção
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
