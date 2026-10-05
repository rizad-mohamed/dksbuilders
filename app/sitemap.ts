import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
 const url=process.env.NEXT_PUBLIC_SITE_URL;
 if(!url)return [];
 return ["","/projects","/careers"].map(path=>({url:new URL(path||"/",url).href}));
}