import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {TabContextProvider} from '~/components/context/TabContext ';
import PublicRoutes from '~/routes/public';
import PrivateRoutes from '~/routes/private';
import CustomTheme from '~/styles';
import {useAuth} from '~/hooks';

export default function App(): JSX.Element {
  const {user} = useAuth();
  console.log({user});
  return (
    <NativeBaseProvider
      theme={CustomTheme}
      config={{
        dependencies: {
          'linear-gradient': require('react-native-linear-gradient').default,
        },
      }}>
      <TabContextProvider>
        <NavigationContainer>
          {/* {true ? <PublicRoutes /> : <PrivateRoutes />} */}
          {user ? <PrivateRoutes /> : <PublicRoutes />}
          {/* <>{console.log('oooo', user)}</> */}
        </NavigationContainer>
      </TabContextProvider>
    </NativeBaseProvider>
  );
}
