// src/components/ui/AppIcon.tsx

import { HugeiconsIcon } from "@hugeicons/react";

export type AppIconDefinition = readonly (readonly [string, Record<string, string | number>])[];

interface AppIconProps {
  icon: AppIconDefinition;
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
