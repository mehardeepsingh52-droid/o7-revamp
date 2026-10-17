import type { MetadataRoute } from "next";
import { company } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: company.url, changeFrequency: "monthly", priority: 1 }];
}
