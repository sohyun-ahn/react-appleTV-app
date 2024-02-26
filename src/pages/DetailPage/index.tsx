import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import imageBasePath from "../../constant";

interface MovieType {
  backdrop_path: string;
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
    <section>
      <img src={`${imageBasePath}${movie.backdrop_path}`} alt="detail" />
    </section>
  );
};

export default DetailPage;
