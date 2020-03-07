import React from "react";

import { Container, Logo, Profile, Avatar } from "./styles";

export default function Header() {
  return (
    <Container>
      <Logo />
      <Profile>
        <p>Meu perfil</p>
        <Avatar src="../../assets/avatar.png" />
      </Profile>
    </Container>
  );
}
