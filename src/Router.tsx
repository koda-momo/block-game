import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./templates/Home";

export const Router: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
