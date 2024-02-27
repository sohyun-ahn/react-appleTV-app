import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import app from "../firebase";

interface PropsType {
  show?: string;
}

interface UserDataType {
  photoURL?: string;
  displayName?: string;
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

  &:hover[
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  ]
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  diplay: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const initialUserData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData")!)
  : {};

const Nav = (): JSX.Element => {
  const [show, setShow] = useState<string>("false");
  const { pathname } = useLocation(); // pathname 받아오기
  const [searchValue, setSearchValue] = useState<string>(""); //영화 search inputd에 해당 값
  const navigate = useNavigate(); //react-router-dom에서 제공하는 함수인 useNavigate() hook
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [userData, setUserData] = useState<UserDataType>(initialUserData); // 유저 데이터 저장
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

  useEffect(() => {
    // 로그인시에 main 페이지로 가기, 아니면 login 페이지
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else if (user && pathname === "/") {
        navigate("/main");
      }
    });
  }, [auth, navigate, pathname]);

  const handleAuth = () => {
    // 로그인할 때,
    signInWithPopup(auth, provider)
      .then((result: { user?: any }) => {
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((err) => alert(err.message));
  };

  const handleLogOut = () => {
    // 로그아웃할 때,
    signOut(auth)
      .then(() => {
        setUserData({}); // 유저 데이터 지우기
        localStorage.removeItem("userData");
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="logo"
          src="/images/apple-logo.png"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {pathname === "/" ? (
        <Login onClick={() => handleAuth()}>Login</Login>
      ) : (
        <Input
          type="text"
          className="nav__input"
          value={searchValue}
          onChange={handleChange}
          placeholder="영화를 검색해주세요."
        />
      )}

      {pathname !== "/" && (
        <SignOut>
          <UserImg src={userData.photoURL} alt={userData.displayName} />
          <DropDown>
            <span onClick={handleLogOut}>Sign Out</span>
          </DropDown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

export default Nav;
