import Image from "next/image";

interface PhysicianAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
}

export default function PhysicianAvatar({ size = "md" }: PhysicianAvatarProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-36 h-36",
  };

  const pxSizes = { sm: 40, md: 48, lg: 64, xl: 144 };

  return (
    <Image
      src="/doctor-photo.png"
      alt="Dr. Shahnawaz F Shah"
      width={pxSizes[size]}
      height={pxSizes[size]}
      className={`${sizeClasses[size]} rounded-full object-cover shadow-md border-2 border-white/20`}
      priority
    />
  );
}
