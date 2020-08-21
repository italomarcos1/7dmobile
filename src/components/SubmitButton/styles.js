import styled from 'styled-components';

export const Container = styled.button.attrs({ type: 'submit' })`
  display: flex;
  /* flex: 1
   */
  width: 100%;
  height: 98px;
  /* width: 100%; */
  background-color: #24b456;
  place-content: center;
  align-items: center;
  justify-content: center;
  font: bold 16px 'Roboto';
  color: #fff;
  text-transform: uppercase;
`;
