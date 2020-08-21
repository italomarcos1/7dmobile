import styled from 'styled-components';

export default styled.div`
  text-align: left;
  padding: 0;
  padding-left: ${({ isDesktop }) => (isDesktop ? 0 : 10)}px;
  font-size: 13px 'Roboto';
  letter-spacing: 0.28px;
  color: #aaa;
`;
