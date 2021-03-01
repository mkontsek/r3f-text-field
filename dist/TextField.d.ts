/// <reference types="react" />
import { Vector3 } from "three";
import { Padding } from "./types";
declare type Props = {
    defaultValue?: string;
    position: Vector3;
    width?: number;
    padding?: Padding;
    onChange?(buffer: string): void;
    fontPath: string;
    borderWidth?: number;
};
export declare function TextField({ defaultValue, position, width, padding, borderWidth, onChange, fontPath, }: Props): JSX.Element;
export {};
