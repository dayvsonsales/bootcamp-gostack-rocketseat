import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #4a90e2;
  height: 64px;
  width: 100%;
`;

export const Logo = styled.div`
  margin-left: 42px;
  margin-top: 20px;
  width: 121px;
  height: 24px;
  left: 42px;
  top: 20px;
  background-image: url("../../assets/facebook.svg");
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-right: 42px;
  margin-top: 5px;

  p {
    margin-left: 42px;
    margin-top: 20px;

    color: white;
    font-family: sans-serif;
    font-weight: bold;
  }

  img {
    width: 27px;
    height: 27px;
    border-radius: 50%;
    margin-top: 10px;
    margin-left: 5px;
    background-color: white;
  }
`;

export const Avatar = styled.img``;
