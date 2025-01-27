import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Onboarding',
  screens: {
    Onboarding: {
      screen: OnboardingScreen,
      options: {
        headerShown: false,
      },
    },
    Signup: {
      screen: SignupScreen,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false,
      },
    },
    Dashboard: {
      screen: DashboardScreen,
      options: {
        headerShown: false,
      },
    },
    VerifyEmail: {
      screen: VerifyEmailScreen,
      options: {
        headerShown: false
      }
    }
  },
});

export const Navigation = createStaticNavigation(RootStack);
