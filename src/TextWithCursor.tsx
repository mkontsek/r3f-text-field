import React from "react";
import { Mesh } from "three";

import { KeyboardInterceptContext } from "./context";
import { TextCursor } from "./cursor";
import { Text } from "./Text";
import { Vec3 } from "./Vec3";
import { Padding } from "./types";
import { getCursorPosition } from "./utils";

type Props = {
  position: Vec3;
  width: number;
  color?: string;
  fontSize?: number;
  padding: Padding;
};

export function TextWithCursor({
  position,
  color = "black",
  fontSize = 0.6,
  width,
  padding,
}: Props) {
  const { buffer, font, cursorIndex } = React.useContext(
    KeyboardInterceptContext
  );
  const textRef = React.useRef<Mesh>();
  const cursorTextRef = React.useRef<Mesh>();

  const textShapes = font?.generateShapes(buffer, fontSize);
  const cursorShapes = font?.generateShapes(
    buffer.slice(0, cursorIndex),
    fontSize
  );
  const cursorPosition = getCursorPosition({
    position,
    width,
  });

  return (
    <group position={position.raw()}>
      <Text
        myRef={cursorTextRef}
        position={cursorPosition}
        padding={padding}
        shapes={cursorShapes}
        isTransparent
      />
      <Text
        myRef={textRef}
        position={cursorPosition}
        padding={padding}
        shapes={textShapes}
        color={color}
      />
      <TextCursor
        textMesh={cursorTextRef.current}
        position={cursorPosition}
        fontSize={fontSize}
      />
    </group>
  );
}
