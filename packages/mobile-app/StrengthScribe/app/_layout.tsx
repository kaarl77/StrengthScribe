import {Stack} from 'expo-router/stack'
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper'
import {PrimaryTheme} from '../constants/Themes'

export default function Layout() {
  return (
    <PaperProvider theme={PrimaryTheme}>
      <Stack>
        <Stack.Screen name='index' options={{headerShown: false}}/>
        <Stack.Screen name='LoginPage' options={{headerShown: false}}/>
        <Stack.Screen name='Register' options={{headerShown: true, headerBackTitle: 'Login'}}/>
        <Stack.Screen name='home' options={{headerShown: false}}/>
        <Stack.Screen name={'NewExercise'} options={{presentation: 'modal', headerTitle: "Create a new exercise"}}/>
        <Stack.Screen name={'NewWorkout'} options={{presentation: 'modal', headerTitle: "Create a new workout"}}/>
        <Stack.Screen name={'EditWorkout'} options={{headerTitle: "Edit workout", headerBackTitleVisible: false}}/>
        <Stack.Screen name={'AddExerciseToWorkout'} options={{
          presentation: 'modal',
          headerTitle: "Add an exercise",
        }}/>
        <Stack.Screen name={'StartWorkout'} options={{headerShown:false}}/>
      </Stack>
    </PaperProvider>
  )
}
