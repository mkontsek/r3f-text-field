import { insertStrAt, removeCharAt } from "../utils";
import { InterceptState } from "./types";

function handleBackspace(state): InterceptState {
  const { buffer, cursorIndex } = state;

  if (cursorIndex <= 0) {
    return { ...state };
  }

  const newIndex = cursorIndex - 1;
  return {
    ...state,
    buffer: removeCharAt(buffer, newIndex),
    cursorIndex: newIndex,
  };
}

function handleDelete(state): InterceptState {
  const { buffer, cursorIndex } = state;

  if (cursorIndex >= buffer.length) {
    return { ...state };
  }

  return {
    ...state,
    buffer: removeCharAt(buffer, cursorIndex),
  };
}

function handleArrowLeft(state): InterceptState {
  const { cursorIndex } = state;

  if (cursorIndex > 0) {
    return { ...state, cursorIndex: cursorIndex - 1 };
  }

  return { ...state };
}

function handleArrowRight(state): InterceptState {
  const { buffer, cursorIndex } = state;

  if (cursorIndex < buffer.length) {
    return { ...state, cursorIndex: cursorIndex + 1 };
  }

  return { ...state };
}

function handleHome(state): InterceptState {
  return { ...state, cursorIndex: 0 };
}

function handleEnd(state): InterceptState {
  return { ...state, cursorIndex: state.buffer.length };
}

function handleEnter(state): InterceptState {
  return { ...state };
}

function handleNewKey(key, state): InterceptState {
  if (key.length !== 1) {
    return { ...state };
  }

  const { buffer, cursorIndex } = state;
  return {
    ...state,
    buffer: insertStrAt(buffer, cursorIndex, key),
    cursorIndex: cursorIndex + 1,
  };
}

const KEY_FUNCTION = {
  Backspace: handleBackspace,
  Delete: handleDelete,
  ArrowLeft: handleArrowLeft,
  ArrowRight: handleArrowRight,
  Home: handleHome,
  End: handleEnd,
  Enter: handleEnter,
};

export function handleInterceptInput(key, state): InterceptState {
  const handleFn = KEY_FUNCTION[key];

  if (handleFn) {
    return handleFn(state);
  }

  return handleNewKey(key, state);
}
