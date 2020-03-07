import React from "react";

import GlobalStyle from "./styles/global";

import Header from "./components/Header";
import Feed from "./components/Feed";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Feed />
    </>
  );
}

export default App;
