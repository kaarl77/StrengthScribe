import { TextStyle } from 'react-native'

type TypographyType = {
  '1x': TextStyle
  '2x': TextStyle
  '3x': TextStyle
  '4x': TextStyle
  '5x': TextStyle
  '6x': TextStyle
  '7x': TextStyle
  '8x': TextStyle
  '9x': TextStyle
}

export const Typography: TypographyType = {
  '1x': { fontSize: 12, lineHeight: 16 },
  '2x': { fontSize: 14, lineHeight: 20 },
  '3x': { fontSize: 16, lineHeight: 24 },
  '4x': { fontSize: 18, lineHeight: 26 },
  '5x': { fontSize: 20, lineHeight: 28 },
  '6x': { fontSize: 24, lineHeight: 30 },
  '7x': { fontSize: 28, lineHeight: 36 },
  '8x': { fontSize: 35, lineHeight: 40 },
  '9x': { fontSize: 60, lineHeight: 60 }
}
