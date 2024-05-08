import {View, Text, StyleSheet} from 'react-native'
import Spacer from "../../components/Spacer/Spacer";
import {Spacings} from "../../constants/Spacings";
import {Typography} from "../../constants/Typography";
import {useEffect, useState} from "react";
import {getItem} from "../../services/async-storage";
import {AsyncStorageKeys} from "../../constants/AsyncStorageKeys";
import {getExercises} from "../../services/store";
import {Searchbar} from "react-native-paper";
import {ExerciseDTO, ExercisesDTO} from "../../services/store.types";
import Button from "../../components/Button/Button";
import {useRouter, useFocusEffect} from "expo-router";

export default function Exercises() {
  const asyncUserId = getUserId()

  const [userId, setUserId] = useState<string>()
  const [exercises, setExercises] = useState<ExercisesDTO>()
  const [searchBarQuery, setSearchBarQuery] = useState<string>("")
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDTO>()
  const router = useRouter()

  const arrowRightSvg = require('../../assets/svgs/arrow-right.svg')

  asyncUserId.then((id) => {
    if (id) {
      setUserId(id)
    }
  })

  useEffect(() => {
    asyncUserId.then((id) => {
      fetchExercises(id).then((response) => {
        setExercises(response?.data)
        if (id) {
          setUserId(id)
        }
      })
    })
  }, [userId]);

  useEffect(() => {
    console.log(selectedExercise)
  }, [selectedExercise]);

  return (
    <View style={styles.container}>
      <Spacer height={Spacings['3x']}/>
      <Text style={{...Typography['6x'], fontWeight: 'bold'}}>Exercises</Text>

      <Spacer height={Spacings['1x']}/>
      <Searchbar value={searchBarQuery} onChangeText={setSearchBarQuery} placeholder={'Search exercises...'}/>
      <Spacer height={Spacings['3x']}/>
      {searchBarQuery.length < 3 && (
        <View style={{alignItems: "center"}}>
          <Text style={{...Typography["2x"]}}>Search for exercises by name</Text>
        </View>
      )}

      {searchBarQuery.length > 0 && exercises && filterExercises(exercises, searchBarQuery).map((exercise, index) => {
          if (exercise.name === "No exercises found") {
            return (
              <View style={{alignItems: "center"}} key={index}>
                <Text>No exercises found</Text>
                <Spacer height={Spacings['0.5x']}/>
                <Button onPress={() => {
                  console.log("New exercise")
                  router.navigate({
                    pathname: '../NewExercise',
                    params: {proposedExerciseName: searchBarQuery, userId: userId}
                  })
                }} title={"Create a new exercise"}/>
              </View>
            )
          }

          return (
            <Button
              onPress={() => {
                setSelectedExercise(exercise)
                setSearchBarQuery("")
              }}
              title={exercise.name ?? ""}
              key={index} type={"tertiary"}
              iconSource={arrowRightSvg}
              textAlign={'left'}/>
          )
        }
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings['2x'],
  }
})

async function fetchExercises(userId: string | null) {
  if (!userId) {
    return
  }

  // console.log("infinite?")

  return getExercises(userId)
}

async function getUserId() {
  const username = await getItem(AsyncStorageKeys.USER_ID);
  return username
}

function filterExercises(exercises: ExercisesDTO, query: string) {
  if (query.length < 3) {
    return []
  }
  return exercises.filter(exercise => exercise.name?.toLowerCase().includes(query.toLowerCase())).length ?
    exercises.filter(exercise => exercise.name?.toLowerCase().includes(query.toLowerCase())) :
    [{name: "No exercises found"}]
}
