import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: ${({ isDesktop }) =>
    isDesktop ? 'flex-start' : 'space-between'};
  align-items: ${({ isDesktop }) => (isDesktop ? 'center' : 'flex-start')};

  margin-top: 5px;

  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  background-color: ${({ isDesktop }) => (isDesktop ? '#fff' : '#00f')};
  height: ${({ isDesktop }) => (isDesktop ? 37 : 94)}px;
  width: ${({ isDesktop }) => (isDesktop ? '906px' : '308px')};
`;
