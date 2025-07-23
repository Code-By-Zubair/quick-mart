import { createNativeStackNavigator } from "@react-navigation/native-stack";
import login_screen from "../views/Auth/LoginScreen";
import SplashScreen from "../views/Splash/SplashScreen";
import onboard_screen from "../views/Onboard/OnboardScreen";
import OnboardScreen from "../views/Onboard/OnboardScreen";
import LoginScreen from "../views/Auth/LoginScreen";


const AuthStack = createNativeStackNavigator();

export default function AuthStackNavigator() {
    return (
        <AuthStack.Navigator
            id={undefined}
            screenOptions={{
                headerShown: false,
            }}>
            <AuthStack.Screen name="splash" component={SplashScreen} />
            <AuthStack.Screen name="onboard" component={OnboardScreen} />
            <AuthStack.Screen name="login" component={LoginScreen} />
        </AuthStack.Navigator>
    )
}
