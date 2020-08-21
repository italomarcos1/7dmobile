import styled from 'styled-components';
import { Form } from '@unform/web';

export default styled(Form)`
  display: flex;
  padding-top: 27.5px;
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  height: ${({ isDesktop }) => (isDesktop ? '100%' : '1000px')};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
