/// <reference types="react" />
import { Vec3 } from "./Vec3";
import { Padding } from "./types";
declare type Props = {
    position: Vec3;
    width: number;
    color?: string;
    fontSize?: number;
    padding: Padding;
};
export declare function TextWithCursor({ position, color, fontSize, width, padding, }: Props): JSX.Element;
export {};
