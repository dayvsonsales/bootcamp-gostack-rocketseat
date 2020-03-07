import React from "react";

import {
  Container,
  PostList,
  Post,
  Comment,
  Avatar,
  Divider,
  Info,
  User,
  PostItem
} from "./styles";

export default function Feed() {
  const state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: "../../assets/avatar.png"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "../../assets/avatar.png"
            },
            content: "Conteúdo do comentário"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Diego Fernandes",
          avatar: "../../assets/avatar.png"
        },
        date: "04 Jun 2019",
        content: "Ficou massa esse novo feed",
        comments: [
          {
            id: 1,
            author: {
              name: "Dayvson Sales",
              avatar: "../../assets/avatar.png"
            },
            content:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
        ]
      }
    ]
  };

  return (
    <Container>
      <PostList>
        {state.posts.map(post => (
          <PostItem key={post.id}>
            <Post>
              <User>
                <Avatar width="40px" height="40px" src={post.author.avatar} />
                <Info>
                  <p>{post.author.name}</p>
                  <span>{post.date}</span>
                </Info>
              </User>

              <p>{post.content}</p>
            </Post>
            <Divider />
            {post.comments.map(comment => (
              <Comment key={comment.id}>
                <Avatar
                  width="20px"
                  height="20px"
                  src={comment.author.avatar}
                />
                <p>
                  <span>{comment.author.name}</span>
                  {comment.content}
                </p>
              </Comment>
            ))}
          </PostItem>
        ))}
      </PostList>
    </Container>
  );
}
