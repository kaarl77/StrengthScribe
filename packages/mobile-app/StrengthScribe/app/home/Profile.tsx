import {Text, View, StyleSheet} from 'react-native'
import Button from '../../components/Button/Button'
import {router} from 'expo-router'
import {deleteItem} from "../../services/async-storage";
import {AsyncStorageKeys} from "../../constants/AsyncStorageKeys";
import {Spacings} from "../../constants/Spacings";
import Spacer from "../../components/Spacer/Spacer";

export default function Profile() {

  return (
    <View style={styles.container}>
      <Spacer height={Spacings["3x"]}/>
      <Button
        onPress={() => {
          handleLogout()
        }}
        title={'Log Out'}
        type={'danger'}
      />
    </View>
  )
}

function handleLogout(){
  deleteItem(AsyncStorageKeys.USERNAME)
  deleteItem(AsyncStorageKeys.AUTH_TOKEN)
  router.replace('/')
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:Spacings["2x"]
  }
})