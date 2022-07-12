import { useCallback } from "react";

//Atoms
import { useRecoilValue, useSetRecoilState } from "recoil";
import { canvasState } from "../atoms/CanvasAtom";
import { paddleXState, paddleState } from "../atoms/PaddleAtom";

/**
 * マウスイベントハンドラー.
 */
export const useMouseMove = () => {
  const canvas = useRecoilValue(canvasState).canvas;
  const setPaddleX = useSetRecoilState(paddleXState);
  const paddleWidth = useRecoilValue(paddleState).paddleWidth;

  /**
   * マウスイベントハンドラー.
   */
  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (!canvas) {
        return;
      }

      //マウスの位置とキャンバスの左端の距離 = マウスの位置 - キャンバスの左端
      const relativeX = e.clientX - canvas.offsetLeft;

      //キャンバスをはみ出ない範囲にいる時発動 → パドルを設定した距離分動かす
      //パドルの中点で対称に動くようにrelativeXの値からパドルの幅の半分をひいた値に設定されます。
      if (relativeX > 0 && relativeX < canvas.width) {
        setPaddleX(relativeX - paddleWidth / 2);
      }
    },
    [canvas, paddleWidth, setPaddleX]
  );

  return { mouseMoveHandler };
};
