import { useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { canvasState } from "../atoms/CanvasAtom";
import { pressedState } from "../atoms/KeyAtom";
import { paddleState, paddleXState } from "../atoms/PaddleAtom";

/**
 * 棒を描く.
 * @returns 横幅, 位置設定, キー押下の際のイベント, キーを離した際のイベント, 棒を描くメソッド
 */
export const useDrawPaddle = () => {
  //パドル
  const paddleHeight = useRecoilValue(paddleState).paddleHeight; //高さ
  const paddleWidth = useRecoilValue(paddleState).paddleWidth; //幅
  const [paddleX, setPaddleX] = useRecoilState(paddleXState); //横の位置

  //キャンバスデータ
  const canvas = useRecoilValue(canvasState).canvas;
  const ctx = useRecoilValue(canvasState).ctx;

  //キー押下
  const rightPressed = useRecoilValue(pressedState).rightPressed;
  const leftPressed = useRecoilValue(pressedState).leftPressed;

  /**
   * 棒を描く.
   */
  const drawPaddle = useCallback(() => {
    if (!ctx || !canvas) {
      return;
    }

    //右キー押下 + 画面からはみ出ない範囲ならX軸 +7
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      setPaddleX(paddleX + 7);
    }

    //左キー押下 + 画面からはみ出ない範囲ならX軸 -7
    if (leftPressed && paddleX > 0) {
      setPaddleX(paddleX - 7);
    }

    ctx.beginPath();
    // ctx.rect(四角の左上のxの位置, yの位置, 幅, 高さ)
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }, [
    canvas,
    ctx,
    paddleHeight,
    paddleWidth,
    paddleX,
    leftPressed,
    rightPressed,
    setPaddleX,
  ]);

  return {
    drawPaddle,
  };
};
