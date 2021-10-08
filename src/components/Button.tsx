import styled from "styled-components";

const Button = styled.button`
  outline: none;
  border: none;
  background: none;
  background: var(--button-color);
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.5s;
  font-size: 1em;

  :hover {
    transform: scale(1.05);
  }
`;

export default Button;
