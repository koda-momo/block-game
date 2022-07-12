import { useCallback, useState } from "react";

//Atoms
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { canvasState } from "../atoms/CanvasAtom";
import { ballYState, ballState } from "../atoms/BallAtom";
import { scoreState, gameClearState } from "../atoms/ScoreAtom";

/**
 * ブロックの描画.
 */
export const useDrawBlock = () => {
  //キャンバスの描画
  const ctx = useRecoilValue(canvasState).ctx;

  //スコア
  const [score, setScore] = useRecoilState(scoreState);

  //スコア
  const setGameClear = useSetRecoilState(gameClearState);

  //円の動き
  const x = useRecoilValue(ballState).x;
  const y = useRecoilValue(ballState).y;
  const [dy, setDy] = useRecoilState(ballYState);

  const [brickRowCount] = useState(3); //行の数
  const [brickColumnCount] = useState(5); //列の数
  const [brickWidth] = useState(75); //幅
  const [brickHeight] = useState(20); //高さ
  const [brickPadding] = useState(10); //パディング(隙間)
  const [brickOffsetTop] = useState(30); //上の位置
  const [brickOffsetLeft] = useState(30); //左の位置

  /**
   * ブロック用2次元配列の作成.
   */
  const makeBlock = useCallback(() => {
    const array: Array<Array<{ x: number; y: number; status: number }>> = [];
    for (let c = 0; c < brickColumnCount; c++) {
      array[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        array[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    return array;
  }, [brickColumnCount, brickRowCount]);

  //ブロックデータの配列
  const [bricks, setBricks] = useState<
    Array<Array<{ x: number; y: number; status: number }>>
  >(makeBlock());

  /**
   * ブロックを描く.
   */
  const drawBricks = useCallback(() => {
    const array = [...bricks];
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (!ctx) {
          return;
        }

        //もしステータスが1(まだ消されていない場合)は描画
        if (array[c][r].status === 1) {
          //描画データの作成
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          array[c][r].x = brickX;
          array[c][r].y = brickY;

          //描画
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
    setBricks([...array]);
  }, [
    brickColumnCount,
    brickHeight,
    brickOffsetLeft,
    brickOffsetTop,
    brickPadding,
    brickRowCount,
    brickWidth,
    bricks,
    ctx,
  ]);

  /**
   * ブロックを消す為のメソッド.
   */
  const collisionDetection = useCallback(() => {
    const array = [...bricks];
    let scoreItem = score;

    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const b = array[c][r];

        //もしブロックがまだ消されていない → ぶつかったらステータスを0に
        if (b.status === 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            setDy(-dy);
            b.status = 0;
            scoreItem = scoreItem + 1;

            //もし全ブロックが消えたら(スコア = 全ブロックの数になったら)終了
            if (scoreItem === brickRowCount * brickColumnCount) {
              alert("YOU WIN, CONGRATULATIONS!");
              setGameClear(true);
              return;
            }
          }
        }
      }
    }
    setScore(scoreItem);
    setBricks([...array]);
  }, [
    brickColumnCount,
    brickHeight,
    brickRowCount,
    brickWidth,
    bricks,
    dy,
    score,
    setDy,
    setScore,
    x,
    y,
  ]);

  return { drawBricks, collisionDetection };
};
