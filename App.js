import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditTasks from './editTasks';
import ViewTasks from './viewTasks';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EditTasks">
        <Stack.Screen name="ViewTasks" component={ViewTasks} />
        <Stack.Screen
          name="EditTasks"
          component={EditTasks}
          options={{ title: 'Editar tarefas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
