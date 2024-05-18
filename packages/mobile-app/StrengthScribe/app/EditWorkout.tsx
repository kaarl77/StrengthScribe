import {Text, View} from "react-native";
import React, {useEffect} from "react";
import {Spacings} from "../constants/Spacings";
import Spacer from "../components/Spacer/Spacer";
import {Typography} from "../constants/Typography";
import {useLocalSearchParams} from "expo-router";
import {WorkoutDTO} from "../services/store.types";

export default function EditWorkout() {
  const params = useLocalSearchParams()

  console.log(params)

  const workout = params.workout as WorkoutDTO

  useEffect(() => {
    console.log(workout)
  }, [workout]);

  return (
    <View style={{paddingHorizontal:Spacings["2x"]}}>
      <Spacer height={Spacings['3x']}/>
      <Text style={{...Typography['6x'], fontWeight: 'bold'}}>{workout.name}</Text>

      <Spacer height={Spacings['1x']}/>
    </View>)
}
