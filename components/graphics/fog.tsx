import React from "react"

interface FogLayerProps {
  className?: string,
  colour?: string,
  opacity?: string,
  height?: string,
  style?: React.CSSProperties,
}

export function Fog() {
  return (
    <div className="absolute inset-0 z-[5]">
      <FogLayer
        className="animate-fog-slow scale-100"
        colour="255, 255, 255"
        opacity="0.13"
        height="12%"
      />
      <FogLayer
        className="animate-fog-medium scale-100"
        colour="255, 255, 255"
        opacity="0.20"
        height="50%"
      />
      <FogLayer
        className="animate-fog-fast scale-100"
        colour="255, 255, 255"
        opacity="0.13"
        height="88%"
      />
    </div>
  )
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
      <div className={`absolute inset-y-0 left-0 w-[200%] flex ${className}`}>
        <div className="w-1/2 h-full" style={gradient} />
        <div className="w-1/2 h-full" style={gradient} />
      </div>
    </div>
  )
}