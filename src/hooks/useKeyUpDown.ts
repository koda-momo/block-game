import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { pressedState } from "../atoms/KeyAtom";

/**
 * キー押下イベントハンドラ.
 * @returns キー押下イベント, キーを離したイベント, →を押下しているか否か, ←を押下しているか否か
 */
export const useKeyUpDown = () => {
  //Recoilに書き込み
  const setPressed = useSetRecoilState(pressedState);

  /**
   * キーを押した際の挙動.
   */
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      //右を押下
      if (e.key === "Right" || e.key === "ArrowRight") {
        const pressItem = { rightPressed: true, leftPressed: false };
        setPressed(pressItem);
      }

      //左を押下
      if (e.key === "Left" || e.key === "ArrowLeft") {
        const pressItem = { rightPressed: false, leftPressed: true };
        setPressed(pressItem);
      }
    },
    [setPressed]
  );

  /**
   * キーを離した際の挙動.
   */
  const keyUpHandler = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.key === "Right" ||
        e.key === "ArrowRight" ||
        e.key === "Left" ||
        e.key === "ArrowLeft"
      ) {
        const pressItem = { rightPressed: false, leftPressed: false };
        setPressed(pressItem);
      }
    },
    [setPressed]
  );

  return { keyDownHandler, keyUpHandler };
};
