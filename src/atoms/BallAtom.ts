import { atom } from "recoil";

/**
 * 円の描画.
 */
export const ballState = atom({
  key: "ball",
  default: {
    x: 0,
    y: 0,
  },
});

/**
 * 円の半径.
 */
export const ballRadiusState = atom({
  key: "ballRadius",
  default: 10,
});

/**
 * 円X軸の動き方.
 */
export const ballXState = atom({
  key: "ballX",
  default: 2,
});

/**
 * 円Y軸の動き方.
 */
export const ballYState = atom({
  key: "ballY",
  default: -2,
});
