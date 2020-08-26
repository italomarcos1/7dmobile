import React, { useCallback, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { getYear, getMonth, isExists, formatDistanceStrict } from 'date-fns';
import * as Yup from 'yup';

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
import Switch from './components/Switch';
import Modal from './components/Modal';
import FinishModal from './components/FinishModal';

function App() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });
  const nameValidation = new RegExp(/^\s+$/); // prettier-ignore

  const [anyPointsInDrivingLicence, setAnyPointsInDrivingLicence] = useState(
    'no'
  );
  const [howLongDrivingLicence, setHowLongDrivingLicence] = useState('');

  const [anyUnspentConvention, setAnyUnspentConvention] = useState('no');
  const [drivingLicenceOrigin, setDrivingLicenceOrigin] = useState('yes');

  const [dateOfBirth, setDateOfBirth] = useState('');
  const [postcode, setPostcode] = useState('');

  const [forename, setForename] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [surname, setSurname] = useState('');
  const [mobile, setMobile] = useState('');

  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [station, setStation] = useState('Basildon (SS14 9AA)');
  const [invalidBirthDate, setInvalidBirthDate] = useState(false);
  const [invalidDrivingLicenceDate, setInvalidDrivingLicenceDate] = useState(
    false
  );

  const [invalidForename, setInvalidForename] = useState('');
  const [invalidMiddlename, setInvalidMiddlename] = useState('');
  const [invalidSurname, setInvalidSurname] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPostcode, setInvalidPostcode] = useState(false);
  const [invalidMobile, setInvalidMobile] = useState(false);
  const [checked, setChecked] = useState(false);

  const [hasEmptyInfo, setHasEmptyInfo] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const dateValidation = new RegExp(/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]+$/); // prettier-ignore
  const postcodeValid = new RegExp(/^[a-zA-Z][0-9][0-9]\s[0-9][a-zA-Z][a-zA-Z]$/); // prettier-ignore

  const doesDateExists = date => {
    const [day, month, year] = date.split('/');

    const formattedMonth = Number(month) - 1;
    const formattedDay = Number(day);
    const formattedYear = Number(year);
    const currentYear = getYear(new Date());

    return (
      isExists(formattedYear, formattedMonth, formattedDay) &&
      currentYear > formattedYear
    );
  };

  const dateIsValid = useCallback(date => {
    return dateValidation.test(date);
  });

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

  const invalidEmailCheck = useCallback(async () => {
    if (!(await emailValidation.isValid({ email }))) {
      setInvalidEmail(true);
      return true;
    }

    setInvalidEmail(false);
    return false;
  }, [emailValidation, email]);

  const invalidMobileCheck = useCallback(async () => {
    if (
      !(await mobileValidation.isValid({
        mobile,
      }))
    ) {
      setInvalidMobile(true);
      return true;
    }

    setInvalidMobile(false);
    return false;
  }, [mobileValidation, mobile]);

  function calculateAge(date) {
    if (!doesDateExists(date)) {
      return;
    }

    const [day, month, year] = date.split('/'); // captura dia, mês e ano da data informada e salva em variáveis separadas
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
      return formattedAge - 1;
    }

    return formattedAge;
  }
  const nameIsValid =
    (name => {
      return nameValidation.test(name) || name === '';
    },
    [nameValidation]);

  const handleSubmit = useCallback(
    async formData => {
      if (!checked) {
        toast.error("You must prove you're not a robot before submitting!");
        return;
      }
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
        setInvalidPostcode(!(await postcodeValidation.isValid({ postcode })));

        setInvalidMobile(
          !(await mobileValidation.isValid({
            mobile: mobileNumberInfo,
          }))
        );

        toast.error('You must fill each field before submitting.');
        setInvalidForename(nameIsValid(forename));
        setInvalidMiddlename(nameIsValid(middlename));
        setInvalidSurname(nameIsValid(surname));
        setInvalidEmail(await invalidEmailCheck(email));
        setHasEmptyInfo(true);
        return;
      }

      if (await invalidEmailCheck(email)) {
        toast.error('You must provide a valid email address.');
        setInvalidEmail(true);
        return;
      }

      if (await invalidMobileCheck(mobile)) {
        toast.error('You must provide a valid mobile number.');
        setInvalidMobile(true);

        return;
      }
      if (!dateIsValid(dateOfBirth)) {
        toast.error('You must provide a valid Birthdate.');
        setInvalidBirthDate(true);
        return;
      }

      if (!(await postcodeValidation.isValid({ postcode }))) {
        toast.error('You must provide a valid postcode.');
        return;
      }

      if (!dateIsValid(howLongDrivingLicence)) {
        toast.error("Your Driving Licence's date is invalid.");
        setInvalidDrivingLicenceDate(true);
        return;
      }

      const licence_location =
        drivingLicenceOrigin === 'yes'
          ? 'UK Driving Licence'
          : 'EU Driving Licence';

      const unspent_conviction = anyUnspentConvention === 'yes' ? '1' : '0';
      const licence_points = anyPointsInDrivingLicence === 'yes' ? '1' : '0';

      // toast.success('Thanks for submitting your application.');
      setSuccess(true);
    },
    [
      checked,
      anyPointsInDrivingLicence,
      anyUnspentConvention,
      drivingLicenceOrigin,
      dateOfBirth,
      howLongDrivingLicence,
      station,
      invalidFields,
      dateIsValid,
      postcode,
      postcodeValidation,
      mobileValidation,
      age,
      email,
      invalidEmailCheck,
      invalidMobileCheck,
      forename,
      middlename,
      surname,
      mobile,
    ]
  );

  // Line: 262 = 74 + 74 + 74 + 20 + 20
  // 1048 - 4 lines
  // Subtitle: 116
  // 1164 - lines + subtitle
  // RadioBoxLine: 376 = 94 + 94 + 94 + 94
  // SubmitButton: 116

  // Total: 1656
  console.log('uauai');

  return (
    <>
      <Header />
      <Container onSubmit={handleSubmit} isDesktop={isDesktop}>
        <InputContainer>
          <Line style={{ marginTop: 0 }} isDesktop={isDesktop}>
            <Input
              title="Forename"
              name="forename"
              value={forename}
              onBlur={() => setInvalidForename(nameIsValid(forename))}
              onChange={e => setForename(e.target.value)}
              error={invalidForename}
              // value={forename}
            />
            <Input
              title="Middle Name"
              name="middlename"
              value={middlename}
              onBlur={() => setInvalidMiddlename(nameIsValid(middlename))}
              onChange={e => setMiddlename(e.target.value)}
              error={invalidMiddlename}
            />
            <Input
              title="Surname"
              name="surname"
              value={surname}
              onBlur={() => setInvalidSurname(nameIsValid(surname))}
              onChange={e => setSurname(e.target.value)}
              error={invalidSurname}
            />
          </Line>
          <Line isDesktop={isDesktop}>
            <Input
              title="Email"
              name="email"
              onBlur={() => invalidEmailCheck(email)}
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={invalidEmail}
            />
            <InputMask
              title="Mobile Number"
              name="mobile"
              type="phone"
              onBlur={() => invalidMobileCheck(mobile)}
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              error={invalidMobile}
            />
            <DualInputContainer>
              <InputMask
                title="Date of Birth"
                name="dateOfBirth"
                value={dateOfBirth}
                placeholder="DD/MM/YYYY"
                onChange={e => setDateOfBirth(e.target.value)}
                onBlur={() => {
                  if (dateIsValid(dateOfBirth)) {
                    setInvalidBirthDate(false);
                    setAge(calculateAge(dateOfBirth));
                  } else setInvalidBirthDate(true);
                }}
                style={{ width: 134 }}
                error={invalidBirthDate}
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
              onBlur={() => setInvalidPostcode(!postcodeValid.test(postcode))}
              value={postcode}
              onChange={e => setPostcode(e.target.value)}
              error={invalidPostcode}
            />
          </Line>
          <Line isDesktop={isDesktop}>
            <RadioButton
              title="Is your Driving Licence UK or EU?"
              option={drivingLicenceOrigin}
              firstOption="UK Driving Licence"
              secondOption="EU Driving Licence"
              setOption={value => setDrivingLicenceOrigin(value)}
              style={
                isDesktop ? { width: 288 } : { width: 288, marginBottom: 20 }
              }
              column
            />
            <InputMask
              title="How Long you had your Driving Licence for?"
              name="howLongDrivingLicence"
              value={howLongDrivingLicence}
              placeholder="DD/MM/YYYY"
              onChange={e => setHowLongDrivingLicence(e.target.value)}
              onBlur={() =>
                setInvalidDrivingLicenceDate(
                  !dateIsValid(howLongDrivingLicence)
                )
              }
              error={invalidDrivingLicenceDate}
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
              setValue={() => setStation('Basildon (SS14 9AA)')}
              selected={station === 'Basildon (SS14 9AA)'}
            >
              Basildon (SS14 9AA)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('New Hythe (ME20 7PA)')}
              selected={station === 'New Hythe (ME20 7PA)'}
              style={isDesktop ? { marginLeft: 20 } : { marginLeft: 0 }}
            >
              New Hythe (ME20 7PA)
            </RadioBox>
          </RadioBoxLine>
          <RadioBoxLine isDesktop={isDesktop}>
            <RadioBox
              setValue={() => setStation('Croydon (CR0 4BD)')}
              selected={station === 'Croydon (CR0 4BD)'}
            >
              Croydon (CR0 4BD)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('Grays (RM20 3ED)')}
              selected={station === 'Grays (RM20 3ED)'}
              style={isDesktop ? { marginLeft: 20 } : { marginLeft: 0 }}
            >
              Grays (RM20 3ED)
            </RadioBox>
          </RadioBoxLine>
          <RadioBoxLine isDesktop={isDesktop}>
            <RadioBox
              setValue={() => setStation('Croydon 2 (CR0 4XL)')}
              selected={station === 'Croydon 2 (CR0 4XL)'}
            >
              Croydon 2 (CR0 4XL)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('Wembley (NW10 OUX)')}
              selected={station === 'Wembley (NW10 OUX)'}
              style={isDesktop ? { marginLeft: 20 } : { marginLeft: 0 }}
            >
              Wembley (NW10 OUX)
            </RadioBox>
          </RadioBoxLine>
          <RadioBoxLine isDesktop={isDesktop}>
            <RadioBox
              setValue={() => setStation('Belvedere (DA17 6AS)')}
              selected={station === 'Belvedere (DA17 6AS)'}
            >
              Belvedere (DA17 6AS)
            </RadioBox>
            <RadioBox
              setValue={() => setStation('Weybridge (KT13 0YU)')}
              selected={station === 'Weybridge (KT13 0YU)'}
              style={isDesktop ? { marginLeft: 20 } : { marginLeft: 0 }}
            >
              Weybridge (KT13 0YU)
            </RadioBox>
          </RadioBoxLine>
          <Line
            isDesktop={isDesktop}
            style={
              isDesktop
                ? {
                    alignItems: 'center',
                    height: 77,
                    justifyContent: 'flex-start',
                    padding: 0,
                  }
                : {
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 97,
                    marginTop: 0,
                    backgroundColor: '#f0f',
                  }
            }
          >
            <Subtitle
              style={{
                marginLeft: 0,
                paddingLeft: 0,
              }}
            >
              You must check before submitting (to prove you&apos;re not a
              robot).
            </Subtitle>

            <Switch
              onClick={() => setChecked(!checked)}
              checked={checked}
              style={
                isDesktop ? { marginLeft: 20 } : { marginTop: 10, height: 31 }
              }
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
              marginTop: 20,
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
      {hasEmptyInfo && isDesktop && (
        <Modal isDesktop={isDesktop} onClick={() => setHasEmptyInfo(false)} />
      )}
      {success && isDesktop && (
        <FinishModal isDesktop={isDesktop} onClick={() => setSuccess(false)} />
      )}
    </>
  );
}

export default App;
