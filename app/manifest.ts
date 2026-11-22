import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chase Nexus",
    short_name: "Nexus",
    description: "Connect. Create. Discover. The social platform from Chase Studios.",
    start_url: "/",
    display: "standalone",
    background_color: "#09060f",
    theme_color: "#140b22",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "192x192 512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
