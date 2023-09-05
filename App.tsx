import React, { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { LogBox, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TaskOneScreen from './screens/TaskOneScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
  }, []);
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <StatusBar backgroundColor="#ff9900" barStyle="light-content" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TaskOne" component={TaskOneScreen} options={{ title: 'Todo List', headerStyle: { backgroundColor: '#ff9900' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white' }} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
