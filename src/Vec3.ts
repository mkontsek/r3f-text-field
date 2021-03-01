import { Vector3 } from "three";

export const MIN_DISTANCE = 0.01;

type Vector3Array = [x: number, y: number, z: number];

type SetProps = {
  x?: number;
  y?: number;
  z?: number;
};

export class Vec3 extends Vector3 {
  static fromCoordinates(x: number, y: number, z: number) {
    return new Vec3(x, y, z);
  }

  raw(): Vector3Array {
    return [this.x, this.y, this.z];
  }

  // TODO
  scale(scalar: number): Vec3 {
    const cloned = this.clone();
    cloned.multiplyScalar(scalar);
    return cloned;
  }

  setXYZ({ x, y, z }: SetProps) {
    const cloned = this.clone();
    cloned.x = typeof x === "number" ? x : this.x;
    cloned.y = typeof y === "number" ? y : this.y;
    cloned.z = typeof z === "number" ? z : this.z;
    return cloned;
  }

  lift(scalar: number): Vec3 {
    const cloned = this.clone();
    cloned.setZ(this.z + scalar);
    return cloned;
  }

  moveX(scalar: number): Vec3 {
    const cloned = this.clone();
    cloned.setX(this.x + scalar);
    return cloned;
  }

  moveY(scalar: number): Vec3 {
    const cloned = this.clone();
    cloned.setY(this.y + scalar);
    return cloned;
  }
}
