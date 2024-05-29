import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {Spacings} from "../../constants/Spacings";
import Spacer from "../../components/Spacer/Spacer";
import TextInput from "../../components/TextInput/TextInput";
import {useEffect, useState} from "react";
import {DetailedStatsDTO, ExerciseDTO, ExercisesDTO} from "../../services/store.types";
import {getItem} from "../../services/async-storage";
import {AsyncStorageKeys} from "../../constants/AsyncStorageKeys";
import {getDetailedStatsOfExercise, getExercises} from "../../services/store";
import {Typography} from "../../constants/Typography";
import {filterExercises} from "./Exercises";
import Button from "../../components/Button/Button";
import {DetailedStats} from "../../components/DetailedStats/DetailedStats";

export default function Progress() {

  const [searchQuery, setSearchQuery] = useState('')
  const [exercises, setExercises] = useState<ExercisesDTO>()
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDTO>()
  const [detailedStats, setDetailedStats] = useState<DetailedStatsDTO>()

  useEffect(() => {
    getItem(AsyncStorageKeys.USER_ID)
      .then((userId)=>{
        if(userId){
          getExercises(userId).then((response)=>{
            if(response.status === 200){
              setExercises(response.data)
            }
          })
        }
      })
  }, []);

  useEffect(() => {
    if(selectedExercise){
      getDetailedStatsOfExercise(selectedExercise.id ?? '')
        .then((result)=>{
          console.log(selectedExercise.id)
          setDetailedStats(result.data)
        })
    }
  }, [selectedExercise]);

  return (
    <View style={styles.container}>
      <Spacer height={Spacings["3x"]}/>
      <TextInput
        label={'Search'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Spacer height={Spacings["3x"]}/>
      {searchQuery.length < 3 && !selectedExercise && (
        <View style={{alignItems: "center"}}>
          <Text style={{...Typography["2x"]}}>Search for exercises by name</Text>
        </View>
      )}
      {searchQuery.length > 0 && exercises && filterExercises(exercises, searchQuery).map((exercise, index) => {
        return (
          <Button
            onPress={()=>{
              setSelectedExercise(exercise)
              setSearchQuery('')

            }}
            title={exercise.name ?? ''}
            key={index}
          />
        )
      })}
      {selectedExercise && (
        <DetailedStats
          name={selectedExercise.name ?? ''}
          pr={detailedStats?.pr ?? 0}
          volume={detailedStats?.recentStats?.maxWeight ?? 0}
          sets={detailedStats?.recentStats?.numberOfSets ?? 0}
          reps={detailedStats?.recentStats?.maxReps ?? 0}
          records={detailedStats?.summaryStats?.records ?? {}}
          progressPercentage={detailedStats?.summaryStats?.progressPercentage ?? 0}
          progressWeight={detailedStats?.summaryStats?.progressValue ?? 0}
          progressWent={detailedStats?.summaryStats?.progressWent ?? ''}
        />
      )}
      </View>
  )
}



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings["2x"],
    flex:1
  }
})
