import React from 'react';
import * as eva from '@eva-design/eva';
import { Provider } from 'react-redux';
import { store } from '~/store/store';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from '~/navigation/Navigation';
import { ThemeContext } from '~/theme/themeContext';

export default () => {
  const [theme, setTheme] = React.useState<string>('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <AppNavigator />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </Provider>
  );
};
