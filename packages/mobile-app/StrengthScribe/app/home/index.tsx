import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { Spacings } from '../../constants/Spacings'
import Spacer from '../../components/Spacer/Spacer'
import { PrimaryTheme } from '../../constants/Themes'
import { useEffect } from 'react'
import { Typography } from '../../constants/Typography'
import Button from '../../components/Button/Button'

export default function Index() {
  const { username, latestWorkout } = fetchUserData()

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

function fetchUserData() {
  return {
    username: 'Kaarl',
    latestWorkout: {
      title: "Push (Jeff's)",
      data: [{ value: 1 }, { value: 2 }, { value: 1 }, { value: 9 }, { value: 5 }]
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings['2x'],
    flex: 1
  }
})
