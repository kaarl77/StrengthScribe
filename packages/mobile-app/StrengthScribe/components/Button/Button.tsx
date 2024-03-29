import { Button as PaperButton } from 'react-native-paper'
import { StyleProp, Text, ViewStyle } from 'react-native'
import { ThemeProp } from 'react-native-paper/lib/typescript/types'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'
import { Image } from 'expo-image'

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'danger'

interface ButtonProps {
  onPress: () => void
  title: string
  type?: ButtonType
  textAlign?: 'center' | 'left'
  iconSource?: number
}
export default function Button(props: ButtonProps) {
  const { onPress, title, type = 'primary', textAlign, iconSource } = props

  const customContainerStyle: ViewStyle = {
    borderRadius: 8,
    width: '100%'
  }

  return (
    <PaperButton mode={'contained'} onPress={onPress} style={customContainerStyle} theme={getTheme(type)}>
      <Text style={{ fontWeight: 'bold' }}>{title}</Text>
      {iconSource && <Image source={iconSource} style={{ width: 16, height: 16 }} />}
    </PaperButton>
  )
}

function getTheme(type: ButtonType): ThemeProp {
  switch (type) {
    case 'primary':
      return PrimaryButtonTheme
    case 'secondary':
      return SecondaryButtonTheme
    case 'tertiary':
      return TertiaryButtonTheme
    case 'danger':
      return DangerButtonTheme
  }
}

const PrimaryButtonTheme: ThemeProp = {}

const SecondaryButtonTheme: ThemeProp = {
  colors: {
    primary: '#ECE8FF',
    onPrimary: '#7E49FF'
  }
}

const TertiaryButtonTheme: ThemeProp = {
  colors: {
    primary: 'white',
    onPrimary: 'black'
  }
}

const DangerButtonTheme: ThemeProp = {
  colors: {
    primary: 'red',
    onPrimary: 'white'
  }
}
