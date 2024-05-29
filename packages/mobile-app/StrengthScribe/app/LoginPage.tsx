import {Alert, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Spacer from '../components/Spacer/Spacer'
import {Spacings} from '../constants/Spacings'
import TextInput from '../components/TextInput/TextInput'
import {useState} from 'react'
import Button from '../components/Button/Button'
import {router, useRouter} from 'expo-router'
import {login} from "../services/store";
import {setItem} from "../services/async-storage";
import {AsyncStorageKeys} from "../constants/AsyncStorageKeys";

export default function LoginPage() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  return (
    <SafeAreaView style={{alignItems: 'center', paddingHorizontal: Spacings['3x']}}>
      <Spacer height={Spacings['9x']}/>
      <View style={{width: 80, height: 80, borderRadius: 999, backgroundColor: 'yellow'}}/>

      <Spacer height={Spacings['10x']}/>
      <TextInput
        label={'Username'}
        value={username}
        onChangeText={(text) => {
          setUsername(text)
        }}
      />
      <Spacer height={Spacings['2x']}/>

      <TextInput
        label={'Password'}
        value={password}
        onChangeText={(text) => {
          setPassword(text)
        }}
        secureTextEntry={true}
      />
      <Spacer height={Spacings['3x']}/>

      <Button
        title={'Log In'}
        onPress={() => {
          handleLogin(username, password)
        }}
      />
      <Spacer height={Spacings['2x']}/>

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
  login(username, password).then(response => {
    if(response.error) {
      Alert.alert('Username or password is incorrect. Please try again.')
    } else {
      setItem(AsyncStorageKeys.AUTH_TOKEN, response.data.token)
      setItem(AsyncStorageKeys.USERNAME, username)
      setItem(AsyncStorageKeys.USER_ID, response.data.id.toString())
      router.replace('home')
    }
  });
}
