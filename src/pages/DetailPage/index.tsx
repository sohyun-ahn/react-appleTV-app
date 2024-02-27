import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import imageBasePath from "../../constant";
import styled from "styled-components";

interface MovieType {
  backdrop_path: string;
  title: string;
  overview: string;
  name?: string;
  release_date: string;
  first_air_date?: string;
  vote_average: number;
}

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return null;

  return (
    <Section>
      <img
        width="100%"
        src={`${imageBasePath}${movie.backdrop_path}`}
        alt="detail"
      />
      <div>
        <h2 className="modal__title">
          {movie.title ? movie.title : movie.name}
        </h2>
        <p>
          개봉일:{" "}
          {movie.release_date ? movie.release_date : movie.first_air_date}
        </p>
        <p>평점: {movie.vote_average}</p>
        <p className="modal__overview"> {movie.overview}</p>
      </div>
    </Section>
  );
};

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 70px;
  width: 90%;
  margin: auto;
  min-width: 300px;
`;

export default DetailPage;
