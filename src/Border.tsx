import React from "react";

import { MIN_DISTANCE, Vec3 } from "./Vec3";

type Props = {
  position: Vec3;
  height?: number;
  width: number;
  borderWidth?: number;
};

export function Border({
  position,
  height = 1,
  width,
  borderWidth = 0.2,
  ...restProps
}: Props) {
  const borderPosition = position.moveX(-MIN_DISTANCE).lift(-MIN_DISTANCE);

  return (
    <mesh {...restProps} position={borderPosition.raw()}>
      <boxBufferGeometry
        args={[width + borderWidth, height + borderWidth, MIN_DISTANCE]}
      />
      <meshStandardMaterial color="darkgrey" />
    </mesh>
  );
}
