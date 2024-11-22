import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

  {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #f2f2f2;
    overflow-x: hidden;
  }

  html, body {
  max-width: 100%;
  }

  /* Imagens e vídeos responsivos */
  img, video {
    max-width: 100%;
    height: auto;
  }

  /* Ajuste global para fontes e espaçamentos */
  body {
    font-size: 16px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Para telas menores que 1024px (tablets) */
  @media (max-width: 1024px) {
    body {
      font-size: 14px;
    }
  }

  /* Para telas menores que 768px (celulares) */
  @media (max-width: 768px) {
    body {
      font-size: 12px;
    }
}

`;

export default Global;