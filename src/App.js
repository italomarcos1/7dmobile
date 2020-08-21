import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { format } from 'date-fns';
import en from 'date-fns/locale/en-GB';

import Container from './components/Container';
import InputContainer from './components/InputContainer';
import DualInputContainer from './components/DualInputContainer';
import Header from './components/Header';
import Input from './components/Input';
import Line from './components/Line';
import InputMask from './components/InputMask';
import SubmitButton from './components/SubmitButton';
import RadioButton from './components/CustomRadioButton';
import RadioBox from './components/RadioBox';

function App() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [anyPointsInDrivingLicence, setAnyPointsInDrivingLicence] = useState(
    'no'
  );
  const [howLongDrivingLicence, setHowLongDrivingLicence] = useState(() =>
    format(new Date(), 'MM/dd/yyyy', { locale: en })
  );

  const [anyUnspentConvention, setAnyUnspentConvention] = useState('no');

  const [dateOfBirth, setDateOfBirth] = useState(() =>
    format(new Date(), 'MM/dd/yyyy', { locale: en })
  );

  const [calendarOpen, setCalendarOpen] = useState('none');
  const [age, setAge] = useState('');
  const [station, setStation] = useState('basildon');

  const handleSubmit = useCallback(formData => {
    console.log(formData);
  }, []);

  // useEffect(()=>{
  //   if(isDesktop){

  //   }
  // },[])

  return (
    <>
      <Header />
      <Container onSubmit={handleSubmit}>
        <InputContainer>
          <Line style={{ marginTop: 0 }} isDesktop={isDesktop}>
            <Input name="forename" title="Forename" />
            <Input name="middlename" title="Middle Name" />
            <Input name="surname" title="Surname" />
          </Line>
          <Line isDesktop={isDesktop}>
            <Input name="email" title="Email" hasVerify verified />
            <InputMask
              title="Mobile Number"
              name="mobile"
              type="phone"
              hasVerify
              verified
            />
            <DualInputContainer>
              <Input
                title="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={dateOfBirth}
                setValue={value => setDateOfBirth(value)}
                calendarOpen={calendarOpen}
                setCalendarOpen={value => setCalendarOpen(value)}
                style={{ width: 134 }}
              />
              <InputMask
                title="Age"
                name="age"
                type="code"
                onChange={e => setAge(e.target.value)}
                value={age}
                style={{ width: 134 }}
              />
            </DualInputContainer>
          </Line>
          <Line isDesktop={isDesktop}>
            <RadioButton
              title="Do you have any unspent conviction that may show up when we apply for Criminal Records?"
              option={anyUnspentConvention}
              setOption={value => setAnyUnspentConvention(value)}
              style={{ width: 596 }}
            />
            <InputMask
              title="Enter your postcode"
              name="postcode"
              mask="a99 9aa"
              placeholder="B11 3RP"
            />
          </Line>
          <Line isDesktop={isDesktop}>
            <RadioButton
              title="Is your Driving Licence UK or EU?"
              option={anyUnspentConvention}
              firstOption="UK Driving Licence"
              secondOption="EU Driving Licence"
              setOption={value => setAnyUnspentConvention(value)}
              style={{ width: 288 }}
              column
            />
            <Input
              title="How Long you had your Driving Licence for?"
              name="howLongDrivingLicence"
              type="date"
              value={howLongDrivingLicence}
              setValue={value => setHowLongDrivingLicence(value)}
              calendarOpen={calendarOpen}
              setCalendarOpen={value => setCalendarOpen(value)}
            />
            <RadioButton
              title="Any points in your Driving Licence?"
              option={anyPointsInDrivingLicence}
              setOption={value => setAnyPointsInDrivingLicence(value)}
              style={{ width: 288 }}
            />
          </Line>

          <Line
            isDesktop={isDesktop}
            style={{
              alignItems: 'center',
              height: 57,
              marginTop: 40,
            }}
          >
            <small
              style={{
                textAlign: 'left',
                padding: 0,
                fontSize: 13,
                fontFamily: 'Roboto',
                letterSpacing: 0.28,
                color: '#aaa',
              }}
            >
              Select your nearest preferred delivery station at your choice in
              the map below, please note that the interview may be in a
              different location due to availability.
            </small>
          </Line>

          <Line
            isDesktop={isDesktop}
            style={{
              justifyContent: 'flex-start',
              height: 37,
              marginTop: 5,
            }}
          >
            <RadioBox
              setValue={() => setStation('basildon')}
              selected={station === 'basildon'}
            >
              Basildon (SS14 9AA)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('newHythe')}
              selected={station === 'newHythe'}
              style={{ marginLeft: 20 }}
            >
              New Hythe (ME20 7PA)
            </RadioBox>
          </Line>
          <Line
            isDesktop={isDesktop}
            style={{
              justifyContent: 'flex-start',
              height: 37,
              marginTop: 5,
            }}
          >
            <RadioBox
              setValue={() => setStation('croydon')}
              selected={station === 'croydon'}
            >
              Croydon (CR0 4BD)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('grays')}
              selected={station === 'grays'}
              style={{ marginLeft: 20 }}
            >
              Grays (RM20 3ED)
            </RadioBox>
          </Line>
          <Line
            isDesktop={isDesktop}
            style={{
              justifyContent: 'flex-start',
              height: 37,
              marginTop: 5,
            }}
          >
            <RadioBox
              setValue={() => setStation('croydon2')}
              selected={station === 'croydon2'}
            >
              Croydon 2 (CR0 4XL)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('wembley')}
              selected={station === 'wembley'}
              style={{ marginLeft: 20 }}
            >
              Wembley (NW10 OUX)
            </RadioBox>
          </Line>
          <Line
            isDesktop={isDesktop}
            style={{
              justifyContent: 'flex-start',
              height: 37,
              marginTop: 5,
            }}
          >
            <RadioBox
              setValue={() => setStation('belvedere')}
              selected={station === 'belvedere'}
            >
              Belvedere (DA17 6AS)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('weybridge')}
              selected={station === 'weybridge'}
              style={{ marginLeft: 20 }}
            >
              Weybridge (KT13 0YU)
            </RadioBox>
          </Line>
          <Line
            isDesktop={isDesktop}
            style={{
              alignItems: 'flex-start',
              marginTop: 40,
            }}
          >
            <SubmitButton style={{ width: 288, height: 76 }} />
          </Line>
        </InputContainer>
      </Container>
    </>
  );
}

export default App;
