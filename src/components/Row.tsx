import { useCallback, useEffect, useState } from "react";
import "./Row.css";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import imageBasePath from "../constant";

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
  }, [fetchUrl]); // 한번만 부르기 때문에 []

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              // scrollLeft: 스크롤바를 왼쪽부터 px수만큼 이동시킴
              document.getElementById(id)!.scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
      </div>
      <div id={id} className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="row__poster"
            src={`${imageBasePath}${movie.backdrop_path}`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      <div className="slider__arrow-right">
        <span
          className="arrow"
          onClick={() => {
            document.getElementById(id)!.scrollLeft += window.innerWidth - 80;
          }}
        >
          {">"}
        </span>
      </div>
      {/* MovieModal={movieModal} 이렇게 하면 movieModal.title 
           이런식으로 접근하기 때문에 바로 {...movieModal}로 내려주어 title, backdrop_path 처럼
           풀어진 채로 전달가능*/}
      {modalOpen ? (
        <MovieModal {...movieSelected!} setModalOpen={setModalOpen} />
      ) : null}
    </div>
  );
};

export default Row;
