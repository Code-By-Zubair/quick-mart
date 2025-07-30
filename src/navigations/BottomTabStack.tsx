import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../views/Dashboard/DashboardScreen";
import CategoriesScreen from "../views/Categories/CategoriesScreen";
import MyCartScreen from "../views/MyCart/MyCartScreen";
import ProfileScreen from "../views/Profile/ProfileScreen";
import WishlistScreen from "../views/Wishlist/WishlistScreen";
import { AppSvgs } from "../assets/app_svgs";
import AppColors from "../constants/App_colors";
import { AppFonts } from "../assets/AppFonts";

const Tab = createBottomTabNavigator();

export default function BottomTabStack() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.secondary,
        tabBarInactiveTintColor: AppColors.grey150,
        tabBarStyle: {
          height: 70,
        },
        tabBarLabelStyle: {
          fontFamily: AppFonts.JakartaSemiBold,
          fontSize: 12,
        },
        tabBarItemStyle: {
          paddingVertical: 6,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <AppSvgs.HomeFill /> : <AppSvgs.Home />,
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <AppSvgs.CategoryFill /> : <AppSvgs.Category />,
          tabBarLabel: "Categories",
        }}
      />
      <Tab.Screen
        name="myCart"
        component={MyCartScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <AppSvgs.CartFill /> : <AppSvgs.Cart />,
          tabBarLabel: "My Cart",
        }}
      />
      <Tab.Screen
        name="wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <AppSvgs.WishlistFill /> : <AppSvgs.Wishlist />,
          tabBarLabel: "Wishlist",
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <AppSvgs.ProfileFill /> : <AppSvgs.Profile />,
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}
