import styled from "styled-components";

export const ContainerLi = styled.li`
  display: flex;
  flex-wrap: wrap;

  margin: 15px 0px 15px 0px;
  width: 700px;
  height: auto;
  padding: 0px 20px 0px 20px;
  border-radius: 0px 0px 10px 10px;
  border-top: 8px solid var(--color-blue-900);

  background-color: var(--color-gray-100);
  color: var(--color-gray-900);

  h2 {
    font-size: 3rem;
    font-weight: 400;
    color: var(--color-gray-900);
  }

  span {
    font-size: 1.3rem;
    font-weight: 400;
    color: var(--color-blue-900);

    padding-bottom: 10px;
    width: inherit;

    display: flex;
    justify-content: center;

    cursor: pointer;
  }

  img {
    width: 80px;
  }

  .key {
    color: var(--color-blue-900);
    width: 130px;
  }
`;

export const LiHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: inherit;
`;

export const LiMain = styled.div`
  display: flex;
  border-top: 1px solid var(--color-blue-900);

  p {
    font-size: 1.5rem;
  }

  div {
    width: inherit;
  }
`;

export const StatCard = styled.ul`
  height: 120px;
  width: 320px;

  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-between;

  height: 120px;
  width: 345px;
  padding: 5px 0px 5px 0px;

  li {
    display: flex;
  }
`;

export const AbilityAndTypeCard = styled.ul`
  display: flex;
  gap: 50px;

  width: 315px;
  padding-top: 13px;

  list-style: none;

  /* li {
    display: flex;
    flex-direction: column;
  } */

  p {
    padding-bottom: 8px;
  }
`;
