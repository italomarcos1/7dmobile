import styled from 'styled-components';

export default styled.div`
  width: ${({ isDesktop }) => (isDesktop ? '996px' : '100%')};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 1656px;
  align-self: center;
  align-items: center;
  background-color: ${({ isDesktop }) => (isDesktop ? '#fff' : '#0f0')};
`;
