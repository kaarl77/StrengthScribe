import { Stack } from 'expo-router/stack'
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper'
import { ThemeProp } from 'react-native-paper/lib/typescript/types'

const theme: ThemeProp = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF'
  },
  roundness: 0
}

export default function Layout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='LoginPage' options={{ headerShown: false }} />
        <Stack.Screen name='Register' options={{ headerShown: true, headerBackTitle: 'Login' }} />
        <Stack.Screen name='home' options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  )
}
