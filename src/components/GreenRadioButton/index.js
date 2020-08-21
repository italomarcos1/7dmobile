import styled from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  background-color: ${({ selected }) => (selected ? '#5bc24c' : '#fff')};
  border: ${({ selected }) => (selected ? 'none' : '1px solid #707070')};
  border-radius: 50%;
  height: 14px;
  width: 14px;
  margin-right: 11px;
`;
