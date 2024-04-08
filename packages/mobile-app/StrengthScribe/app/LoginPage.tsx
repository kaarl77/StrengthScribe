import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacer from '../components/Spacer/Spacer'
import { Spacings } from '../constants/Spacings'
import TextInput from '../components/TextInput/TextInput'
import { useState } from 'react'
import Button from '../components/Button/Button'
import { useRouter } from 'expo-router'

export default function LoginPage() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  return (
    <SafeAreaView style={{ alignItems: 'center', paddingHorizontal: Spacings['3x'] }}>
      <Spacer height={Spacings['9x']} />
      <View style={{ width: 80, height: 80, borderRadius: 999, backgroundColor: 'yellow' }} />

      <Spacer height={Spacings['10x']} />
      <TextInput
        label={'Username'}
        value={username}
        onChangeText={(text) => {
          setUsername(text)
          console.log('username', text)
        }}
      />
      <Spacer height={Spacings['2x']} />

      <TextInput
        label={'Password'}
        value={password}
        onChangeText={(text) => {
          setPassword(text)
          console.log('password', text)
        }}
        secureTextEntry={true}
      />
      <Spacer height={Spacings['3x']} />

      <Button
        title={'Log In'}
        onPress={() => {
          handleLogin(username, password)
          router.replace('/home')
        }}
      />
      <Spacer height={Spacings['2x']} />

      <Button
        title={'Register'}
        onPress={() => {
          router.navigate('./Register')
        }}
        type={'secondary'}
      />
    </SafeAreaView>
  )
}

function handleLogin(username: string, password: string) {
  console.log('login')
}
