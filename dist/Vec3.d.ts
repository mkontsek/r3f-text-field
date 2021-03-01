import { Vector3 } from "three";
export declare const MIN_DISTANCE = 0.01;
declare type Vector3Array = [x: number, y: number, z: number];
declare type SetProps = {
    x?: number;
    y?: number;
    z?: number;
};
export declare class Vec3 extends Vector3 {
    constructor(...props: any[]);
    raw(): Vector3Array;
    scale(scalar: number): Vec3;
    setXYZ({ x, y, z }: SetProps): this;
    lift(scalar: number): Vec3;
    moveX(scalar: number): Vec3;
    moveY(scalar: number): Vec3;
}
export {};
