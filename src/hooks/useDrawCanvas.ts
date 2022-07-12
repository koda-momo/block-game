import { useEffect, useCallback } from "react";

//hooks
import { useDrawPaddle } from "./useDrawPaddle";
import { useDrawBlock } from "./useDrawBlock";
import { useDrawBall } from "./useDrawBall";
import { useScore } from "./useScore";

//Atoms
import { useRecoilValue, useSetRecoilState } from "recoil";
import { canvasState, stateDrawCanvas } from "../atoms/CanvasAtom";

export const useDrawCanvas = () => {
  //キャンバスの描画
  const canvas = useRecoilValue(canvasState).canvas;
  const ctx = useRecoilValue(canvasState).ctx;
  const setDrawCanvas = useSetRecoilState(stateDrawCanvas);

  //円の描写
  const { drawBall } = useDrawBall();

  //棒の描画
  const { drawPaddle } = useDrawPaddle();

  //ブロックの描写
  const { drawBricks, collisionDetection } = useDrawBlock();

  //スコアとライフの描写
  const { drawScore, drawLives } = useScore();

  /**
   * キャンバス要素取得.
   */
  useEffect(() => {
    const canvasEle = document.getElementById("myCanvas") as HTMLCanvasElement;
    if (!canvasEle) {
      return;
    }

    //初期値のセット
    setDrawCanvas();

    const ctxItem = canvasEle.getContext("2d");
    if (!ctxItem) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * アニメーション.
   */
  const draw = useCallback(() => {
    if (!canvas || !ctx) {
      return;
    }

    //前キャンバスデータの削除(切り取る範囲)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    collisionDetection();
    drawBricks();
    drawScore();
    drawLives();
  }, [
    canvas,
    collisionDetection,
    ctx,
    drawBall,
    drawBricks,
    drawLives,
    drawPaddle,
    drawScore,
  ]);

  return { draw };
};
