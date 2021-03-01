/// <reference types="react" />
import { Vec3 } from "./Vec3";
declare type Props = {
    position: Vec3;
    height?: number;
    width: number;
    borderWidth?: number;
};
export declare function Border({ position, height, width, borderWidth, ...restProps }: Props): JSX.Element;
export {};
