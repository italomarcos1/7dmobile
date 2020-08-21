import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: ${({ isDesktop }) =>
    isDesktop ? 'flex-start' : 'space-between'};
  align-items: ${({ isDesktop }) => (isDesktop ? 'center' : 'flex-start')};

  margin-top: 5px;

  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  /* background-color: ${({ isDesktop }) => (isDesktop ? '#fff' : '#00f')}; */
  background-color: #fff;
  height: ${({ isDesktop }) => (isDesktop ? 37 : 84)}px;
  width: ${({ isDesktop }) => (isDesktop ? '906px' : '308px')};
  padding-left: ${({ isDesktop }) => (isDesktop ? 0 : 10)}px;
`;
