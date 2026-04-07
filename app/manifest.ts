import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "الشركة الموريتانية للتسويق - Marketing & Digital Solutions",
    short_name: "RIM Marketing",
    description: "Agence de marketing digital en Mauritanie - Solutions créatives et stratégiques pour votre entreprise.",
    start_url: "/",
    display: "standalone",
    background_color: "#001f3f",
    theme_color: "#001f3f",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
