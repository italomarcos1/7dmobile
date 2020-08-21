import styled from 'styled-components';

export default styled.div`
  width: 906px;
  display: flex;
  justify-content: space-between;
  height: 76px;
  align-items: center;
  margin-top: 20px;

  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  background-color: ${({ isDesktop }) => (isDesktop ? '#fff' : '#f0f')};
  height: ${({ isDesktop }) => (isDesktop ? 76 : 248)}px;
`;
