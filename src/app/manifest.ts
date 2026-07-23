import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nova Webs — Digital Excellence, Crafted.",
    short_name: "Nova Webs",
    description:
      "Lahore's premium web design agency. We craft websites that don't just look extraordinary — they convert.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#00E5FF",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
