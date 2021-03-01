import React from "react";

import { MIN_DISTANCE, Vec3 } from "./Vec3";

type Props = {
  position: Vec3;
  height?: number;
  width: number;
};

export function Background({
  position,
  height = 1,
  width,
  ...restProps
}: Props) {
  return (
    <mesh {...restProps} position={position.raw()}>
      <boxBufferGeometry args={[width, height, MIN_DISTANCE]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
