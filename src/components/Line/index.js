import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  /* background-color: ${({ isDesktop }) => (isDesktop ? '#fff' : '#f0f')}; */
  background-color: #fff;
  height: ${({ isDesktop }) => (isDesktop ? 74 : 262)}px;
  width: ${({ isDesktop }) => (isDesktop ? '906px' : '308px')};
`;
