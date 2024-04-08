import { View, Text } from 'react-native'
import Button from '../../components/Button/Button'
import { useRouter } from 'expo-router'

export default function Profile() {
  const router = useRouter()

  return (
    <View>
      <Text>Profile</Text>
      <Button
        onPress={() => {
          router.replace('/')
        }}
        title={'Log Out'}
        type={'danger'}
      />
    </View>
  )
}
