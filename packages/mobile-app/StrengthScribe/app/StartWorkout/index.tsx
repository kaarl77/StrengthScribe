import {ScrollView, StyleSheet, Text} from "react-native";
import {Spacings} from "../../constants/Spacings";
import Spacer from "../../components/Spacer/Spacer";
import {useEffect, useState} from "react";
import {WorkoutsDTO} from "../../services/store.types";
import {getItem} from "../../services/async-storage";
import {AsyncStorageKeys} from "../../constants/AsyncStorageKeys";
import {getWorkouts} from "../../services/store";
import Button from "../../components/Button/Button";
import {useRouter} from "expo-router";

export default function Index() {
  const [workouts, setWorkouts] = useState<WorkoutsDTO>()
  const arrowRightSvg = require('../../assets/svgs/arrow-right.svg')
  const router = useRouter()

  useEffect(() => {
    getItem(AsyncStorageKeys.USER_ID).then((userId)=>{
      if(userId) {
        getWorkouts(userId).then((result)=>{
          setWorkouts(result.data)
        })
      }
    })
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Spacer height={Spacings["3x"]}/>
      {workouts?.map((workout, index)=>{
        return (
          <>
            <Button
              onPress={()=>{
                router.navigate({pathname: '../StartWorkout/LogWorkout', params:{workoutId: workout.id, workoutName: workout.name}})
              }}
              title={workout.name ?? ""}
              type={"tertiary"}
              textAlign={'left'}
              iconSource={arrowRightSvg}
              key={index}
            />
            <Spacer height={Spacings["1x"]}/>
          </>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings["3x"]
  }
})
