import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigation/Navigation';
import { ThemeContext } from './src/theme/themeContext';

export default () => {
    const [theme, setTheme] = React.useState<string>('light');

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };

    return (
        <>
            <IconRegistry icons={EvaIconsPack}/>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <ApplicationProvider {...eva} theme={eva[theme]}>
                    <AppNavigator/>
                </ApplicationProvider>
            </ThemeContext.Provider>
        </>
    );
};
