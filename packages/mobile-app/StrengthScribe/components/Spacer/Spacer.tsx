import { View } from 'react-native'

interface SpacerProps {
  width?: number
  height?: number
}

export default function Spacer(props: SpacerProps) {
  const { height, width } = props

  return <View style={{ height, width }} />
}
