import { useCallback } from "react";

//Atoms
import { useRecoilValue } from "recoil";
import { canvasState } from "../atoms/CanvasAtom";
import { scoreState, livesState } from "../atoms/ScoreAtom";

export const useScore = () => {
  //キャンバスの描画
  const ctx = useRecoilValue(canvasState).ctx;
  const canvas = useRecoilValue(canvasState).canvas;

  //スコア
  const score = useRecoilValue(scoreState);

  //ライフ
  const lives = useRecoilValue(livesState);

  const drawScore = useCallback(() => {
    if (!ctx) {
      return;
    }

    //文字の描写
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20); //(書く事, 位置)
  }, [ctx, score]);

  /**
   * ライフを描写.
   */
  const drawLives = useCallback(() => {
    if (!ctx || !canvas) {
      return;
    }
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
  }, [canvas, ctx, lives]);

  return { drawScore, drawLives };
};
