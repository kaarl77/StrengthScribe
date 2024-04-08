import { TextInput as TextInputPaper } from 'react-native-paper'

interface TextInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
}

export default function TextInput(props: TextInputProps) {
  const { label, value, onChangeText, secureTextEntry = false } = props

  return (
    <TextInputPaper
      theme={{
        colors: {
          background: 'white'
        }
      }}
      autoCapitalize={'none'}
      style={{ width: '100%', borderRadius: 8 }}
      outlineStyle={{ borderRadius: 8 }}
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      mode={'outlined'}
    />
  )
}
