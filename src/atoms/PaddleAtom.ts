import { atom } from "recoil";

/**
 * パドルの描画
 */
export const paddleState = atom({
  key: "paddle",
  default: {
    paddleHeight: 10, //高さ
    paddleWidth: 75, //幅
  },
});

/**
 * パドルの横位置の描画
 */
export const paddleXState = atom({
  key: "paddleX",
  default: 0, //横の位置
});
