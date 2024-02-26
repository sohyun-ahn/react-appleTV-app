import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

interface PropsType {
  show?: string;
}
const NavWrapper = styled.nav<PropsType>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) =>
    props.show === "true" ? "#000000" : "#000000"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;
const Logo = styled.a`
  padding: 0;
  width: 70px;
  font-size: 0;
  display: inline-block;
  margin-bottom: 10px;
  img {
    display: block;
    width: 100%;
  }
`;
const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: 1px solid lightgray;
`;
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease;

  $:hover[
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  ]
`;
const Nav = (): JSX.Element => {
  const [show, setShow] = useState<string>("false");
  const [searchValue, setSearchValue] = useState<string>(""); //영화 search inputd에 해당 값
  const navigate = useNavigate(); //react-router-dom에서 제공하는 함수인 useNavigate() hook

  const listener = () => {
    if (window.scrollY > 50) {
      setShow("true");
    } else {
      setShow("false");
    }
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`); // 우리가 App.tsx에서 path를 search아래로 만들어줘서
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="logo"
          src="/images/apple-logo.png"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {/* {pathname === "/" ? ( */}
      {/* <Login>Login</Login> */}
      {/* ) : ( */}
      <Input
        type="text"
        className="nav__input"
        value={searchValue}
        onChange={handleChange}
        placeholder="영화를 검색해주세요."
      />
      {/* )} */}
    </NavWrapper>
  );
};

export default Nav;
