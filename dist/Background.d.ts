/// <reference types="react" />
import { Vec3 } from "./Vec3";
declare type Props = {
    position: Vec3;
    height?: number;
    width: number;
};
export declare function Background({ position, height, width, ...restProps }: Props): JSX.Element;
export {};
