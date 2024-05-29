import {StyleSheet, Text, View} from "react-native";
import {Spacings} from "../constants/Spacings";
import Spacer from "../components/Spacer/Spacer";
import TextInput from "../components/TextInput/TextInput";
import {useEffect, useState} from "react";
import Button from "../components/Button/Button";
import {useRouter, useLocalSearchParams} from "expo-router";
import {createExercise} from "../services/store";

export default function NewExercise() {

  const router = useRouter()
  const params = useLocalSearchParams()

  const [newExerciseTitle, setNewExerciseTitle] = useState<string>(params.proposedExerciseName as string)

  return (
    <View style={styles.container}>
      <Spacer height={Spacings['3x']}/>

      <TextInput label={"Title"} value={newExerciseTitle} onChangeText={(text) => {
        setNewExerciseTitle(text)
      }}/>
      <Spacer height={Spacings['3x']}/>


      <Button onPress={()=>{
        createExercise(params.userId as string, newExerciseTitle).then(() => {
          router.dismiss()
        })
      }} title={"Create"}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings['2x'],
  }
})
