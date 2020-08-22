import React, { useCallback, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import {
  isAfter,
  getYear,
  getMonth,
  fromUnixTime,
  isDate,
  isValid,
  isFuture,
  isExists,
  toDate,
  parseISO,
  formatDistanceStrict,
} from 'date-fns';

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
  const [howLongDrivingLicence, setHowLongDrivingLicence] = useState('');

  const [anyUnspentConvention, setAnyUnspentConvention] = useState('no');
  const [drivingLicenceOrigin, setDrivingLicenceOrigin] = useState('yes');

  const [dateOfBirth, setDateOfBirth] = useState('');

  const [age, setAge] = useState('');
  const [station, setStation] = useState('basildon');

  const dateIsValid = useCallback(date => {
    const [month, day, year] = date.split('/');

    const formattedMonth = Number(month) - 1;
    const formattedDay = Number(day);
    const formattedYear = Number(year);

    return isExists(formattedYear, formattedMonth, formattedDay);
  }, []);

  const handleSubmit = useCallback(
    formData => {
      const data = Object.values(formData);
      const anyEmptyField = data.some(field => field === '');
      if (anyEmptyField) {
        toast.error('You must fill each field before submitting.');
        return;
      }

      // const currentYear = getYear(new Date());

      // (month === '02' && Number(day) > 29) ||
      // Number(month) > 12 ||
      // month === '00' ||
      // day === '00' ||
      // year === '0000' ||
      // year > currentYear - 16 ||
      // year < currentYear - 90

      // console.log('w/o toDate');
      // console.log(isValid(new Date(1999, 13, 31)));
      // console.log(isValid(new Date(1999, 11, 31)));
      // console.log('w toDate');
      // console.log(isValid(toDate(new Date(1999, 13, 31))));
      // console.log(isValid(toDate(new Date(1999, 11, 31))));
      // console.log('dot');
      // console.log(isExists(1999, 13, 31));
      // console.log(isExists(1999, 11, 31));
      console.log(dateOfBirth);
      if (!dateIsValid(dateOfBirth)) {
        toast.error('You must provide a valid Birthdate.');
        return;
      }

      if (!dateIsValid(howLongDrivingLicence)) {
        toast.error("Your Driving Licence's date is invalid.");
        return;
      }

      // if (
      //   !isDate(new Date(year, month, day)) ||
      //   !isValid(new Date(year, month, day)) ||
      //   isFuture(new Date(year, month, day))
      // ) {
      //   toast.error('You must provide a valid birthdate.');
      //   return;
      // }

      console.log(anyUnspentConvention);
      if (drivingLicenceOrigin === 'yes') console.log('uk');
      else console.log('eu');
      console.log(anyPointsInDrivingLicence);
      console.log(station);
      console.log(dateOfBirth);
      console.log(drivingLicenceOrigin);
      console.log(howLongDrivingLicence);
      toast.success('Thanks for submitting your application.');
    },
    [
      anyPointsInDrivingLicence,
      anyUnspentConvention,
      drivingLicenceOrigin,
      dateOfBirth,
      howLongDrivingLicence,
      station,
      dateIsValid,
    ]
  );
  // console.log(isAfter(new Date(), new Date(2003, 14, 11)));
  // console.log(isFuture(new Date(2100, 11, 31)));

  const calculateAge = useCallback(() => {
    if (!dateIsValid(dateOfBirth)) {
      return;
    }

    const [month, day, year] = dateOfBirth.split('/'); // captura dia, mês e ano da data informada e salva em variáveis separadas
    const today = new Date().toString(); // captura a data atual e armazena como string
    const currentDate = today.split(' '); // separa cada campo da data (dia, mês) em um array
    const currentDay = currentDate[2]; // a data vem em um array e o dia eh o terceiro elemento do array. capturamos o dia
    const currentMonth = getMonth(new Date()); // pega o mês da data atual
    const formattedCurrentMonth = currentMonth + 1; // o date-fns diminui 1 numero do valor

    const formattedDay = Number(day); // casting para numero, pois o dia vem como uma string
    const formattedMonth = Number(month); // casting para numero, pois o mês vem como uma string

    console.log(formattedMonth);
    console.log(formattedDay);
    console.log(formattedCurrentMonth);
    console.log(currentDay);

    const currentAge = formatDistanceStrict(
      Date.now(),
      new Date(year, month, day)
    );
    console.log(`${currentDay} of ${formattedCurrentMonth}`);

    const [formattedAge] = currentAge.split(' ');

    console.log(formattedCurrentMonth);
    console.log(formattedMonth);
    console.log(currentDay);
    console.log(formattedDay);

    if (
      (currentDay < formattedDay && formattedMonth === formattedCurrentMonth) ||
      formattedMonth > formattedCurrentMonth
    ) {
      setAge(formattedAge - 1);
    } else {
      setAge(formattedAge);
    }
  }, [dateOfBirth, dateIsValid]);
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
            <Input name="email" title="Email" />
            <InputMask title="Mobile Number" name="mobile" type="phone" />
            <DualInputContainer>
              <InputMask
                title="Date of Birth"
                name="dateOfBirth"
                value={dateOfBirth}
                placeholder="MM/DD/YYYY"
                onChange={e => setDateOfBirth(e.target.value)}
                onBlur={calculateAge}
                style={{ width: 134 }}
              />
              <InputMask
                title="Age"
                name="age"
                type="code"
                onChange={e => setAge(e.target.value)}
                value={age}
                disabled
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
              option={drivingLicenceOrigin}
              firstOption="UK Driving Licence"
              secondOption="EU Driving Licence"
              setOption={value => setDrivingLicenceOrigin(value)}
              style={{ width: 288 }}
              column
            />
            <InputMask
              title="How Long you had your Driving Licence for?"
              name="howLongDrivingLicence"
              placeholder="MM/DD/YYYY"
              value={howLongDrivingLicence}
              onChange={e => setHowLongDrivingLicence(e.target.value)}
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
              disabled
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
