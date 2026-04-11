import React from "react";

interface FogLayerProps {
  className?: string;
  colour?: string;
  opacity?: string;
  height?: string;
  style?: React.CSSProperties;
}

export function Fog() {
  return (
    <div className="absolute inset-0 z-5">
      <FogLayer
        className="scale-100 animate-fog-slow"
        colour="255, 255, 255"
        opacity="0.13"
        height="12%"
      />
      <FogLayer
        className="scale-100 animate-fog-medium"
        colour="255, 255, 255"
        opacity="0.20"
        height="50%"
      />
      <FogLayer
        className="scale-100 animate-fog-fast"
        colour="255, 255, 255"
        opacity="0.13"
        height="88%"
      />
    </div>
  );
}

function FogLayer({
  className = "",
  colour = "255, 255, 255",
  opacity = "0.1",
  height = "50%",
  style,
}: FogLayerProps) {
  const gradient = {
    background: `radial-gradient(ellipse 70% 60% at 50% ${height}, rgba(${colour}, ${opacity}), transparent)`,
    ...style,
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute inset-y-0 left-0 flex w-[200%] ${className}`}>
        <div className="h-full w-1/2" style={gradient} />
        <div className="h-full w-1/2" style={gradient} />
      </div>
    </div>
  );
}
