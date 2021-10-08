import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Search from "./Search";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px;
`;

const Menu = styled(Link)`
  text-decoration: none;
  font-size: 1.6rem;
  transition: all 0.5s;

  :hover {
    text-decoration: underline;
  }
`;

const Menus = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;
  padding-left: 32px;
  border-left: solid 3px var(--default-white);
`;

const Title = styled(Link)`
  text-decoration: none;
  font-size: 1.6rem;
  margin-right: 16px;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title to="/">TMDB Client</Title>

      <Menus>
        <Menu to="/movies">Movies</Menu>
        <Menu to="/series">TV Series</Menu>
        <Menu to="/artists">Artists</Menu>
      </Menus>

      <Search />
    </HeaderContainer>
  );
};

export default Header;
