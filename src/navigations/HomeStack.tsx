import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../views/Dashboard/DashboardScreen";

const HomeStack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="home" component={DashboardScreen} />
    </HomeStack.Navigator>
  );
}
