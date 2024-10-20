import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen01 from '../tranquochuy/screens/Screen01';
import Screen02 from '..//tranquochuy/screens/Screen02';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Screen01'>
                <Stack.Screen name="Screen01" component={Screen01} options={{ headerShown: false }} />
                <Stack.Screen name="Screen02" component={Screen02} options={{ headerShown: false }} />

            </Stack.Navigator>


        </NavigationContainer>


    );
};
export default App;
