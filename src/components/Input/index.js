import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { format } from 'date-fns';
import en from 'date-fns/locale/en-GB';

import {
  Container,
  Title,
  VerifiedStatus,
  DayPickerContainer,
  CloseCalendarButton,
} from './styles';

import Input from './input';

export default function CustomInput({
  name,
  title,
  full,
  fontSize,
  style,
  hasVerify,
  verified,
  calendarOpen,
  setCalendarOpen,
  setValue,
  type,
  ...rest
}) {
  const [selectedDate, setSelectedDate] = useState(() =>
    format(new Date(), 'MM/dd/yyyy', { locale: en })
  );

  const handleDateChange = useCallback((day, modifiers) => {
    console.log('action taken');
    if (modifiers.available) {
      const dateFormatted = format(day, 'MM/dd/yyyy', { locale: en });
      console.log(dateFormatted);
      setSelectedDate(dateFormatted);
      setValue(dateFormatted);
      setCalendarOpen('none');
    }
  }, []);
  return (
    <Container full={full} style={style}>
      <div>
        <Title style={{ fontSize }}>{title}</Title>
        <VerifiedStatus verified={hasVerify && verified} style={{ fontSize }}>
          {hasVerify && ` ${verified ? 'Verified' : 'Unverified'}`}
        </VerifiedStatus>
      </div>
      <Input
        name={name}
        placeholder="Type here..."
        onFocus={() => setCalendarOpen(name)}
        // onBlur={() => setCalendarOpen('none')}
        {...rest}
      />
      {type === 'date' && calendarOpen === name && (
        <DayPickerContainer>
          <CloseCalendarButton onClick={() => setCalendarOpen('none')} />
          <DayPicker
            onDayMouseDown={handleDateChange}
            weekdaysShort={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
            fromMonth={new Date()}
            modifiers={{
              available: {
                after: new Date(1950, 1, 1),
                // daysOfWeek: [0, 1, 2, 3, 4, 5, 6, 7],
              },
            }}
            selectedDays={selectedDate}
          />
        </DayPickerContainer>
      )}
    </Container>
  );
}

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  fontSize: PropTypes.number,
  full: PropTypes.bool,
  hasVerify: PropTypes.bool,
  verified: PropTypes.bool,
  calendarOpen: PropTypes.string,
  setCalendarOpen: PropTypes.func,
  setValue: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object]),
};

CustomInput.defaultProps = {
  full: false,
  hasVerify: false,
  verified: false,
  fontSize: 14,
  calendarOpen: 'none',
  type: 'none',
  setCalendarOpen: () => {},
  setValue: () => {},
  style: {},
};
