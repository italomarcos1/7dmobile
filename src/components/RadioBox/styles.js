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
  width: 14px;
  height: 14px;
  border: 1px solid #333;
  border-style: ${({ selected }) => (selected ? 'none' : 'solid')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  span {
    width: 14px;
    height: 14px;

    background-color: #5bc24c;
    border-radius: 50%;
  }
`;
