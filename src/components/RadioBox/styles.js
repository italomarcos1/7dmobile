import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 201px;
  height: 37px;
  align-items: center;
  justify-content: flex-start;

  small {
    margin-left: 10px;
    text-align: left;
    font: 14px 'Roboto';
    letter-spacing: 0.28px;
    color: #666;
  }
`;

export const Button = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  span {
    width: 10px;
    height: 10px;

    background-color: #13383c;
    border-radius: 50%;
  }
`;
