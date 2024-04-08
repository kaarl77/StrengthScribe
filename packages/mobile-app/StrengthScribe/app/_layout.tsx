import { Stack } from 'expo-router/stack'
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper'
import { PrimaryTheme } from '../constants/Themes'

export default function Layout() {
  return (
    <PaperProvider theme={PrimaryTheme}>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='LoginPage' options={{ headerShown: false }} />
        <Stack.Screen name='Register' options={{ headerShown: true, headerBackTitle: 'Login' }} />
        <Stack.Screen name='home' options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  )
}
