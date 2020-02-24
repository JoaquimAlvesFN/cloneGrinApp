import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Start from './pages/Start';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            height: 120,
            backgroundColor: '#50C878',
            borderBottomWidth: 1,
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}>
            <Stack.Screen 
                name="home" 
                component={Home} 
            />
            <Stack.Screen 
                name="start" 
                component={Start} 
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;