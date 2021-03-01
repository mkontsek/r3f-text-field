/// <reference types="react" />
import { Mesh } from "three";
import { Vec3 } from "../Vec3";
declare type Props = {
    position: Vec3;
    color?: string;
    textMesh?: Mesh;
    fontSize: number;
};
export declare function TextCursor({ position, textMesh, color, fontSize, ...restProps }: Props): JSX.Element;
export {};
