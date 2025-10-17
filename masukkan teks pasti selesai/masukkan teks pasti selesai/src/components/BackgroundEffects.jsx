import React, { memo } from "react";
export const BackgroundEffects = memo(() => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    {/* Dynamic gradient background */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900" />

    {/* Animated gradient overlays */}
    <div className="absolute inset-0">
      <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute w-full h-full animate-pulse bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.08),transparent_35%)]" />
    </div>

    {/* Animated blobs */}
    <div className="absolute inset-0">
      <div className="absolute -top-48 left-0 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute -top-48 right-0 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-48 left-1/2 w-96 h-96 bg-green-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
    </div>

    {/* Enhanced overlay */}
    <div
      className="absolute inset-0 bg-[linear-gradient(rgba(50,50,50,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,50,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        transform:
          "perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(100px)",
      }}
    />
  </div>
));
