import {StyleSheet, Text, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Spacings} from "../../constants/Spacings";
import Spacer from "../../components/Spacer/Spacer";
import {useEffect, useState} from "react";
import {ExerciseDTO, ExercisesDTO} from "../../services/store.types";
import {getWorkout, postRecords} from "../../services/store";
import {Typography} from "../../constants/Typography";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";

export type WorkoutRecord = {
  setNr: number,
  repetitions: number,
  weight: number
  registeredAt: string,
  exerciseId: string
}


export default function LogWorkout() {
  const params = useLocalSearchParams();
  const workoutId = params.workoutId as string;

  const router = useRouter()
  const [exercises, setExercises] = useState<ExercisesDTO>()
  const [currentExercise, setCurrentExercise] = useState<ExerciseDTO>()
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState<number>(1)
  const [currentReps, setCurrentReps] = useState<string>('')
  const [currentVolume, setCurrentVolume] = useState<string>('')
  const [workoutRecord, setWorkoutRecord] = useState<WorkoutRecord[]>([])

  useEffect(() => {
    getWorkout(workoutId).then((response) => {
      setExercises(response?.data.exercises)
    })
  }, []);

  useEffect(() => {
    if (exercises) {
      setCurrentExercise(exercises[currentExerciseIndex])
      setCurrentSet(1)
      //reset current reps and volume to default or existing values
      setCurrentReps(workoutRecord[currentSet-1]?.repetitions ? workoutRecord[currentSet-1].repetitions.toString() : '')
      setCurrentVolume(workoutRecord[currentSet-1]?.weight ? workoutRecord[currentSet-1].weight.toString() : '')

    }
  }, [exercises, currentExerciseIndex]);

  useEffect(() => {
    console.log("record", JSON.stringify(workoutRecord))
  }, [JSON.stringify(workoutRecord)]);

  return (
    <View style={styles.container}>
      <Spacer height={Spacings["3x"]}/>
      <Text style={{...Typography["4x"], fontWeight: 'bold'}}>{currentExercise?.name}</Text>

      <Spacer height={Spacings["1x"]}/>
      <Text style={{...Typography["3x"]}}>Set {currentSet}</Text>

      <Spacer height={Spacings["1x"]}/>
      <TextInput label={'Reps'} value={currentReps} onChangeText={setCurrentReps}/>

      <Spacer height={Spacings["1x"]}/>
      <TextInput label={'Volume'} value={currentVolume} onChangeText={setCurrentVolume}/>

      <Spacer height={Spacings["3x"]}/>
      <View style={styles.setSelector}>
        <Button
          onPress={() => {
            setCurrentSet((prevState) => {
              if (prevState > 1) {
                setCurrentVolume(workoutRecord[prevState-2]?.weight ? workoutRecord[prevState-2].weight.toString() : '')
                setCurrentReps(workoutRecord[prevState-2]?.repetitions ? workoutRecord[prevState-2].repetitions.toString() : '')
                setWorkoutRecord((prevWorkout) => {
                  const x = prevWorkout;
                  x.pop()
                  return x
                })
                return prevState - 1
              }
              return prevState
            })
          }}
          title={'Previous Set'}
          type={'secondary'}
          customWidth={'40%'}
          textAlign={'center'}
          disabled={currentSet === 1}
        />

        <Button
          onPress={() => {
            setWorkoutRecord((prevState)=>{
              const x = prevState;

              x?.push({
                setNr: currentSet,
                repetitions: parseInt(currentReps),
                weight: parseInt(currentVolume),
                registeredAt: new Date().toISOString(),
                exerciseId: currentExercise?.id ?? ''
              })

              return x
            })

            setCurrentSet((prevState) => {
              return prevState + 1;
            })

            setCurrentVolume('')
            setCurrentReps('')
          }}
          title={'Next set'}
          customWidth={'40%'}
          disabled={currentReps === '' || currentVolume === ''}
        />

      </View>

      <View style={{ flexDirection:"column-reverse", flex:1}}>
        <Spacer height={Spacings["7x"]}/>

        <Button
          onPress={() => {
            console.log("Finish workout")
            postRecords(workoutRecord).then((response) => {
              if(response.status === 201) {
                router.navigate('../home')
              }
              else {
                console.log("Error")
              }
            })
          }}
          title={'Finish workout'}
          type={'tertiary'}
          customWidth={'100%'}
          textAlign={'center'}
          disabled={workoutRecord.length === 0}
        />
        <Spacer height={Spacings["1x"]}/>

        <Button
          onPress={() => {
            console.log("Previous exercise")
            setCurrentExerciseIndex((prevState) => prevState-1)
          }}
          title={'Previous exercise'}
          type={'secondary'}
          customWidth={'100%'}
          textAlign={'center'}
          disabled={currentExerciseIndex === 0}
        />
        <Spacer height={Spacings["1x"]}/>

        <Button
          onPress={() => {
            console.log("Next exercise")
            setCurrentExerciseIndex((prevState) => prevState+1)
          }}
          title={'Next exercise'}
          customWidth={'100%'}
          textAlign={'center'}
          disabled={currentExerciseIndex === (exercises?.length ?? 0) - 1}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings["3x"],
    flex:1
  },
  setSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
