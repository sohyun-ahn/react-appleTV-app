//folder의 기본파일이 index이기 때문에 파일 이름을 MovieModal이 아닌 index로 해주어도 됨
// eslint-disabel react/prop-types 하면 props타입 안적어도 됨
import { useRef } from "react";
import imageBasePath from "../../constant";
import "./MovieModal.css";
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface PropsType {
  backdrop_path: string;
  title: string;
  overview: string;
  name?: string;
  release_date: string;
  first_air_date?: string;
  vote_average: number;
  setModalOpen(isOpen: boolean): void;
}

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}: PropsType) => {
  const ref = useRef<HTMLDivElement>(null); // DOM요소 선택을 위해 useRef hook을 생성

  useOnClickOutside(ref, () => {
    setModalOpen(false); // 모달창 외부를 클릭시, modal이 닫혀야하기때문에 false
  });

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>

          <img
            className="modal__poster-img"
            src={`${imageBasePath}${backdrop_path}`}
            alt="modal_poster-img"
          />

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">100% for you</span>{" "}
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
