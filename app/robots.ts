import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/team"],
            disallow: ["/api", "/dashboard", "/partner", "/admin", "/leaderboard"]
        }
    }
}