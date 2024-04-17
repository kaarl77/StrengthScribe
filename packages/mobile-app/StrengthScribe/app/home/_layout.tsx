import {Tabs} from 'expo-router'
import {Image} from 'expo-image'

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name={'index'}
        options={{
          title: 'Home',
          headerTitle: 'Home',
          headerTitleAlign: 'left',
          tabBarIcon: (props) => (
            <Image
              source={require('../../assets/svgs/gym.svg')}
              style={{width: props.size, height: props.size}}
              tintColor={props.color}
            />
          )
        }}
      />
      <Tabs.Screen
        name={'Exercises'}
        options={{
          headerTitle: 'Exercises',
          headerTitleAlign: 'left',
          tabBarIcon: (props) => (
            <Image
              source={require('../../assets/svgs/heavy-weights.svg')}
              style={{width: props.size, height: props.size}}
              tintColor={props.color}
            />
          )
        }}
      />
      <Tabs.Screen
        name={'Workouts'}
        options={{
          headerTitle: 'Workouts',
          headerTitleAlign: 'left',
          tabBarIcon: (props) => (
            <Image
              source={require('../../assets/svgs/workout-list.svg')}
              style={{width: props.size, height: props.size}}
              tintColor={props.color}
            />
          )
        }}
      />
      <Tabs.Screen
        name={'Progress'}
        options={{
          headerTitle: 'Progress',
          headerTitleAlign: 'left',
          tabBarIcon: (props) => (
            <Image
              source={require('../../assets/svgs/arrow-up-chart.svg')}
              style={{width: props.size, height: props.size}}
              tintColor={props.color}
            />
          )
        }}
      />
      <Tabs.Screen
        name={'Profile'}
        options={{
          headerTitle: 'Profile',
          headerTitleAlign: 'left',
          tabBarIcon: (props) => (
            <Image
              source={require('../../assets/svgs/account.svg')}
              style={{width: props.size, height: props.size}}
              tintColor={props.color}
            />
          )
        }}
      />
      <Tabs.Screen
        name={'NewExercise'}
        options={{
          href: null,
          headerTitle: 'New Exercise',
          headerTitleAlign: 'left',
        }}
      />

    </Tabs>
  )
}
