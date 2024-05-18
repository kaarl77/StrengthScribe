import {Text, View} from 'react-native'
import {getWorkouts} from "../../services/store";
import Spacer from "../../components/Spacer/Spacer";
import {Spacings} from "../../constants/Spacings";
import {Typography} from "../../constants/Typography";
import {useEffect, useState} from "react";
import {getItem} from "../../services/async-storage";
import {AsyncStorageKeys} from "../../constants/AsyncStorageKeys";
import {Searchbar} from "react-native-paper";
import {WorkoutDTO, WorkoutsDTO} from "../../services/store.types";
import Button from "../../components/Button/Button";
import {useRouter} from "expo-router";

export default function Workouts() {

  const router = useRouter()

  const [userId, setUserId] = useState<string>('')
  const [searchBarQuery, setSearchBarQuery] = useState<string>('')
  const [workouts, setWorkouts] = useState<WorkoutsDTO>()
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutDTO>()

  const arrowRightSvg = require('../../assets/svgs/arrow-right.svg')

  useEffect(() => {
    getItem(AsyncStorageKeys.USER_ID).then((id) => {
      if (id) {
        setUserId(id)
      }
    })
  }, []);

  useEffect(() => {
    getWorkouts(userId).then((response) => {
      setWorkouts(response?.data)
    })
  }, [userId]);

  useEffect(() => {
    console.log(selectedWorkout)
  }, [selectedWorkout]);

  return (
    <View style={{paddingHorizontal: Spacings["2x"]}}>
      <Spacer height={Spacings['3x']}/>
      <Text style={{...Typography['6x'], fontWeight: 'bold'}}>Workouts</Text>

      <Spacer height={Spacings['1x']}/>
      <Searchbar value={searchBarQuery} onChangeText={setSearchBarQuery} placeholder={'Search exercises...'}/>
      <Spacer height={Spacings['3x']}/>
      {searchBarQuery.length < 3 && (
        <View style={{alignItems: "center"}}>
          <Text style={{...Typography["2x"]}}>Search for workouts by name</Text>
        </View>
      )}

      {searchBarQuery.length > 0 && workouts && filterWorkouts(workouts, searchBarQuery).map((workout, index) => {
          if (workout.name === "No workouts found") {
            return (
              <View style={{alignItems: "center"}} key={index}>
                <Text>No workouts found</Text>
                <Spacer height={Spacings['0.5x']}/>
                <Button
                  onPress={() => {
                    console.log("New workout")
                    router.navigate({
                      pathname: '../NewWorkout',
                      params: {proposedWorkoutName: searchBarQuery, userId: userId}
                    })
                  }}
                  title={"Create a new workout"}/>
              </View>
            )
          }

          return (
            <Button
              onPress={() => {
                setSelectedWorkout(workout)
                setSearchBarQuery("")
                router.navigate({
                  pathname: '../EditWorkout',
                  params: {workoutId: workout.id}

                })
              }}
              title={workout.name ?? ""}
              key={index} type={"tertiary"}
              iconSource={arrowRightSvg}
              textAlign={'left'}/>
          )
        }
      )}

    </View>
  )
}

function filterWorkouts(workouts: WorkoutsDTO, query: string) {
  if (query.length < 3) {
    return []
  }
  return workouts.filter(exercise => exercise.name?.toLowerCase().includes(query.toLowerCase())).length ? workouts.filter(exercise => exercise.name?.toLowerCase().includes(query.toLowerCase())) : [{name: "No workouts found"}]
}
