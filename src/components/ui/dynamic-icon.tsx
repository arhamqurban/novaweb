import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function DynamicIcon({ name, size = 24, className }: DynamicIconProps) {
  const iconName = name as keyof typeof LucideIcons;
  const IconComponent = LucideIcons[iconName] as React.ComponentType<{
    size?: number;
    className?: string;
  }> | undefined;

  if (!IconComponent) {
    return <span className={cn("block", className)} style={{ width: size, height: size }} />;
  }

  return <IconComponent size={size} className={cn("shrink-0", className)} />;
}
