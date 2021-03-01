import React from "react";
import { extend, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

export function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  // @ts-ignore
  return <orbitControls enablePan={false} args={[camera, domElement]} />;
}
