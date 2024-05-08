import styled from "styled-components";
import { mobile } from "../../responsive.js";

const Image = styled.img`
  margin-left: 39px;
`;

const Buttons = styled.button`
  cursor: pointer;
  outline: none;
  border: ${(props) =>
    props.outline === true
      ? "2px solid #854BFF"
      : props.item === true
      ? "1px solid #854BFF"
      : 0};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) =>
    props.outline === true
      ? "150px"
      : props.item === true
      ? "65px"
      : props.market === true
      ? "252px"
      : "188px"};
  height: ${(props) => (props.item === true ? "26px" : "49px")};
  background: ${(props) =>
    props.main === "true"
      ? "#a65acc"
      : props.size
      ? "white"
      : props.outline
      ? "transparent"
      : props.item === true
      ? "transparent"
      : props.market === true
      ? "#F8F4FF"
      : props.responsive === true
      ? "#FFF"
      : "#a65acc"};
  border-radius: 10px;
  font-family: Lora;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: ${(props) => (props.market ? "21px" : "188.5%")};
  color: ${(props) =>
    props.outline === true
      ? "#854BFF"
      : props.item === true
      ? "#854BFF"
      : props.market === true
      ? "#3A3B7B"
      : "#FFFFFF"};
  margin-left: ${(props) => props.outline === true && "20px"};
  margin-top: ${(props) => (props.item === true ? 0 : "39px")};
  margin: ${(props) => props.market === true && "0 auto"};

  ${mobile({
    marginLeft: 0,
    width: "100%",
  })};
`;

const Button = ({ text, outline, item, market, arrowRight, main, loading }) => {
  return (
    <>
      {
        <Buttons market="true" item="true" outline="true" main="true">
          {text} {market && <Image src={arrowRight} alt="arrow" />}
        </Buttons>
      }
    </>
  );
};

export default Button;
