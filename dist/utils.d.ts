import { RefObject } from "react";
import { Padding } from "./types";
import { Vec3 } from "./Vec3";
import { Mesh } from "three";
export declare function blink(ref: RefObject<any>, everyMillis: number): void;
export declare function getCursorPosition({ position, width }: {
    position: any;
    width: any;
}): any;
export declare function getTextPosition(basePosition: Vec3, padding: Padding): Vec3;
export declare function getTextSize(mesh?: Mesh): Vec3 | undefined;
export declare function insertStrAt(s: string, startIndex: number, inputStr: string): string;
export declare function removeCharAt(s: string, startIndex: any): string;
