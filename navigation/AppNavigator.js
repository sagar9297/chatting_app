import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Screens from "../screens";
import routes from "./routes";

const Stack = createNativeStackNavigator();

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name={routes.LOGIN} component={Screens.LoginScreen} />
        <Stack.Screen
          name={routes.REGISTER}
          component={Screens.RegisterScreen}
        />
        <Stack.Screen name={routes.CHAT} component={Screens.ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
