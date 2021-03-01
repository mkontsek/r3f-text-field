import React from "react";
import { Font } from "three";
import { InterceptState } from "./types";
declare type ContextProps = InterceptState & {
    font?: Font;
    confirmTextWidth(x: number): boolean;
};
export declare const KeyboardInterceptContext: React.Context<ContextProps>;
declare type Props = {
    onChange(buffer: string): void;
    fontPath: string;
    width: number;
    defaultValue?: string;
    children: React.ReactNode;
};
export declare const KeyboardInterceptProvider: ({ onChange, fontPath, width, defaultValue, children, }: Props) => JSX.Element;
export {};
