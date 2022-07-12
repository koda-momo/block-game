import { atom } from "recoil";

/**
 * キーを押しているか否か.
 */
export const pressedState = atom({
  key: "pressed",
  default: {
    rightPressed: false,
    leftPressed: false,
  },
});
