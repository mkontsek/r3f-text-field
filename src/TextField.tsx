import React, { Suspense } from "react";
import { Vector3 } from "three";

import { Vec3 } from "./Vec3";
import { Background } from "./Background";
import { KeyboardInterceptProvider } from "./context";
import { TextWithCursor } from "./TextWithCursor";
import { Padding } from "./types";
import { Border } from "./Border";

type Props = {
  defaultValue?: string;
  position: Vector3;
  width?: number;
  padding?: Padding;
  onChange?(buffer: string): void;
  fontPath: string;
  borderWidth?: number;
};

export function TextField({
  defaultValue,
  position,
  width = 5,
  padding = { left: 0.1 },
  borderWidth,
  onChange = () => {},
  fontPath,
}: Props) {
  const vec3position = new Vec3(position.x, position.y, position.z);

  return (
    <Suspense fallback="">
      <KeyboardInterceptProvider
        onChange={onChange}
        fontPath={fontPath}
        width={width}
        defaultValue={defaultValue}
      >
        <group position={vec3position.raw()}>
          <Border
            position={vec3position}
            width={width + padding.left}
            borderWidth={borderWidth}
          />
          <Background position={vec3position} width={width + padding.left} />
          <TextWithCursor
            position={vec3position}
            width={width}
            padding={padding}
          />
        </group>
      </KeyboardInterceptProvider>
    </Suspense>
  );
}
