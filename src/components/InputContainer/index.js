import styled from 'styled-components';

export default styled.div`
  width: 996px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 1184px;
  align-self: center;
  align-items: center;

  div {
    &.content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 20px;
    }
  }
`;
