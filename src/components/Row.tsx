import { useCallback, useEffect, useState } from "react";
import "./Row.css";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import imageBasePath from "../constant";

import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";

interface PropsType {
  title: string;
  id: string;
  fetchUrl: string;
}
interface MovieType {
  name: string;
  title: string;
  release_date: string;
  first_air_date?: string;
  vote_average: number;
  id: number;
  backdrop_path: string;
  original_name: string;
  videos?:
    | {
        results: {
          key: string | undefined;
        }[];
      }
    | undefined;
  overview: string;
}
const Row = ({ title, id, fetchUrl }: PropsType) => {
  // => The movidedb api => 영화정보 가져오기

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false); //클릭하면 모달에 띄우기 위한 상태
  const [movieSelected, setMovieSelected] = useState<MovieType>(); // 모달에 담긴 movie 정보 세팅
  const handleClick = (movie: MovieType) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  return (
    // arrow <,> 부분을 지우고 swiper module로 바꿔줌
    <Container>
      <h2>{title}</h2>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar]}
        loop={true} // loop기능을 사용할 것인지
        navigation={true} // arrow 버튼을 사용할 것인지
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
        breakpoints={{
          // 반응형디자인을 위한,
          1378: {
            // 1378px 일때,
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 5, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 5, // 몇개씩 슬라이드 할지
          },
          625: {
            slidesPerView: 4, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 4, // 몇개씩 슬라이드 할지
          },
          0: {
            slidesPerView: 3, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 3, // 몇개씩 슬라이드 할지
          },
        }}
      >
        <Content id={id}>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Wrap>
                <img
                  // className="row__poster"
                  src={`${imageBasePath}${movie.backdrop_path}`}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              </Wrap>
            </SwiperSlide>
          ))}
        </Content>
      </Swiper>
      {/* MovieModal={movieModal} 이렇게 하면 movieModal.title 
           이런식으로 접근하기 때문에 바로 {...movieModal}로 내려주어 title, backdrop_path 처럼
           풀어진 채로 전달가능*/}
      {modalOpen ? (
        <MovieModal {...movieSelected!} setModalOpen={setModalOpen} />
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
`;
const Content = styled.div``;
const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover; // 요소의 크기에 맞게 <img> <video>태그의 크기를 조정하는 방법, cover: 가로세로비율 고정, 개체 크기에 맞게 잘림
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(0.98);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default Row;
