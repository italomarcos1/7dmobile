import styled from 'styled-components';

export default styled.div`
  width: 906px;
  display: flex;
  justify-content: space-between;
  height: 76px;
  align-items: center;
  margin-top: 20px;

  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
`;
