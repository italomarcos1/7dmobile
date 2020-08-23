import React, { useCallback, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { getMonth, getYear, isExists, formatDistanceStrict } from 'date-fns';
import * as Yup from 'yup';
import Recaptcha from 'react-recaptcha';

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
  const [postcode, setPostcode] = useState('');

  const [age, setAge] = useState('');
  const [station, setStation] = useState('basildon');
  const [invalidBirthDate, setInvalidBirthDate] = useState(false);
  const [invalidDrivingLicenceDate, setInvalidDrivingLicenceDate] = useState(
    false
  );
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPostcode, setInvalidPostcode] = useState(false);
  const [invalidMobile, setInvalidMobile] = useState(false);

  const [invalidFields, setInvalidFields] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [canSubmit, setCanSubmit] = useState('');

  const dateIsValid = useCallback(date => {
    const [month, day, year] = date.split('/');

    const formattedMonth = Number(month) - 1;
    const formattedDay = Number(day);
    const formattedYear = Number(year);
    const currentYear = getYear(new Date());

    return (
      isExists(formattedYear, formattedMonth, formattedDay) &&
      currentYear > formattedYear
    );
  }, []);

  const postcodeValidation = Yup.object().shape({
    postcode: Yup.string()
      .matches(/^[a-zA-Z][0-9][0-9]\s[0-9][a-zA-Z][a-zA-Z]$/)
      .required(),
  });
  const mobileValidation = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[0-9][0-9][0-9][0-9][0-9]\s[0-9][0-9][0-9][0-9][0-9][0-9]$/)
      .required(),
  });

  const emailValidation = Yup.object().shape({
    email: Yup.string().required().email(),
  });

  const verifyCallback = useCallback(response => {
    if (response) setCanSubmit(true);
  }, []);

  const handleSubmit = useCallback(
    async formData => {
      const data = Object.values(formData);
      data.splice(6, 1);
      invalidFields.fill(false);
      setInvalidEmail(false);
      setInvalidMobile(false);
      setInvalidPostcode(false);
      setInvalidBirthDate(false);
      setInvalidDrivingLicenceDate(false);
      const anyEmptyField = data.some(field => field === '');

      if (anyEmptyField) {
        setInvalidFields(data.map(element => element === ''));
        if (!dateIsValid(dateOfBirth)) setInvalidBirthDate(true);
        if (!dateIsValid(howLongDrivingLicence))
          setInvalidDrivingLicenceDate(true);

        const mobileNumberInfo = data[4];
        console.log(mobileNumberInfo);
        setInvalidPostcode(!(await postcodeValidation.isValid({ postcode })));
        console.log(
          !(await mobileValidation.isValid({
            mobileNumberInfo,
          }))
        );
        setInvalidMobile(
          !(await mobileValidation.isValid({
            mobile: mobileNumberInfo,
          }))
        );

        toast.error('You must fill each field before submitting.');
        return;
      }

      const { forename, middlename, surname, mobile, email } = formData;

      if (!(await emailValidation.isValid({ email }))) {
        toast.error('You must provide a valid email address.');
        setInvalidEmail(true);
        return;
      }

      if (!dateIsValid(dateOfBirth)) {
        toast.error('You must provide a valid Birthdate.');
        setInvalidBirthDate(true);
        return;
      }

      if (!dateIsValid(howLongDrivingLicence)) {
        toast.error("Your Driving Licence's date is invalid.");
        setInvalidDrivingLicenceDate(true);
        return;
      }

      if (!(await postcodeValidation.isValid({ postcode }))) {
        toast.error('You must provide a valid postcode.');
        return;
      }

      if (
        !(await mobileValidation.isValid({
          mobile: data[4],
        }))
      ) {
        setInvalidMobile(true);
        toast.error('You must provide a valid mobile number.');
        return;
      }
      console.log(forename);
      console.log(middlename);
      console.log(surname);
      console.log(email);
      console.log(mobile);
      console.log(dateOfBirth);
      console.log(age);
      console.log(anyUnspentConvention);
      console.log(postcode);
      if (drivingLicenceOrigin === 'yes') console.log('uk');
      else console.log('eu');
      console.log(howLongDrivingLicence);
      console.log(anyPointsInDrivingLicence);
      console.log(station);
      toast.success('Thanks for submitting your application.');
    },
    [
      anyPointsInDrivingLicence,
      anyUnspentConvention,
      drivingLicenceOrigin,
      dateOfBirth,
      howLongDrivingLicence,
      station,
      invalidFields,
      dateIsValid,
      postcode,
      emailValidation,
      postcodeValidation,
      mobileValidation,
      age,
    ]
  );

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

    const currentAge = formatDistanceStrict(
      Date.now(),
      new Date(year, month, day)
    ); // calculando a idade, comparando a data informada com o dia atual

    const [formattedAge] = currentAge.split(' ');

    // se o mês informado for maior que o mês atual, ou for o mesmo mês mas com dia maior, o usuário não fez aniversario ainda
    if (
      (currentDay < formattedDay && formattedMonth === formattedCurrentMonth) ||
      formattedMonth > formattedCurrentMonth
    ) {
      setAge(formattedAge - 1);
    } else {
      setAge(formattedAge);
    }
  }, [dateOfBirth, dateIsValid]);

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
            <Input name="forename" title="Forename" error={invalidFields[0]} />
            <Input
              name="middlename"
              title="Middle Name"
              error={invalidFields[1]}
            />
            <Input name="surname" title="Surname" error={invalidFields[2]} />
          </Line>
          <Line isDesktop={isDesktop}>
            <Input
              name="email"
              title="Email"
              error={invalidEmail || invalidFields[3]}
            />
            <InputMask
              title="Mobile Number"
              name="mobile"
              type="phone"
              error={invalidMobile}
            />
            <DualInputContainer>
              <InputMask
                title="Date of Birth"
                name="dateOfBirth"
                value={dateOfBirth}
                placeholder="MM/DD/YYYY"
                onChange={e => setDateOfBirth(e.target.value)}
                onBlur={calculateAge}
                style={{ width: 134 }}
                error={invalidBirthDate || invalidFields[5]}
              />
              <Input
                title="Age"
                name="age"
                onChange={e => setAge(e.target.value)}
                value={age}
                disabled
                placeholder="00"
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
              value={postcode}
              onChange={e => setPostcode(e.target.value)}
              error={invalidPostcode || invalidFields[6]}
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
              error={invalidDrivingLicenceDate || invalidFields[7]}
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
          <Line
            isDesktop={isDesktop}
            style={{
              alignItems: 'flex-start',
              backgroundColor: '#0ff',
              height: 74,
            }}
          >
            <Recaptcha
              sitekey="6Le9YcIZAAAAAGcPD_HYSCneUuPVv_0And9GiQk3"
              render="explicit"
              onloadCallback={() => {}}
              verifyCallback={verifyCallback}
            />
          </Line>
          {isDesktop && (
            <Line
              isDesktop={isDesktop}
              style={{
                alignItems: 'flex-start',
                marginTop: 20,
              }}
            >
              <SubmitButton
                disabled={canSubmit}
                style={{ width: 288, height: 76 }}
              />
            </Line>
          )}
        </InputContainer>
        {!isDesktop && (
          <Line
            style={{
              width: '100%',
              height: 76,
              alignItems: 'flex-start',
              marginTop: 20,
            }}
          >
            <SubmitButton
              disabled={canSubmit}
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
