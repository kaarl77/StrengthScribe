import {View, Text, StyleSheet} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useState} from "react";
import Spacer from "../components/Spacer/Spacer";
import {Spacings} from "../constants/Spacings";
import TextInput from "../components/TextInput/TextInput";
import Button from "../components/Button/Button";
import {createWorkout} from "../services/store";

export default function NewWorkout() {
  const router = useRouter()
  const params = useLocalSearchParams()

  const [newWorkoutTitle, setNewWorkoutTitle] = useState<string>(params.proposedWorkoutName as string)

  return (
    <View style={styles.container}>
      <Spacer height={Spacings['3x']}/>

      <TextInput label={"Workout title"} value={newWorkoutTitle} onChangeText={(text) => {
        setNewWorkoutTitle(text)
      }}/>
      <Spacer height={Spacings['3x']}/>


      <Button
        onPress={() => {
          createWorkout(params.userId as string, newWorkoutTitle).then(() => {
            router.dismiss()
          })
        }}
        title={"Create"}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings['2x'],
  }
})
