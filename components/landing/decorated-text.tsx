import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DecoratedTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  bordered?: boolean;
  showIcons?: boolean;
  iconClassName?: string;
  glowEffect?: boolean;
  flicker?: boolean;
  delay?: number; // new prop
}

function DecoratedText({
  text,
  children,
  className,
  bordered = true,
  showIcons = true,
  iconClassName,
  glowEffect = true,
  flicker = true,
  delay = 0, // default to no delay
}: DecoratedTextProps) {
  const content = text || children;

  return (
    <motion.span
      className={cn(
        "group/decorated relative inline-block",
        bordered && "border border-foreground/20",
        className
      )}
      {...(flicker && {
        initial: { opacity: 1 },
        animate: { opacity: [1, 0.4, 1, 0.2, 1] },
        transition: {
          duration: 0.6,
          delay,
          ease: "easeInOut",
        },
      })}
    >
      {/* TEXT */}
      <span className="relative z-10 inline-block leading-none">{content}</span>

      {/* CORNER ICONS */}
      {showIcons && (
        <>
          <Icon
            className={cn(
              "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 text-foreground/50",
              iconClassName
            )}
          />
          <Icon
            className={cn(
              "absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 h-2.5 w-2.5 text-foreground/50",
              iconClassName
            )}
          />
          <Icon
            className={cn(
              "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 text-foreground/50",
              iconClassName
            )}
          />
          <Icon
            className={cn(
              "absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 h-2.5 w-2.5 text-foreground/50",
              iconClassName
            )}
          />
        </>
      )}
    </motion.span>
  );
}

function Icon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      <rect
        x="8"
        y="8"
        width="8"
        height="8"
        rx="1.5"
        transform="rotate(45 12 12)"
        fill="currentColor"
      />
    </svg>
  );
}

export { DecoratedText };
