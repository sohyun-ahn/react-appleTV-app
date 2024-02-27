import { Outlet, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

const LayOut = () => {
  return (
    <>
      <Nav />
      {/* 자식경로 요소를 렌더링하려면 부모경로요소에서 Outlet을 사용해야함 */}
      {/* 이렇게 해야 하위 경로가 렌더링될때 중첩된 UI가 표시가능 */}
      {/* 부모라우트가 일치하면 자식 index Route를 렌더링하거나 index Route가 없으면 렌더링 안함 */}
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayOut />}>
        {/* localhost:5173/ 경로: LoginPage */}
        <Route index element={<LoginPage />} />
        {/* localhost:5173/main 경로: MainPage */}
        <Route path="main" element={<MainPage />} />
        <Route path=":movieId" element={<DetailPage />} />
        {/* localhost:5173/main/1334 경로: movieID가 1334인 DetailPage //중첩라우팅 */}
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
