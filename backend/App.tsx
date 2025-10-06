import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateProductScreen from './src/screens/CreateProductScreen';
import ListProductsScreen from './src/screens/ListProductsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Início' }}
        />
        <Stack.Screen 
          name="CreateProduct" 
          component={CreateProductScreen}
          options={{ title: 'Cadastrar Produto' }}
        />
        <Stack.Screen 
          name="ListProducts" 
          component={ListProductsScreen}
          options={{ title: 'Lista de Produtos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}