import React from "react";
import { useFrame } from "react-three-fiber";
import { Mesh } from "three";

import { blink, getTextSize } from "../utils";
import { MIN_DISTANCE, Vec3 } from "../Vec3";
import { KeyboardInterceptContext } from "../context";
import {
  CHAR_PAD,
  CURSOR_BLINK_INTERVAL,
  CURSOR_HEIGHT,
  CURSOR_WIDTH,
  getWhitespacePadding,
} from "./Service";

type Props = {
  position: Vec3;
  color?: string;
  textMesh?: Mesh;
  fontSize: number;
};

export function TextCursor({
  position,
  textMesh,
  color = "black",
  fontSize,
  ...restProps
}: Props) {
  const { buffer, cursorIndex, handleTextTooWide } = React.useContext(
    KeyboardInterceptContext
  );
  const [cursorPosition, setCursorPosition] = React.useState(position);
  const meshRef = React.useRef({ visible: true });

  useFrame(() => {
    blink(meshRef, CURSOR_BLINK_INTERVAL);
  });

  React.useEffect(() => {
    const size = getTextSize(textMesh);

    if (!size) {
      return;
    }

    const paddingIfAtLeastOneChar = size.x > 0 ? CHAR_PAD : 0;
    const whitespacePadding = getWhitespacePadding(buffer, cursorIndex);
    const newWidth = size.x + paddingIfAtLeastOneChar + whitespacePadding;
    const newX = position.x + newWidth;

    if (!handleTextTooWide(newWidth)) {
      setCursorPosition(cursorPosition.setXYZ({ x: newX }));
    }
  }, [buffer, cursorIndex]);

  return (
    <mesh ref={meshRef} position={cursorPosition.raw()} {...restProps}>
      <boxBufferGeometry args={[CURSOR_WIDTH, CURSOR_HEIGHT, MIN_DISTANCE]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
