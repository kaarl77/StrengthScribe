import {ScrollView, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Spacings} from "../constants/Spacings";
import Spacer from "../components/Spacer/Spacer";
import {Typography} from "../constants/Typography";
import {useLocalSearchParams, useRouter} from "expo-router";
import {WorkoutDTO} from "../services/store.types";
import {getWorkout} from "../services/store";
import Button from "../components/Button/Button";

export default function EditWorkout() {

  const params = useLocalSearchParams()
  const workoutId = params.workoutId as string
  const trashSvg = require('../assets/svgs/trash.svg')

  const [workout, setWorkout] = useState<WorkoutDTO>()
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    getWorkout(workoutId).then((response) => {
      setWorkout(response.data)
    })
  }, [workoutId, shouldRefresh]);

  useEffect(() => {
    console.log(workout)
  }, [workout]);

  useEffect(() => {
    if(false){
      console.log('should refresh')
      setShouldRefresh((prevState)=>!prevState)
    }
  }, [params]);

  return (
    <ScrollView style={{paddingHorizontal: Spacings["2x"]}}>
      <Spacer height={Spacings['3x']}/>
      <Text style={{...Typography['6x'], fontWeight: 'bold'}}>{workout?.name}</Text>

      <Spacer height={Spacings['6x']}/>

      {workout?.exercises?.map((exercise, index) => {
        return (
          <React.Fragment key={index}>
            <Button
              onPress={() => {
                console.log('delete exercise')
              }}
              title={exercise.name ?? ''}
              type={"tertiary"}
              textAlign={'left'}
              iconSource={trashSvg}
              iconColor={'red'}
            />
            <Spacer height={Spacings['1x']}/>
          </React.Fragment>
        )
      })}

      <Spacer height={Spacings['3x']}/>
      <Button
        onPress={() => {
          console.log('add exercise')
          router.navigate({
            pathname: '../AddExerciseToWorkout',
            params: {workoutId: workoutId}
          })
        }}
        title={"Add exercise"}
        type={"primary"}
      />

      {/*<Spacer height={Spacings['2x']}/>*/}
      {/*<Button*/}
      {/*  onPress={() => {*/}
      {/*    console.log('save workout')*/}
      {/*  }}*/}
      {/*  title={"Save"}*/}
      {/*  type={"secondary"}*/}
      {/*/>*/}

      {/*<Spacer height={Spacings['2x']}/>*/}
      {/*<Button*/}
      {/*  onPress={() => {*/}
      {/*    console.log('discard workout')*/}
      {/*  }}*/}
      {/*  title={"Discard"}*/}
      {/*  type={"danger"}*/}
      {/*/>*/}
    </ScrollView>
  )
}
