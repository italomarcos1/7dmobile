import styled from 'styled-components';
import { shade } from 'polished';
import PrevMonth from '../../assets/chevron_left.svg';
import NextMonth from '../../assets/chevron_right.svg';
import close from '../../assets/close1.svg';

export const Container = styled.div`
  width: ${({ full }) => (full ? '100%' : '288px')};
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
    padding-left: 10px;

    color: #666;

    &::placeholder {
      color: #666;
    }
  }
`;

export const CloseCalendarButton = styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  margin-left: 15px;
  margin-top: 15px;
  z-index: 4;

  background-image: url(${close});
  background-color: transparent;
  background-size: 25px;
  background-repeat: no-repeat;
  background-position: center;
  width: 30px;
  height: 30px;
  &:hover {
    cursor: pointer;
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

export const DayPickerContainer = styled.aside`
  width: 288px;
  height: 254px;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;

  .DayPicker {
    background: #ffffff;
    border-radius: 4px;
    width: 288px;
    border: 0.5px solid #aaa;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker-Month {
    width: 268px;

    border-collapse: separate;
    border-spacing: 0px;
    margin: 4px;
  }

  .DayPicker-Caption {
    text-align: center;
    font: bold 12px/50px 'Roboto';
    letter-spacing: 0.32px;
    color: #abafb3;
    text-transform: uppercase;
  }

  .DayPicker-NavButton--prev {
    background-image: url(${PrevMonth});
    width: 30px;
    height: 30px;
  }
  .DayPicker-NavButton--next {
    background-image: url(${NextMonth});
    width: 30px;
    height: 30px;
    margin-left: 20px;
  }

  .DayPicker-NavButton--prev,
  .DayPicker-NavButton--next {
    background-size: 18px;

    margin-left: 10px;

    &:hover {
      cursor: pointer;
    }
  }

  .DayPicker-Day {
    width: 10px;
    height: 10px;
    color: #6a707e;

    &:hover {
      cursor: pointer;
      background-color: #13383c;
      color: #fff;
    }
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    color: #6a707e;
    &:hover {
      color: #fff;
    }
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.1, '#13383C')};
    width: 10px;
    height: 10px;
    color: #fff;
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #6a707e !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #13383c !important;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    color: #fff !important;
  }
`;
