import React, { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FunctionContext } from './src/context/GlobalState';

import Home from './src/screens/Home';
import DetailTransaction from './src/screens/DetailTransaction';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();

function App() {
  const getMonthID = useCallback((month: number) => {
    let monthText: string = '';
    switch (month) {
      case 0: monthText = "Januari"; break;
      case 1: monthText = "Februari"; break;
      case 2: monthText = "Maret"; break;
      case 3: monthText = "April"; break;
      case 4: monthText = "Mei"; break;
      case 5: monthText = "Juni"; break;
      case 6: monthText = "Juli"; break;
      case 7: monthText = "Agustus"; break;
      case 8: monthText = "September"; break;
      case 9: monthText = "Oktober"; break;
      case 10: monthText = "November"; break;
      case 11: monthText = "Desember"; break;
    }
    return monthText
  }, [])

  const formatDate = useCallback((date: string) => {
    var d = new Date(date),
      month = '' + getMonthID(d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;

    return [day, month, year].join(' ');
  }, [])

  const formatThousand = useCallback((value: number) => {
    return value.toLocaleString('id-ID');
  }, [])

  const formatUpperCase = useCallback((text: string) => {
    return text.toUpperCase()
  }, [])


  return (
    <FunctionContext.Provider value={{ formatDate, formatThousand, formatUpperCase }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="DetailTransaction" component={DetailTransaction} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FunctionContext.Provider>
  );
}

export default App;
