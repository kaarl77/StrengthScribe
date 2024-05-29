import {Stack} from "expo-router/stack";

export default function Layout() {
  return (
    <Stack screenOptions={(props)=>{
      const params = props.route.params;

      //@ts-ignore
      const workoutName = params?.workoutName

      return {
        headerTitle: workoutName || 'Select Workout'
      }
    }}>
      <Stack.Screen
        name='index'
        options={{
          title: 'Select Workout'
        }}
      />
      <Stack.Screen
        name='LogWorkout'
        options={
          {
            headerBackTitleVisible: false,
          }
        }
      />
    </Stack>
  )
}
