import React from "react";
import { useLoader } from "react-three-fiber";
import { Font, FontLoader } from "three";

import { handleInterceptInput } from "./Service";
import { InterceptState } from "./types";

type ContextProps = InterceptState & {
  font?: Font;
  handleTextTooWide(x: number): boolean;
};

export const KeyboardInterceptContext = React.createContext<ContextProps>({
  buffer: "",
  font: undefined,
  cursorIndex: 0,
  handleTextTooWide: () => false,
});

type Props = {
  onChange(buffer: string): void;
  fontPath: string;
  width: number;
  defaultValue?: string;
  children: React.ReactNode;
};

export const KeyboardInterceptProvider = ({
  onChange,
  fontPath,
  width,
  defaultValue,
  children,
}: Props) => {
  const [state, setState] = React.useState<InterceptState>({
    buffer: defaultValue ?? "",
    cursorIndex: 0,
  });
  const font = useLoader(FontLoader, fontPath);

  const handleKeyDown = ({ key }) => {
    const newState = handleInterceptInput(key, state);

    setState(newState);
  };

  const confirmTextWidth = (newTextWidth: number): boolean => {
    if (newTextWidth < width) {
      onChange(state.buffer);
      return false;
    }

    const { buffer, cursorIndex } = state;
    const newState = {
      ...state,
      buffer: buffer.slice(0, buffer.length - 1),
      cursorIndex: cursorIndex - 1,
    };

    setState(newState);
    onChange(newState.buffer);

    return true;
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <KeyboardInterceptContext.Provider
      value={{ ...state, handleTextTooWide: confirmTextWidth, font }}
    >
      {children}
    </KeyboardInterceptContext.Provider>
  );
};
