import { atom, selector } from "recoil";
import { ballState } from "./BallAtom";

//キャンバス型
type canvasType = {
  canvas: HTMLCanvasElement | undefined;
  ctx: CanvasRenderingContext2D | undefined;
};

/**
 * キャンバス描画.
 */
export const canvasState = atom<canvasType>({
  key: "canvas",
  default: {
    canvas: undefined,
    ctx: undefined,
  },
});

/**
 * キャンバス初期描画.
 */
export const stateDrawCanvas = selector({
  key: "state-double-count",
  get: ({ get }) => {},
  set: ({ set }, newValue) => {
    const canvasEle = document.getElementById("myCanvas") as HTMLCanvasElement;

    //キャンバス初期値作成
    if (!canvasEle) {
      return;
    }

    const ctxItem = canvasEle.getContext("2d");

    if (!ctxItem) {
      return;
    }
    const canvasValue = { canvas: canvasEle, ctx: ctxItem };

    //円の値作成
    const ballWidth = canvasEle.width / 2; //初期幅÷2の位置(横中央)
    const ballHeight = canvasEle.height - 30; //初期高さ-30の位置(290)

    const ballValue = {
      x: ballWidth,
      y: ballHeight,
    };

    //キャンバス初期値のセット
    set(canvasState, canvasValue);

    //円の値セット
    set(ballState, ballValue);
  },
});
