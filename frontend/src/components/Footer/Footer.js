import styled from "styled-components";
import { aboutResponsive, tablet } from "../../responsive.js";
import { Link } from "react-router-dom";
import Button from "./Button";

const Section = styled.footer`
  margin-top: 100px;
  background: #3a3b7b;
  padding-top: 0.5rem;
`;

const Container = styled.div`
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  ${tablet({
    flexDirection: "column",
    padding: "2rem",
  })};

  a {
    text-decoration: none;
  }
`;

const Left = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-right: 198px;
  ${aboutResponsive({
    marginRight: "2rem",
    flexDirection: "column",
  })}
`;

const Project = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tag = styled.h5`
  font-family: Lora;
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 188.5%;
  color: #ffffff;
  margin-bottom: 7px;
`;

const Span = styled.span`
  cursor: pointer;
  font-family: Lora;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 188.5%;
  color: #ffffff;
  margin-bottom: 15px;
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  ${aboutResponsive({
    margin: "0 0",
  })}
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

const News = styled.h4`
  font-family: Lora;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 188.5%;
  color: #ffffff;
  margin-bottom: 10px;
  ${tablet({
    textAlign: "center",
  })}
`;

const Input = styled.input`
  outline: none;
  width: 400px;
  height: 66px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.11);
  border: 1px solid #ffffff;
  font-family: Lora;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 188.5%;
  color: rgba(255, 255, 255, 0.57);

  &::placeholder {
    font-family: Lora;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 188.5%;
    color: rgba(255, 255, 255, 0.57);
  }

  ${tablet({
    width: "90%",
  })}

  ${aboutResponsive({
    width: "90%",
  })}
`;

const Bottom = styled.div``;

const Copy = styled.p`
  font-family: Lora;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 224.5%;
  color: #ffffff;
`;

const Footer = () => {
  return (
    <Section>
      <Container>
        <Left>
          <Project>
            <Tag>Project</Tag>
            <Link className="link" to="/Hotel">
              <Span>Hotel</Span>
            </Link>
            <Link className="link" to="/Profile">
              <Span>Profile</Span>
            </Link>
          </Project>
          <Team>
            <Tag>Our Team</Tag>
            <Link className="link" to="/About">
              <Span>About us</Span>
            </Link>
            <Link className="link" to="/About">
              <Span>Contact us</Span>
            </Link>
          </Team>
          <Team>
            <Tag>Docs</Tag>
            <Link className="link" to="/About">
              <Span>Privacy Policy</Span>
            </Link>
            <Link className="link" to="/About">
              <Span>Terms of Service</Span>
            </Link>
          </Team>
        </Left>
        <Right>
          <News>Our Newsletter</News>
          <Input placeholder="Email Address" />
          <Button main="true" text="Subscribe to newsletter" footer="true" />
        </Right>
      </Container>
      <Bottom>
        <Container>
          <Copy>Copyright Horizon 2024 ©</Copy>
        </Container>
      </Bottom>
    </Section>
  );
};

export default Footer;
