import styled from 'styled-components';

export const Container = styled.div`
  width: 288px;
  height: 74px;
  position: relative;

  input {
    width: 100%;
    height: 50px;
    margin-top: 7px;
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: 15px 20px;

    color: #666;

    &::placeholder {
      color: #666;
    }
  }
`;

export const Title = styled.small`
  text-align: left;
  font: 14px 'Roboto';
  letter-spacing: 0.28px;
  color: #aaa;
`;

export const VerifiedStatus = styled.small`
  font: 450 14px 'Roboto';
  letter-spacing: 0.28px;
  color: ${({ verified }) => (verified ? '#5BC24C' : '#E63F24')};
`;
