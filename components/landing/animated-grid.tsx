"use client";

import { motion } from "framer-motion";

export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Multiple Gradient Blobs */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]" />

      <motion.div
        className="absolute top-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-accent opacity-10 blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-secondary opacity-15 blur-[110px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Dots Pattern */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            style={{
              left: `${(i * 17 + 10) % 100}%`,
              top: `${(i * 23 + 15) % 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Diagonal Lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-foreground to-transparent top-1/4 rotate-12" />
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-foreground to-transparent top-2/4 -rotate-12" />
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-foreground to-transparent top-3/4 rotate-6" />
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent/5 to-transparent" />
    </div>
  );
}
