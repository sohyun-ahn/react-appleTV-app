import { useEffect, useState } from "react";
import axiosInstance from "../api/axios"; // default이기에 이름 아무렇게 가능
import requests from "../api/request";
import "./Banner.css";
import styled from "styled-components";

const Banner = (): JSX.Element => {
  interface MovieType {
    name: string;
    title: string;
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
  // movie : {adult: false, backdrop_path: '/zLj0peaxy5y2SlC6wNIQ4V0pfqg.jpg', belongs_to_collection: null, budget: 0, genres: Array(4), …}
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기 (여러 영화)
    // 원래는 : axios.get("https://api.themoviedb.org/3?api_key=....")
    const request = await axiosInstance.get(requests.fetchNowPlaying);
    // 여러 영화 중 영화 하나의 ID가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const { data: movieDetail } = await axiosInstance.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };

  if (!movie) {
    return <div>Loading...</div>;
  }
  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path})"`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className="banner__buttons">
            {movie.videos?.results[0]?.key ? (
              <button
                className="banner__button play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            ) : null}
          </div>
          <p className="banner__description">{truncate(movie.overview, 100)}</p>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
    );
  } else {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos?.results[0].key}?control=0&autoplay=1&loop=1&mute=1`}
            ></Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => setIsClicked(false)}>X</button>
      </>
    );
  }
};

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default Banner;
