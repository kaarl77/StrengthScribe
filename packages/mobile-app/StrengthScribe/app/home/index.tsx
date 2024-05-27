import {ScrollView, StyleSheet, Text, View} from 'react-native'
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

type Workout = {
  title: string;
  data: { value: number }[];
}

export default function Index() {
  const [username, setUsername] = useState('')
  const [latestWorkout, setLatestWorkout] = useState<Workout>({ title: '', data: [] })
  const router = useRouter()

  useEffect(() => {
    fetchUserData().then((data) => {
      setUsername(data.username)
      setLatestWorkout(data.latestWorkout)
    });
  }, []);

  const primaryColor = PrimaryTheme.colors?.primary

  return (
    <ScrollView style={styles.container}>
      <Spacer height={Spacings['3x']} />
      <Text style={{ ...Typography['6x'], fontWeight: 'bold' }}>Hello, {username}</Text>
      <Text style={{ ...Typography['4x'] }}>Your latest workout</Text>
      <Spacer height={Spacings['2x']} />

      <View>
        <Text style={{ ...Typography['3x'] }}>{latestWorkout.title}</Text>
        <Spacer height={Spacings['2x']} />
        <LineChart data={latestWorkout.data} trimYAxisAtTop={true} color={primaryColor} disableScroll={true} />
      </View>

      <Button
        onPress={() => {
          console.log('Go to new workout flow')
          router.navigate('../StartWorkout')
        }}
        title={'Start a workout'}
      />

      <Spacer height={Spacings['3x']} />
      <Text style={{ ...Typography['4x'] }}>Featured exercise of the week</Text>
      <Spacer height={Spacings['2x']} />

      <View>
        <Text style={{ ...Typography['3x'] }}>{latestWorkout.title}</Text>
        <Spacer height={Spacings['2x']} />
        <LineChart data={latestWorkout.data} trimYAxisAtTop={true} color={primaryColor} disableScroll={true} />
      </View>
    </ScrollView>
  )
}

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
