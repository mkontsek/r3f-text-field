import { RefObject } from "react";

import { Padding } from "./types";
import { MIN_DISTANCE, Vec3 } from "./Vec3";
import { Geometry, Mesh } from "three";

export function blink(ref: RefObject<any>, everyMillis: number) {
  ref.current!.visible = Date.now() % everyMillis < everyMillis / 2;
}

export function getCursorPosition({ position, width }) {
  const ALIGN_TO_BACKGROUND_X = 0.1;

  const startOfField = -width / 2 + ALIGN_TO_BACKGROUND_X;

  return position.lift(MIN_DISTANCE).setXYZ({ x: startOfField });
}

export function getTextPosition(basePosition: Vec3, padding: Padding) {
  const ALIGN_TO_CURSOR_Y = -0.3;

  return basePosition.moveY(ALIGN_TO_CURSOR_Y).moveX(padding.left);
}

export function getTextSize(mesh?: Mesh) {
  if (!mesh) {
    return undefined;
  }

  const { geometry } = mesh;
  const size = new Vec3();

  geometry.computeBoundingBox();
  geometry.boundingBox?.getSize(size);

  return size;
}

export function insertStrAt(s: string, startIndex: number, inputStr: string) {
  const stringAr = s.split("");

  stringAr.splice(startIndex, 0, inputStr);

  return stringAr.join("");
}

export function removeCharAt(s: string, startIndex) {
  const stringAr = s.split("");

  stringAr.splice(startIndex, 1);

  return stringAr.join("");
}
