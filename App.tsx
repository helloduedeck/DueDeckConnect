import React, { useEffect } from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import ReduxProvider from './app/store';
import {STORYBOOK_MODE} from '@env';
import {ThemeProvider} from './app/theme/useTheme';
import {NoInternetToast} from './app/components/NoInternet';
import SplashScreen from 'react-native-splash-screen';
// Navigation
import RootNavigation from './app/routes/RootNavigation';
import {store, persistor} from '@store/store';
import StorybookUIRoot from './.storybook';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Main from '@routes';

let Root = function App() {
  const initAppUserDetails = async () => {

    SplashScreen.hide();
  };

  useEffect(() => {
    void initAppUserDetails();
  }, []);
  
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        {/* <CustomStatusBar backgroundColor={'#0789B5'} barStyle={'dark-content'} /> */}
        <SafeAreaView style={{flex: 1}} edges={['top']}>
          {/* <TourGuideProvider androidStatusBarVisible={true}> */}
          {/* <RootSiblingParent> */}
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                  <Main />
                </ThemeProvider>
              </PersistGate>
            </Provider>
          {/* </RootSiblingParent> */}
          {/* </TourGuideProvider> */}
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

// Render StoryBook if the ENV variable set to 'TRUE', type is <string> not <boolean>
if (STORYBOOK_MODE === 'TRUE') {
  Root = StorybookUIRoot;
}

export default Root;
