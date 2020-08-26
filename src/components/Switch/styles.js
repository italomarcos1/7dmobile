import styled from 'styled-components';

export const Container = styled.button.attrs({
  type: 'button',
})`
  height: 21px;
  width: 40px;
  border-radius: 20px;
  background-color: ${({ checked }) => (checked ? '#75d943' : '#aaa')};
  display: flex;
  align-items: center;
  justify-content: ${({ checked }) => (checked ? 'flex-end' : 'flex-start')};
  user-select: none;
`;

export const Button = styled.span`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${({ checked }) => (checked ? '#390' : '#666')};
`;
