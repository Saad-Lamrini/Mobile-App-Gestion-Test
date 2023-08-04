import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Chats from './screens/Chats';
import Conversation from './screens/Conversation';
import AddChat from './screens/AddChat';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ headerShown: false, headerTitleAlign: 'center' }}
        />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen
          name="chats"
          component={Chats}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addchats"
          component={AddChat}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="conversation" component={Conversation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
