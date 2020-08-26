import React, { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getMonth, getYear, isExists, formatDistanceStrict } from 'date-fns';

export const TabContext = createContext();

export function TabsProvider({ children }) {
  const [mainTab, setMainTab] = useState('Dashboard');
  const [tabs, setTabs] = useState([]);
  console.log('uau1');

  const nameValidation = new RegExp(/^\s+$/); // prettier-ignore
  const dateValidation = new RegExp(/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]+$/); // prettier-ignore

  const doesDateExists = useCallback(date => {
    const [day, month, year] = date.split('/');

    const formattedMonth = Number(month) - 1;
    const formattedDay = Number(day);
    const formattedYear = Number(year);
    const currentYear = getYear(new Date());

    return (
      isExists(formattedYear, formattedMonth, formattedDay) &&
      currentYear > formattedYear
    );
  }, []);

  function calculateAge(dateOfBirth) {
    if (!doesDateExists(dateOfBirth)) {
      return;
    }

    const [day, month, year] = dateOfBirth.split('/'); // captura dia, mês e ano da data informada e salva em variáveis separadas
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

  const nameIsValid = useCallback(
    name => {
      return nameValidation.test(name) || name === '';
    },
    [nameValidation]
  );

  const dateIsValid = useCallback(date => dateValidation.test(date), []);

  return (
    <TabContext.Provider
      value={{
        mainTab,
        setMainTab,
        tabs,
        setTabs,
        nameIsValid,
        dateIsValid,
        calculateAge,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error('useContextHook must be used within an AuthProvider');
  }

  return context;
}

TabsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
