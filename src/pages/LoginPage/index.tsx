import styled from "styled-components";

const LoginPage = () => {
  return (
    <Container>
      <Center>
        <Logo
          src="../../../public/images/apple-gray-logo.svg"
          alt="apple-logo"
        />
        <HeadingText>Sign in with your Apple ID </HeadingText>
        <DescriptionText>
          You will be signed in to Apple TV and Apple Music.
        </DescriptionText>
        <Button>Apple ID</Button>
        <LinkText>Create New Apple ID</LinkText>
        <LinkText>Forgot Apple ID or Password?</LinkText>
      </Center>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
`;
const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  margin-bottom: 1.3rem;
  width: 50px;
`;

const HeadingText = styled.h1`
  font-size: 1.9rem;
`;

const DescriptionText = styled.p`
  margin: 0;
  font-size: 1.3rem;
`;

const LinkText = styled.p`
  font-size: 1.2rem;
  color: #2997ff;
  margin: 1rem 0;
`;

const Button = styled.a`
  margin-top: 2.5rem;
  margin-bottom: 8rem;
  font-size: 18px;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  border-color: #424245;
  background-color: hsla(0, 0%, 100%, 0.04);
  width: 310px;
  font-size: 17px;
  font-weight: 400;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.08);
  }
`;

export default LoginPage;
