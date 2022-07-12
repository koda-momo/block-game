import { atom } from "recoil";

//スコア
export const scoreState = atom({
  key: "score",
  default: 0,
});

//ライフ
export const livesState = atom({
  key: "lives",
  default: 3,
});

//ゲームオーバー
export const gameOverState = atom({
  key: "gameOver",
  default: false,
});
