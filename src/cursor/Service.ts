import { MIN_DISTANCE } from "../Vec3";

export const CURSOR_BLINK_INTERVAL = 1000;
export const CURSOR_HEIGHT = 0.8;
export const CHAR_PAD = 0.13;
export const CURSOR_WIDTH = MIN_DISTANCE;
export const SPACE_PAD = 0.2;

const REGEX_HEAD_WHITESPACE = /^\s+/;
const REGEX_TAIL_WHITESPACE = /\s+$/;

export function getWhitespacePadding(buffer: string, cursorIndex: number) {
  const section = buffer.slice(0, cursorIndex);

  const headWhitespaceLength =
    section.match(REGEX_HEAD_WHITESPACE)?.pop()?.length || 0;

  const tailWhitespaceLength =
    section.match(REGEX_TAIL_WHITESPACE)?.pop()?.length || 0;

  const whitespaceLength = headWhitespaceLength + tailWhitespaceLength;

  return whitespaceLength * SPACE_PAD;
}
