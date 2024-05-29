import { Redirect } from 'expo-router'

//todo in the future implement checker if user is logged in or not and redirect appropriately
function Index() {
  return <Redirect href='/LoginPage' />
}
export default Index
