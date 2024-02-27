import { useEffect } from "react";

const useOnClickOutside = (ref: { current: any }, handler: () => void) => {
  useEffect(() => {
    // listener : 우리가 클릭하는게 모달창 밖인지 안인지 확인
    const listener = (e: { target: any }) => {
      if (!ref.current || ref.current.contains(e.target)) {
        // ref.current: DOM요소, // ! => dom요소가 선택이 안된 경우
        // ref.current.contains(e.target): e.target은 현재 클릭하고 있는 요소
        // 두개 모두 모달창 내의 부분이기에 handler를 부르지 않기 위해 함수를 끝내주기
        return;
      }
      handler(); // 모달밖이 선택되었다면 handler를 부르기
    };

    document.addEventListener("mousedown", listener); // mobile이라면, touchstart
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
