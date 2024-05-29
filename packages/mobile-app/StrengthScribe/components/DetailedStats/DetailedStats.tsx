import {ScrollView, Text, useWindowDimensions, View} from "react-native";
import {Typography} from "../../constants/Typography";
import Spacer from "../Spacer/Spacer";
import {Spacings} from "../../constants/Spacings";
import {LineChart, lineDataItem} from "react-native-gifted-charts";
import {RecordDTO} from "../../services/store.types";
import {PrimaryTheme} from "../../constants/Themes";

interface DetailedStatsProps {
  name: string;
  pr: number;
  volume: number;
  sets: number;
  reps: number;
  records: Record<string, RecordDTO[]>
  progressWent: string;
  progressWeight: number;
  progressPercentage: number;
}

export function DetailedStats(props: DetailedStatsProps) {
  const {pr, records, reps, sets, volume, name, progressPercentage, progressWeight, progressWent} = props

  const oneRepMax = () => {
    return Math.round(volume * (36 / (37 - reps)))
  }
  const primaryColor = PrimaryTheme.colors?.primary

  const screenWidth = useWindowDimensions().width
  const chartData = getLineChartData(records)

  const spacing = screenWidth/chartData.length

  if(!screenWidth || !chartData || spacing===Infinity) return (<View/>)

  return (
    <ScrollView>
      <Text style={{...Typography["4x"], fontWeight: 'bold'}}>{name}</Text>
      <Spacer height={Spacings["3x"]}/>

      <LineChart data={chartData} color={primaryColor} spacing={spacing}/>
      <Spacer height={Spacings["4x"]}/>

      <Text style={{...Typography["3x"]}}>{getProgressText(progressPercentage, progressWeight, progressWent)}</Text>

      <Spacer height={Spacings["4x"]}/>
      <Text style={{...Typography["3x"]}}>PR: {pr} kg</Text>
      <Text style={{...Typography["3x"]}}>1RM: {oneRepMax()}</Text>

      <Spacer height={Spacings["3x"]}/>
      <Text style={{...Typography["3x"], fontWeight: 'bold'}}>Most recent stats</Text>

      <Spacer height={Spacings["2x"]}/>
      <Text style={{...Typography["2x"]}}>Volume: {volume}</Text>
      <Text style={{...Typography["2x"]}}>Sets: {sets}</Text>
      <Text style={{...Typography["2x"]}}>Reps: {reps}</Text>
    </ScrollView>
  )
}

export function getLineChartData(records: Record<string, RecordDTO[]>) {
  const labels = Object.keys(records)

  const bestVolumeForLabel = labels.map((label) => {
    const record = records[label].reduce((prev, current) => {
      return prev.weight > current.weight ? prev : current
    })
    return record.weight
  })

  const data: lineDataItem[] = labels.map((label, index) => {
    return {
      value: bestVolumeForLabel[index],
      label: new Date(label).toLocaleDateString('en-gb', {month: 'short', day: 'numeric'}),
    }
  })

  return data.reverse()
}

function getProgressText(progressPercentage: number, progressWeight: number, progressWent: string) {
  return `Over the past month, your progress went ${progressWent} ${progressWent==='UP' ? '📈' : '📉'} by ${progressWeight} kg (${progressPercentage}%)`
}
