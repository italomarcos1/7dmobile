import styled from 'styled-components';

export default styled.div`
  width: 134px;
  height: 74px;

  small {
    text-align: left;
    font: 14px 'Roboto';
    letter-spacing: 0.28px;
    color: #aaaaaa;
  }

  div {
    width: 100%;
    height: 50px;
    margin-top: 7px;
    padding: 15px 40px 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    color: #6a707e;

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
    }
  }
`;
