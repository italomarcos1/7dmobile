import styled, { keyframes } from 'styled-components';

export default styled.button.attrs({
  type: 'button',
})`
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.3);
  top: 0;
  border: none;
  left: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ isDesktop }) => (isDesktop ? 0 : 20)}px;

  cursor: auto;
`;

const popup = keyframes` /** animação para rotacionar o icon. */
  from {
    opacity:0;
    width: 200px;
    height: 150px;

    #click{
      display:none;
    }
  }

  to {
    opacity:1;
    width: 400px;
    height: 300px;

    #click{
      display:block;
    }
  }
`;

export const Content = styled.button.attrs({ type: 'button' })`
  /* width: 400px; */
  width: ${({ isDesktop }) => (isDesktop ? '400px' : '100%')};
  height: 300px;
  border-radius: 8px;
  border: 2px solid #f53030;
  background-color: #ffdfdf;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  animation: ${popup} 0.1s linear normal;
`;

export const Title = styled.strong`
  font: bold 48px 'Roboto';
  color: #a03030;
  margin-bottom: 20px;
`;

export const Message = styled.strong`
  font: 20px 'Roboto';
  color: #c03030;
`;

export const ClickAnywhere = styled.small`
  font: bold 16px 'Roboto';
  color: #a01010;
`;
