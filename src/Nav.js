import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import media from "./styles/media";

const MainNav = styled.nav`
  background-color: #54c0a5;
  color: white;
  text-align: center;
`;

const H3 = styled.h3`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Btn = styled.button`
  margin: 1.5rem 10px 1rem 10px;
  background: white;

  ${media.phone`display: none;`}
`;

const Nav = ({ signOut }) => (
  <MainNav>
    <div className="container">
      <div className="row">
        <div className="one column" />
        <div className="ten columns">
          <H3>Holahi</H3>
        </div>
        <div className="one column">
          <Btn onClick={signOut}>Sign Out</Btn>
        </div>
      </div>
    </div>
  </MainNav>
);

Nav.propTypes = {
  signOut: PropTypes.func.isRequired
};

export default Nav;
