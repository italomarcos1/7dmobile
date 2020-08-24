import styled from 'styled-components';

export const Container = styled.button`
  height: 26px;
  width: 60px;
  border-radius: 20px;
  background-color: ${({ checked }) => (checked ? '#75d943' : '#aaa')};
  display: flex;
  align-items: center;
  justify-content: ${({ checked }) => (checked ? 'flex-end' : 'flex-start')};
  user-select: none;
`;

export const Button = styled.span`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: ${({ checked }) => (checked ? '#390' : '#666')};
`;
