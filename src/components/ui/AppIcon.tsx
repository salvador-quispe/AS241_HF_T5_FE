// src/components/ui/AppIcon.tsx

import { HugeiconsIcon } from "@hugeicons/react";

interface AppIconProps {
  icon: any;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function AppIcon({
  icon,
  size = 20,
  className = "",
  strokeWidth = 1.8,
}: AppIconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}