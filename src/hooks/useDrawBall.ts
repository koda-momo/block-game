import { useCallback } from "react";

//Atoms
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { canvasState } from "../atoms/CanvasAtom";
import { paddleXState, paddleState } from "../atoms/PaddleAtom";
import {
  ballState,
  ballXState,
  ballYState,
  ballRadiusState,
} from "../atoms/BallAtom";
import { livesState, gameOverState } from "../atoms/ScoreAtom";

export const useDrawBall = () => {
  //キャンバスの描画
  const canvas = useRecoilValue(canvasState).canvas;
  const ctx = useRecoilValue(canvasState).ctx;

  //ライフ
  const [lives, setLives] = useRecoilState(livesState);

  //ゲームオーバー
  const setGameOver = useSetRecoilState(gameOverState);

  //円の位置
  const [xy, setXY] = useRecoilState(ballState);
  const [dx, setDx] = useRecoilState(ballXState);
  const [dy, setDy] = useRecoilState(ballYState);

  //円の半径
  const ballRadius = useRecoilValue(ballRadiusState);

  //棒の位置
  const [paddleX, setPaddleX] = useRecoilState(paddleXState);

  //棒の描画
  const paddleWidth = useRecoilValue(paddleState).paddleWidth;

  /**
   * ボールを描く.
   */
  const drawBall = useCallback(() => {
    //ライフ
    let liveCount = lives;

    if (!ctx || !canvas) {
      return;
    }
    //球の次の位置(メソッド内計算用)
    let dxNum = dx;
    let dyNum = dy;

    // もしx, yが画面範囲を超えてしまったら、増加する数字を反転させる
    //左右
    if (xy.x + dxNum > canvas.width - ballRadius || xy.x + dxNum < ballRadius) {
      dxNum = -dx;
      setDx(-dx);
    }

    //天井
    if (xy.y + dyNum < ballRadius) {
      dyNum = -dy;
      setDy(-dy);
    }

    //底についた時
    if (xy.y + dyNum > canvas.height - ballRadius) {
      //もしパドルにぶつかった場合も反転する
      if (xy.x > paddleX && xy.x < paddleX + paddleWidth) {
        dyNum = -dy;
        setDy(-dy);
        //パドルにぶつからなければライフ - 1
      } else {
        liveCount = liveCount - 1;
        //ライフが無ければゲームオーバー
        if (!liveCount) {
          alert("GAME OVER");
          setGameOver(true);
          return;
        } else {
          //ライフがあればボールとパドルをstart位置に
          const startBallX = canvas.width / 2;
          const startBallY = canvas.height - 30;
          setXY({ x: startBallX, y: startBallY });

          dxNum = 2;
          dyNum = -2;
          setPaddleX((canvas.width - paddleWidth) / 2);

          //ライフをセット
          setLives(liveCount);
          alert(`落ちてしまいました!残りライフは${liveCount}です。再スタート`);
          return;
        }
      }
    }

    //位置の指定
    const plusX = xy.x + dxNum; //X軸をdx増加
    const plusY = xy.y + dyNum; //Y軸をdy増加

    setXY({ x: plusX, y: plusY });

    //玉の静止画情報
    ctx.beginPath();
    ctx.arc(xy.x, xy.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ballRadius, canvas, ctx, dx, dy, xy.x, xy.y]);

  return { drawBall };
};
