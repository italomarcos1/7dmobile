import styled from 'styled-components';

export const Container = styled.div`
  width: 288px;
  height: 74px;
  position: relative;

  input {
    width: 100%;
    height: 50px;
    margin-top: 7px;
    border-style: solid;
    background-color: #fff;
    border-color: ${({ error }) => (error ? '#f53030' : '#aaa')};
    border-width: ${({ error }) => (error ? 2 : 1)}px;
    border-radius: 4px;
    padding: 15px 20px;

    color: #666;

    &::placeholder {
      color: ${({ error }) => (error ? '#f53030' : '#aaa')};
    }
  }
`;

export const Title = styled.small`
  text-align: left;
  font: 14px 'Roboto';
  letter-spacing: 0.28px;
  color: ${({ error }) => (error ? '#f53030' : '#aaa')};
`;

export const VerifiedStatus = styled.small`
  font: 450 14px 'Roboto';
  letter-spacing: 0.28px;
  color: ${({ verified }) => (verified ? '#5BC24C' : '#E63F24')};
`;
