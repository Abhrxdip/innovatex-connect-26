import { MetadataRoute } from "next";



export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.SITE_URL || "http://localhost:3000"
    return [
        {
            url: baseUrl,
            changeFrequency: "daily",
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: `${baseUrl}/team`,
            changeFrequency: "daily",
            lastModified: new Date(),
            priority: 1,
        }
    ]
}