import {Alert, StyleSheet, Text, View} from 'react-native'
import {Typography} from "../constants/Typography";
import Spacer from "../components/Spacer/Spacer";
import {Spacings} from "../constants/Spacings";
import TextInput from "../components/TextInput/TextInput";
import {useState} from "react";
import Button from "../components/Button/Button";
import {register} from "../services/store";
import {router} from "expo-router";
import {setItem} from "../services/async-storage";
import {AsyncStorageKeys} from "../constants/AsyncStorageKeys";

export default function Register() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')


  return (
    <View style={styles.container}>
      <Spacer height={Spacings["3x"]}/>
      <Text style={{...Typography["5x"], fontWeight: 'bold'}}>Let's get you set up!</Text>

      <Spacer height={Spacings["2x"]}/>
      <TextInput label={'Username'} value={username} onChangeText={(text) => {
        setUsername(text)
      }}/>

      <Spacer height={Spacings["2x"]}/>
      <TextInput label={'Password'} value={password} onChangeText={(text) => {
        setPassword(text)
      }} secureTextEntry={true}/>

      <Spacer height={Spacings["2x"]}/>
      <TextInput label={'Confirm Password'} value={confirmPassword} onChangeText={(text) => {
        setConfirmPassword(text)
      }} secureTextEntry={true}/>

      <Spacer height={Spacings["3x"]}/>
      <Button
        title={'Register'}
        onPress={() => {
          handleRegister(username, password, confirmPassword)
        }}/>
    </View>
  )
}

function handleRegister(username: string, password: string, confirmPassword: string) {
  if(password !== confirmPassword){
    Alert.alert('Passwords do not match')
    return
  }
  if(password.length < 8){
    Alert.alert('Password must be at least 8 characters')
    return
  }
  register(username, password).then((response)=>{
    if(response.error){
      if(response.status === 406){
        Alert.alert('Username already taken. Please try another.')
        return
      }
      Alert.alert('An error occurred. Please try again later.')
      return
    }
    setItem(AsyncStorageKeys.USERNAME, username)
    setItem(AsyncStorageKeys.AUTH_TOKEN, response.data.token)
    setItem(AsyncStorageKeys.USER_ID, response.data.id.toString())

    router.replace('/home')
  })

}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  }
})

