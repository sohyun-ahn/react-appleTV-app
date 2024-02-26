import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./SearchPage.module.css";
import useDebounce from "../../hooks/useDebounce";

interface MovieType {
  name: string;
  title: string;
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
  media_type?: string;
}
const SearchPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<MovieType[]>([]); //결과 저장 배열
  const useQuery = () => new URLSearchParams(location.search);
  const navigate = useNavigate(); //react-router-dom hook

  let query = useQuery();
  // const searchTerm = query.get("q"); => debouncedSearchTerm으로 변경
  // useDebounce는 글자하나당이 아니라 지연시간뒤에 글자변화를 한번에 체크하는 hook
  const debouncedSearchTerm = useDebounce(query.get("q")!, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (debouncedSearchTerm: string) => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
      ); //fetch해오기
      setSearchResults(response.data.results); //결과저장하기
    } catch (err) {
      console.error(err);
    }
  };

  if (searchResults.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() => navigate(`/${movie.id}`)} // DetailPage로 넘어가는 것
                  className="movie__column-poster"
                >
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    );
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자하는 검색어 {debouncedSearchTerm}에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  }
};

export default SearchPage;
