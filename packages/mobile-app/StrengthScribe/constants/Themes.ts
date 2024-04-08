import { ThemeProp } from 'react-native-paper/lib/typescript/types'
import { MD3LightTheme } from 'react-native-paper'

export const PrimaryTheme: ThemeProp = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#007AFF'
  },
  roundness: 0
}
