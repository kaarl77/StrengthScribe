import {View, Text, StyleSheet} from 'react-native'
import Spacer from "../../components/Spacer/Spacer";
import {Spacings} from "../../constants/Spacings";
import {Typography} from "../../constants/Typography";
import {useEffect, useState} from "react";
import {getItem} from "../../services/async-storage";
import {AsyncStorageKeys} from "../../constants/AsyncStorageKeys";
import {getExercises, getRecentStatsOfExercise} from "../../services/store";
import {Searchbar} from "react-native-paper";
import {ExerciseDTO, ExercisesDTO, RecentStatsDTO} from "../../services/store.types";
import Button from "../../components/Button/Button";
import {useRouter, useLocalSearchParams, useFocusEffect} from "expo-router";
import TextInput from "../../components/TextInput/TextInput";

export default function Exercises() {

  const asyncUserId = getUserId()

  const [userId, setUserId] = useState<string>()
  const [exercises, setExercises] = useState<ExercisesDTO>()
  const [searchBarQuery, setSearchBarQuery] = useState<string>("")
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDTO>()
  const [recentStats, setRecentStats] = useState<RecentStatsDTO>()
  const router = useRouter()

  const arrowRightSvg = require('../../assets/svgs/arrow-right.svg')

  useEffect(() => {
    asyncUserId.then((id) => {
      if(id) {
        setUserId(id)
      }}
    )
  }, []);

  useEffect(() => {
    asyncUserId.then((id) => {
      fetchExercises(id).then((response) => {
        setExercises(response?.data)
        if(id) {
          setUserId(id)
        }
      })
    })
  }, [userId]);

  useEffect(() => {
    if(selectedExercise) {
      getRecentStatsOfExercise(selectedExercise.id ?? '').then((response) => {
        setRecentStats(response?.data)
      })
    }
  }, [selectedExercise]);

  return (
    <View style={styles.container}>
      <Spacer height={Spacings['3x']}/>
      <Text style={{...Typography['6x'], fontWeight: 'bold'}}>Exercises</Text>

      <Spacer height={Spacings['1x']}/>
      <TextInput value={searchBarQuery} onChangeText={setSearchBarQuery} label={'Search exercises...'}/>
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

      {recentStats && selectedExercise?.name && (
        <View>
          <Spacer height={Spacings['3x']}/>
          <RecentExerciseStats exerciseName={selectedExercise?.name} stats={recentStats}/>
        </View>
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

  return getExercises(userId)
}

async function getUserId() {
  const username = await getItem(AsyncStorageKeys.USER_ID);
  return username
}

export function filterExercises(exercises: ExercisesDTO, query: string) {
  if (query.length < 3) {
    return []
  }
  return exercises.filter(exercise => exercise.name?.toLowerCase().includes(query.toLowerCase())).length ? exercises.filter(exercise => exercise.name?.toLowerCase().includes(query.toLowerCase())) : [{name: "No exercises found"}]
}

const RecentExerciseStats = (props :{exerciseName: string, stats: RecentStatsDTO}) => {
  const {stats, exerciseName} = props

  return (
    <View>
      <Text style={{...Typography["4x"], fontWeight:'bold'}}>{exerciseName}</Text>
      <Spacer height={Spacings['1x']}/>

      <Text style={{...Typography["3x"]}}>Sets: {stats.numberOfSets}</Text>
      <Text style={{...Typography["3x"]}}>Reps: {stats.maxReps}</Text>
      <Text style={{...Typography["3x"]}}>Weight: {stats.maxWeight}</Text>
      <Text style={{...Typography["3x"]}}>Volume: {(stats.maxWeight ?? 0) * (stats.maxReps ?? 0) * (stats.numberOfSets ?? 0)}</Text>
    </View>
  )
}
