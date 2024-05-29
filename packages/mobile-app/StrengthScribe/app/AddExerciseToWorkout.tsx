import {StyleSheet, View} from "react-native";
import Spacer from "../components/Spacer/Spacer";
import {Spacings} from "../constants/Spacings";
import {Searchbar} from "react-native-paper";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import {ExercisesDTO} from "../services/store.types";
import {getItem} from "../services/async-storage";
import {AsyncStorageKeys} from "../constants/AsyncStorageKeys";
import {addExerciseToWorkout, getExercises} from "../services/store";
import {filterExercises} from "./home/Exercises";
import Button from "../components/Button/Button";
import TextInput from "../components/TextInput/TextInput";

export default function AddExerciseToWorkout() {
  const props = useLocalSearchParams();

  const workoutId = props.workoutId as string;

  const [searchBarQuery, setSearchBarQuery] = useState<string>('')
  const [exercises, setExercises] = useState<ExercisesDTO>()
  const [userId, setUserId] = useState<string>()
  const router = useRouter()

  useEffect(() => {
    getItem(AsyncStorageKeys.USER_ID).then((id) => {
      if (id) {
        setUserId(id)
      }
    })
  }, []);

  useEffect(() => {
    if(userId){
      getExercises(userId).then((response) => {
        setExercises(response?.data)
      })
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <Spacer height={Spacings["3x"]}/>

      <TextInput
        value={searchBarQuery}
        label={'Search for exercises...'}
        // style={{marginHorizontal: Spacings["2x"]}}
        onChangeText={setSearchBarQuery}
      />

      {searchBarQuery.length > 0 && exercises && filterExercises(exercises, searchBarQuery).map((exercise, index) => {
        return (
          <View key={index}>
            <Spacer height={Spacings["1x"]}/>
            <Button
              title={exercise.name ?? ''}
              onPress={() => {
                addExerciseToWorkout(workoutId, exercise.id ?? '').then(() => {})
                router.navigate({
                  pathname: '../EditWorkout',
                  params: {workoutId: workoutId, shouldRefresh: true},
                })
              }}
              key={index}
              type={'tertiary'}
            />
          </View>
        )
      })}

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings["2x"]
  }
})
