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
import RadioBoxLine from './components/RadioBoxLine';
import InputMask from './components/InputMask';
import SubmitButton from './components/SubmitButton';
import RadioButton from './components/CustomRadioButton';
import RadioButtonContainer from './components/GreenRadioButtonContainer';
import CustomRadioButton from './components/GreenRadioButton';
import RadioBox from './components/RadioBox';
import Subtitle from './components/Subtitle';

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

  // Line: 262 = 74 + 74 + 74 + 20 + 20
  // 1048 - 4 lines
  // Subtitle: 116
  // 1164 - lines + subtitle
  // RadioBoxLine: 376 = 94 + 94 + 94 + 94
  // SubmitButton: 116

  // Total: 1656

  return (
    <>
      <Header />
      <Container onSubmit={handleSubmit} isDesktop={isDesktop}>
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
          <Line
            isDesktop={isDesktop}
            style={isDesktop ? { height: 74 } : { height: 188 }}
          >
            <RadioButtonContainer
              style={
                isDesktop ? { width: 596 } : { width: '100%', paddingLeft: 10 }
              }
            >
              <small>
                Do you have any unspent conviction that may show up when we
                apply for Criminal Records?
              </small>
              <div>
                <span>
                  <CustomRadioButton
                    selected={anyUnspentConvention === 'yes'}
                    onClick={() => setAnyUnspentConvention('yes')}
                  />
                  Yes
                </span>
                <span>
                  <CustomRadioButton
                    selected={anyUnspentConvention === 'no'}
                    onClick={() => setAnyUnspentConvention('no')}
                    style={{ marginLeft: 20 }}
                  />
                  No
                </span>
              </div>
            </RadioButtonContainer>

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
            style={
              isDesktop
                ? {
                    alignItems: 'center',
                    height: 57,
                    marginTop: 40,
                  }
                : {
                    alignItems: 'center',
                    height: 77,
                    marginTop: 0,
                  }
            }
          >
            <Subtitle isDesktop={isDesktop}>
              Select your nearest preferred delivery station at your choice in
              the map below, please note that the interview may be in a
              different location due to availability.
            </Subtitle>
          </Line>

          <RadioBoxLine isDesktop={isDesktop}>
            <RadioBox
              setValue={() => setStation('basildon')}
              selected={station === 'basildon'}
            >
              Basildon (SS14 9AA)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('newHythe')}
              selected={station === 'newHythe'}
              style={isDesktop ? { marginLeft: 20 } : { marginLeft: 0 }}
            >
              New Hythe (ME20 7PA)
            </RadioBox>
          </RadioBoxLine>
          <RadioBoxLine isDesktop={isDesktop}>
            <RadioBox
              setValue={() => setStation('croydon')}
              selected={station === 'croydon'}
            >
              Croydon (CR0 4BD)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('grays')}
              selected={station === 'grays'}
              style={isDesktop ? { marginLeft: 20 } : { marginLeft: 0 }}
            >
              Grays (RM20 3ED)
            </RadioBox>
          </RadioBoxLine>
          <RadioBoxLine isDesktop={isDesktop}>
            <RadioBox
              setValue={() => setStation('croydon2')}
              selected={station === 'croydon2'}
            >
              Croydon 2 (CR0 4XL)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('wembley')}
              selected={station === 'wembley'}
              style={isDesktop ? { marginLeft: 20 } : { marginLeft: 0 }}
            >
              Wembley (NW10 OUX)
            </RadioBox>
          </RadioBoxLine>
          <RadioBoxLine isDesktop={isDesktop}>
            <RadioBox
              setValue={() => setStation('belvedere')}
              selected={station === 'belvedere'}
            >
              Belvedere (DA17 6AS)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('weybridge')}
              selected={station === 'weybridge'}
              style={isDesktop ? { marginLeft: 20 } : { marginLeft: 0 }}
            >
              Weybridge (KT13 0YU)
            </RadioBox>
          </RadioBoxLine>
          {isDesktop && (
            <Line
              isDesktop={isDesktop}
              style={{
                alignItems: 'flex-start',
                marginTop: 40,
              }}
            >
              <SubmitButton style={{ width: 288, height: 76 }} />
            </Line>
          )}
        </InputContainer>
        {!isDesktop && (
          <Line
            style={{
              width: '100%',
              height: 76,
              alignItems: 'flex-start',
              marginTop: 40,
            }}
          >
            <SubmitButton
              style={
                isDesktop
                  ? { width: 288, height: 76 }
                  : { width: '100%', height: 76 }
              }
            />
          </Line>
        )}
      </Container>
    </>
  );
}

export default App;
