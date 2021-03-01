import React from "react";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import { TextField } from "r3f-text-field";

import { Controls } from "./Controls";

export function App() {
  return (
    <Canvas style={{ background: "#696969" }}>
      <ambientLight />
      <Controls />
      <pointLight position={[10, 10, 10]} />

      <TextField
        defaultValue="Hello!"
        position={new Vector3(0, 0, 0)}
        onChange={(s: string) => console.log(s)}
        fontPath={`${process.env.PUBLIC_URL}/helvetiker_regular.typeface.json`}
      />
    </Canvas>
  );
}
