import {Button as PaperButton} from 'react-native-paper'
import {DimensionValue, FlexAlignType, StyleProp, Text, View, ViewStyle} from 'react-native'
import {ThemeProp} from 'react-native-paper/lib/typescript/types'
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon'
import {Image} from 'expo-image'

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'danger'

interface ButtonProps {
  onPress: () => void
  title: string
  type?: ButtonType
  textAlign?: "center" | "left"
  iconSource?: number
  iconColor?: string
  customWidth?: DimensionValue
  disabled?: boolean
}

export default function Button(props: ButtonProps) {
  const {onPress, title, type = 'primary', textAlign = "center", iconSource, iconColor, disabled, customWidth} = props

  const customContainerStyle: ViewStyle = {
    borderRadius: 8,
    width: customWidth ?? '100%',
  }

  const customContentStyle: ViewStyle = {
    flexDirection: "row-reverse",
    justifyContent: textAlign === "center" ? "center" : "space-between",
  }

  return (
    <PaperButton
      disabled={disabled}
      contentStyle={customContentStyle}
      mode={'contained'}
      onPress={onPress}
      style={customContainerStyle}
      theme={getTheme(type)}
      icon={iconSource && ((props) => {
        return <Image source={iconSource} style={{width: props.size, height: props.size}} tintColor={iconColor}/>
      })}>
      <Text style={{fontWeight: 'bold'}}>{title}</Text>
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
