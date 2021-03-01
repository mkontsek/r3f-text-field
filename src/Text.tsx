import React from "react";
import { getTextPosition } from "./utils";

export function Text({
  shapes,
  position,
  color = "black",
  padding,
  isTransparent = false,
  myRef,
  ...restProps
}) {
  if (!shapes) {
    return null;
  }

  const textPosition = getTextPosition(position, padding);

  return (
    <mesh ref={myRef} {...restProps} position={textPosition.raw()}>
      <shapeGeometry args={[shapes]} />
      <meshBasicMaterial color={color} transparent={isTransparent} />
    </mesh>
  );
}
