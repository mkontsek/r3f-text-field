import { jsxs, jsx } from 'react/jsx-runtime';
import React, { Suspense } from 'react';
import { Vector3, FontLoader } from 'three';
import { useLoader, useFrame } from 'react-three-fiber';

const MIN_DISTANCE = 0.01;
class Vec3 extends Vector3 {
    constructor(...props) {
        super(...props);
    }
    raw() {
        return [this.x, this.y, this.z];
    }
    // TODO
    scale(scalar) {
        const cloned = this.clone();
        cloned.multiplyScalar(scalar);
        return cloned;
    }
    setXYZ({ x, y, z }) {
        const cloned = this.clone();
        cloned.x = typeof x === "number" ? x : this.x;
        cloned.y = typeof y === "number" ? y : this.y;
        cloned.z = typeof z === "number" ? z : this.z;
        return cloned;
    }
    lift(scalar) {
        const cloned = this.clone();
        cloned.setZ(this.z + scalar);
        return cloned;
    }
    moveX(scalar) {
        const cloned = this.clone();
        cloned.setX(this.x + scalar);
        return cloned;
    }
    moveY(scalar) {
        const cloned = this.clone();
        cloned.setY(this.y + scalar);
        return cloned;
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function Background(_a) {
    var { position, height = 1, width } = _a, restProps = __rest(_a, ["position", "height", "width"]);
    return (jsxs("mesh", Object.assign({}, restProps, { position: position.raw() }, { children: [jsx("boxBufferGeometry", { args: [width, height, MIN_DISTANCE] }, void 0),
            jsx("meshStandardMaterial", { color: "white" }, void 0)] }), void 0));
}

function blink(ref, everyMillis) {
    ref.current.visible = Date.now() % everyMillis < everyMillis / 2;
}
function getCursorPosition({ position, width }) {
    const ALIGN_TO_BACKGROUND_X = 0.1;
    const startOfField = -width / 2 + ALIGN_TO_BACKGROUND_X;
    return position.lift(MIN_DISTANCE).setXYZ({ x: startOfField });
}
function getTextPosition(basePosition, padding) {
    const ALIGN_TO_CURSOR_Y = -0.3;
    return basePosition.moveY(ALIGN_TO_CURSOR_Y).moveX(padding.left);
}
function getTextSize(mesh) {
    var _a;
    if (!mesh) {
        return undefined;
    }
    const { geometry } = mesh;
    const size = new Vec3();
    geometry.computeBoundingBox();
    (_a = geometry.boundingBox) === null || _a === void 0 ? void 0 : _a.getSize(size);
    return size;
}
function insertStrAt(s, startIndex, inputStr) {
    const stringAr = s.split("");
    stringAr.splice(startIndex, 0, inputStr);
    return stringAr.join("");
}
function removeCharAt(s, startIndex) {
    const stringAr = s.split("");
    stringAr.splice(startIndex, 1);
    return stringAr.join("");
}

function handleBackspace(state) {
    const { buffer, cursorIndex } = state;
    if (cursorIndex <= 0) {
        return Object.assign({}, state);
    }
    const newIndex = cursorIndex - 1;
    return Object.assign(Object.assign({}, state), { buffer: removeCharAt(buffer, newIndex), cursorIndex: newIndex });
}
function handleDelete(state) {
    const { buffer, cursorIndex } = state;
    if (cursorIndex >= buffer.length) {
        return Object.assign({}, state);
    }
    return Object.assign(Object.assign({}, state), { buffer: removeCharAt(buffer, cursorIndex) });
}
function handleArrowLeft(state) {
    const { cursorIndex } = state;
    if (cursorIndex > 0) {
        return Object.assign(Object.assign({}, state), { cursorIndex: cursorIndex - 1 });
    }
    return Object.assign({}, state);
}
function handleArrowRight(state) {
    const { buffer, cursorIndex } = state;
    if (cursorIndex < buffer.length) {
        return Object.assign(Object.assign({}, state), { cursorIndex: cursorIndex + 1 });
    }
    return Object.assign({}, state);
}
function handleHome(state) {
    return Object.assign(Object.assign({}, state), { cursorIndex: 0 });
}
function handleEnd(state) {
    return Object.assign(Object.assign({}, state), { cursorIndex: state.buffer.length });
}
function handleEnter(state) {
    return Object.assign({}, state);
}
function handleNewKey(key, state) {
    if (key.length !== 1) {
        return Object.assign({}, state);
    }
    const { buffer, cursorIndex } = state;
    return Object.assign(Object.assign({}, state), { buffer: insertStrAt(buffer, cursorIndex, key), cursorIndex: cursorIndex + 1 });
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
function handleInterceptInput(key, state) {
    const handleFn = KEY_FUNCTION[key];
    if (handleFn) {
        return handleFn(state);
    }
    return handleNewKey(key, state);
}

const KeyboardInterceptContext = React.createContext({
    buffer: "",
    font: undefined,
    cursorIndex: 0,
    confirmTextWidth: () => false,
});
const KeyboardInterceptProvider = ({ onChange, fontPath, width, defaultValue, children, }) => {
    var _a;
    const [state, setState] = React.useState({
        buffer: defaultValue !== null && defaultValue !== void 0 ? defaultValue : "",
        cursorIndex: (_a = defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.length) !== null && _a !== void 0 ? _a : 0,
    });
    const font = useLoader(FontLoader, fontPath);
    const handleKeyDown = ({ key }) => {
        const newState = handleInterceptInput(key, state);
        setState(newState);
    };
    const confirmTextWidth = (newTextWidth) => {
        if (newTextWidth < width) {
            onChange(state.buffer);
            return false;
        }
        const { buffer, cursorIndex } = state;
        const newState = Object.assign(Object.assign({}, state), { buffer: buffer.slice(0, buffer.length - 1), cursorIndex: cursorIndex - 1 });
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
    return (jsx(KeyboardInterceptContext.Provider, Object.assign({ value: Object.assign(Object.assign({}, state), { confirmTextWidth, font }) }, { children: children }), void 0));
};

const CURSOR_BLINK_INTERVAL = 1000;
const CURSOR_HEIGHT = 0.8;
const CHAR_PAD = 0.13;
const CURSOR_WIDTH = MIN_DISTANCE;
const SPACE_PAD = 0.2;
const REGEX_HEAD_WHITESPACE = /^\s+/;
const REGEX_TAIL_WHITESPACE = /\s+$/;
function getWhitespacePadding(buffer, cursorIndex) {
    var _a, _b, _c, _d;
    const section = buffer.slice(0, cursorIndex);
    const headWhitespaceLength = ((_b = (_a = section.match(REGEX_HEAD_WHITESPACE)) === null || _a === void 0 ? void 0 : _a.pop()) === null || _b === void 0 ? void 0 : _b.length) || 0;
    const tailWhitespaceLength = ((_d = (_c = section.match(REGEX_TAIL_WHITESPACE)) === null || _c === void 0 ? void 0 : _c.pop()) === null || _d === void 0 ? void 0 : _d.length) || 0;
    const whitespaceLength = headWhitespaceLength + tailWhitespaceLength;
    return whitespaceLength * SPACE_PAD;
}

function TextCursor(_a) {
    var { position, textMesh, color = "black", fontSize } = _a, restProps = __rest(_a, ["position", "textMesh", "color", "fontSize"]);
    const { buffer, cursorIndex, confirmTextWidth } = React.useContext(KeyboardInterceptContext);
    const [cursorPosition, setCursorPosition] = React.useState(position);
    const meshRef = React.useRef({ visible: true });
    useFrame(() => {
        blink(meshRef, CURSOR_BLINK_INTERVAL);
    });
    const updateCursor = () => {
        const size = getTextSize(textMesh);
        if (!size) {
            return;
        }
        const paddingIfAtLeastOneChar = size.x > 0 ? CHAR_PAD : 0;
        const whitespacePadding = getWhitespacePadding(buffer, cursorIndex);
        const newWidth = size.x + paddingIfAtLeastOneChar + whitespacePadding;
        const newX = position.x + newWidth;
        if (!confirmTextWidth(newWidth)) {
            setCursorPosition(cursorPosition.setXYZ({ x: newX }));
        }
    };
    React.useEffect(() => {
        updateCursor();
    }, [textMesh, buffer, cursorIndex]);
    return (jsxs("mesh", Object.assign({ ref: meshRef, position: cursorPosition.raw() }, restProps, { children: [jsx("boxBufferGeometry", { args: [CURSOR_WIDTH, CURSOR_HEIGHT, MIN_DISTANCE] }, void 0),
            jsx("meshStandardMaterial", { color: color }, void 0)] }), void 0));
}

function Text(_a) {
    var { shapes, position, color = "black", padding, isTransparent = false, myRef } = _a, restProps = __rest(_a, ["shapes", "position", "color", "padding", "isTransparent", "myRef"]);
    if (!shapes) {
        return null;
    }
    const textPosition = getTextPosition(position, padding);
    return (jsxs("mesh", Object.assign({ ref: myRef }, restProps, { position: textPosition.raw() }, { children: [jsx("shapeGeometry", { args: [shapes] }, void 0),
            jsx("meshBasicMaterial", { color: color, transparent: isTransparent }, void 0)] }), void 0));
}

function TextWithCursor({ position, color = "black", fontSize = 0.6, width, padding, }) {
    const { buffer, font, cursorIndex } = React.useContext(KeyboardInterceptContext);
    const textRef = React.useRef();
    const cursorTextRef = React.useRef();
    const [cursorTextMesh, setCursorTextMesh] = React.useState();
    const textShapes = font === null || font === void 0 ? void 0 : font.generateShapes(buffer, fontSize);
    const cursorShapes = font === null || font === void 0 ? void 0 : font.generateShapes(buffer.slice(0, cursorIndex), fontSize);
    const cursorPosition = getCursorPosition({
        position,
        width,
    });
    React.useEffect(() => {
        setCursorTextMesh(cursorTextRef.current);
    }, [cursorTextRef]);
    return (jsxs("group", Object.assign({ position: position.raw() }, { children: [jsx(Text, { myRef: cursorTextRef, position: cursorPosition, padding: padding, shapes: cursorShapes, isTransparent: true }, void 0),
            jsx(Text, { myRef: textRef, position: cursorPosition, padding: padding, shapes: textShapes, color: color }, void 0),
            jsx(TextCursor, { textMesh: cursorTextMesh, position: cursorPosition, fontSize: fontSize }, void 0)] }), void 0));
}

function Border(_a) {
    var { position, height = 1, width, borderWidth = 0.2 } = _a, restProps = __rest(_a, ["position", "height", "width", "borderWidth"]);
    const borderPosition = position.moveX(-MIN_DISTANCE).lift(-MIN_DISTANCE);
    return (jsxs("mesh", Object.assign({}, restProps, { position: borderPosition.raw() }, { children: [jsx("boxBufferGeometry", { args: [width + borderWidth, height + borderWidth, MIN_DISTANCE] }, void 0),
            jsx("meshStandardMaterial", { color: "darkgrey" }, void 0)] }), void 0));
}

function TextField({ defaultValue, position, width = 5, padding = { left: 0.1 }, borderWidth, onChange = () => { }, fontPath, }) {
    const vec3position = new Vec3(position.x, position.y, position.z);
    return (jsx(Suspense, Object.assign({ fallback: "" }, { children: jsx(KeyboardInterceptProvider, Object.assign({ onChange: onChange, fontPath: fontPath, width: width, defaultValue: defaultValue }, { children: jsxs("group", Object.assign({ position: vec3position.raw() }, { children: [jsx(Border, { position: vec3position, width: width + padding.left, borderWidth: borderWidth }, void 0),
                    jsx(Background, { position: vec3position, width: width + padding.left }, void 0),
                    jsx(TextWithCursor, { position: vec3position, width: width, padding: padding }, void 0)] }), void 0) }), void 0) }), void 0));
}

export { TextField };
//# sourceMappingURL=index.js.map
