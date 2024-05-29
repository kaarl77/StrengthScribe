import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native'
import {LineChart} from 'react-native-gifted-charts'
import {Spacings} from '../../constants/Spacings'
import Spacer from '../../components/Spacer/Spacer'
import {PrimaryTheme} from '../../constants/Themes'
import {Typography} from '../../constants/Typography'
import Button from '../../components/Button/Button'
import {getItem} from "../../services/async-storage";
import {AsyncStorageKeys} from "../../constants/AsyncStorageKeys";
import {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {getDetailedStatsOfExercise, getExercises, getSummaryStatsOfRandomExercise} from "../../services/store";
import {SummaryStatsDTO} from "../../services/store.types";
import {getLineChartData} from "../../components/DetailedStats/DetailedStats";

type Workout = {
  title: string;
  data: { value: number }[];
}

export default function Index() {
  const [username, setUsername] = useState('')
  const [latestWorkout, setLatestWorkout] = useState<Workout>({ title: '', data: [] })
  const [summaryStats, setSummaryStats] = useState<SummaryStatsDTO>()
  const router = useRouter()
  const screenWidth = useWindowDimensions().width



  useEffect(() => {
    fetchUserData().then((data) => {
      setUsername(data.username)
      setLatestWorkout(data.latestWorkout)
    });

    getItem(AsyncStorageKeys.USER_ID)
      .then((userId)=>{
        if(userId){
          getExercises(userId).then((response)=>{
            if(response.status === 200){
              const randomExercise = response.data[Math.floor(Math.random() * response.data.length)]
              getDetailedStatsOfExercise(randomExercise.id ?? '', '20').then((r)=>{
                setSummaryStats(r.data.summaryStats)
              })
            }
          })}

      })
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(summaryStats))
  }, [summaryStats]);

  const primaryColor = PrimaryTheme.colors?.primary
  const chartData = getLineChartData(summaryStats?.records ?? {})
  const spacing = screenWidth / (chartData.length)

  if(spacing===Infinity) return null

  return (
    <ScrollView style={styles.container}>
      <Spacer height={Spacings['3x']} />
      <Text style={{ ...Typography['6x'], fontWeight: 'bold' }}>Hello, {username}</Text>


      <Spacer height={Spacings['3x']} />
      <Text style={{ ...Typography['4x'] }}>Random exercise of the week</Text>
      <Spacer height={Spacings['2x']} />

      <View>
        <Text style={{ ...Typography['3x'] }}>{summaryStats?.exerciseName}</Text>
        <Spacer height={Spacings['2x']} />
        <LineChart data={chartData} color={primaryColor} spacing={spacing}/>
      </View>
      <Spacer height={Spacings['3x']} />

      <Button
        onPress={() => {
          console.log('Go to new workout flow')
          router.navigate('../StartWorkout')
        }}
        title={'Start a workout'}
      />
    </ScrollView>
  )
}
//

async function fetchUserData() {
  const username = await getUsername()

  return {
    username: username || 'User',
    latestWorkout: {
      title: "Push (Jeff's)",
      data: [{ value: 1 }, { value: 2 }, { value: 1 }, { value: 9 }, { value: 5 }]
    }
  }
}

async function getUsername() {
  const username = await getItem(AsyncStorageKeys.USERNAME);
  return username;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings['2x'],
    flex: 1
  }
})
