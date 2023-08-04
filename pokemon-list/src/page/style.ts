import styled from "styled-components";
export const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    padding: 80px;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 40%;
    }
  }

  input {
    height: 50px;
    margin-bottom: 30px;
    padding-left: 20px;
    border: 0px;
    border-radius: 0px 0px 10px 10px;
    border-top: 4px solid var(--color-blue-900);

    font-size: 2rem;
  }
`;
