import {Alert, StyleSheet, Text, View} from 'react-native'
import Button from '../../components/Button/Button'
import {router} from 'expo-router'
import {deleteItem, getItem, setItem} from "../../services/async-storage";
import {AsyncStorageKeys} from "../../constants/AsyncStorageKeys";
import {Spacings} from "../../constants/Spacings";
import Spacer from "../../components/Spacer/Spacer";
import {useEffect, useState} from "react";
import {Typography} from "../../constants/Typography";

export default function Profile() {
  const [username, setUsername] = useState<string | null>()

  const [unitOfMeasure, setUnitOfMeasure] = useState<string|null>()

  const arrowRightSvg = require('../../assets/svgs/arrow-right.svg')


  getItem(AsyncStorageKeys.USERNAME).then((username) => {
    setUsername(username)
  })

  getItem(AsyncStorageKeys.UNIT_SYSTEM).then((unitOfMeasure) => {
    setUnitOfMeasure(unitOfMeasure)
  })

  useEffect(() => {
    console.log(unitOfMeasure)
  }, [unitOfMeasure]);


  return (
    <View style={styles.container}>
      <Spacer height={Spacings["3x"]}/>
      <View style={{width: 80, height: 80, borderRadius: 999, backgroundColor: 'yellow'}}/>

      <Spacer height={Spacings["1x"]}/>
      <Text style={{...Typography["4x"], fontWeight: "bold"}}>{username}</Text>

      <Spacer height={Spacings["5x"]}/>
      <Button
        onPress={() => {
          changeUnitsOfMeasure()
        }}
        title={'Units of Measure'}
        type={'tertiary'}
        textAlign={'left'}
        iconSource={arrowRightSvg}/>

      <Spacer height={Spacings["2x"]}/>
      <Button
        onPress={() => {
          handleLogout()
        }}
        title={'Log Out'}
        type={'danger'}
      />
    </View>
  )

  function changeUnitsOfMeasure() {
    Alert.alert(
      'Select your units of measure',
      'Choose between metric and imperial',
      [{
        text: 'Metric',
        onPress: () => {
          setItem(AsyncStorageKeys.UNIT_SYSTEM, 'metric')
          setUnitOfMeasure('metric')
        },
        isPreferred: true
      },{
        text: 'Imperial',
        onPress: () => {
          setItem(AsyncStorageKeys.UNIT_SYSTEM, 'imperial')
          setUnitOfMeasure('imperial')
        }
      }])
  }
}

function handleLogout() {
  deleteItem(AsyncStorageKeys.USERNAME)
  deleteItem(AsyncStorageKeys.AUTH_TOKEN)
  deleteItem(AsyncStorageKeys.USER_ID)
  router.replace('/')
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings["2x"],
    alignItems: 'center'
  }
})
