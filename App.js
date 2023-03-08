import AppNavigator from "./navigation/AppNavigator";

import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreAllLogs();

  return <AppNavigator />;
}
