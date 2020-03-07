import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  width: 50%;
`;

export const PostList = styled.div`
  min-width: 100%;
  min-height: 200px;
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;

  p {
    span {
      font-weight: bold;
      margin-right: 5px;
    }

    border-radius: 24px;
    background-color: #eeeeee;
    width: 100%;
    padding: 12px;
    margin-left: 10px;
    margin-right: 20px;
    font-size: 14px;
    color: #4a4a4a;
  }
`;

export const Divider = styled.div`
  border: 1px solid #eee;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  height: 1px;
`;

export const Post = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;

  & > p {
    margin-top: 20px;
  }
`;

export const PostItem = styled.div`
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.133916);
  border-radius: 4px;
  padding-bottom: 15px;
  padding-top: 5px;
  margin-top: 10px;
`;

export const User = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  p {
    font-weight: bold;
  }

  span {
    color: grey;
    font-size: 13px;
  }
`;

export const Avatar = styled.img`
  border-radius: 50px;
  min-height: 32px;
  min-width: 32px;
`;
