import { FC, memo, useCallback, useEffect, useRef } from "react";
import "../styles/home.css";

//hooks
import { useMouseMove } from "../hooks/useMouseMove";
import { useKeyUpDown } from "../hooks/useKeyUpDown";
import { useDrawCanvas } from "../hooks/useDrawCanvas";
import { useRecoilValue } from "recoil";
import { gameClearState, gameOverState } from "../atoms/ScoreAtom";

const Home: FC = memo(() => {
  //描画
  const animationRef = useRef(0);
  const { draw } = useDrawCanvas();

  /**
   * アニメーションを滑らかに動かす用.
   */
  const drawFunc = useCallback(() => {
    draw();
    animationRef.current = requestAnimationFrame(drawFunc);
  }, [draw]);

  //イベントハンドラー
  const { keyDownHandler, keyUpHandler } = useKeyUpDown();
  const { mouseMoveHandler } = useMouseMove();

  //ゲームオーバー
  const gameOver = useRecoilValue(gameOverState);
  const gameClear = useRecoilValue(gameClearState);

  /**
   * キー押下イベント発生時に発動.
   */
  useEffect(() => {
    //(イベント発生条件, 発動メソッド, 最初は押されていないよという事でfalse)
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
  }, [keyDownHandler, keyUpHandler, mouseMoveHandler]);

  /**
   * drawメソッドを滑らかに発動.(requestAnimationFrame)
   */
  useEffect(() => {
    //ゲームオーバーの際はリロード
    if (gameOver || gameClear) {
      document.location.reload();
    } else {
      //ゲームオーバーでなければアニメーション描画
      animationRef.current = requestAnimationFrame(drawFunc);
    }

    return () => cancelAnimationFrame(animationRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawFunc]);

  return (
    <>
      <canvas id="myCanvas" width="480" height="320"></canvas>
    </>
  );
});

export default Home;
