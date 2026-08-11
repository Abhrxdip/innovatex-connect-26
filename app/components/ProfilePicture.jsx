import Image from "next/image"

export default function PersonAvatar({ className = '', src, alt = "Profile Picture" }) {
    return src ? (
        <Image src={src} alt={alt} className={className} width={100} height={100} />
    ) : (
        <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="#1A2040" />
            <circle cx="40" cy="30" r="12" fill="#3B4370" />
            <ellipse cx="40" cy="58" rx="20" ry="14" fill="#3B4370" />
        </svg>
    );
}