import styled from "styled-components";

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 20px 0px 40px 0px;

  span {
    font-size: 4rem;

    cursor: pointer;
    font-weight: 700;

    color: var(--color-blue-500);
  }

  p {
    font-size: 1.8rem;

    cursor: pointer;
    font-weight: 600;

    color: var(--color-blue-100);
  }
`;
