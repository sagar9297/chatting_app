import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "@rneui/base";
import routes from "../navigation/routes";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = (props) => {
  const { navigation } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("sign in pressed");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user, "This is the user from login screen");
        navigation.navigate(routes.CHAT);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleRegister = () => {
    navigation.navigate(routes.REGISTER);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        navigation.replace(routes.CHAT);
      } else {
        navigation.canGoBack() && navigation.popToTop();
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your email"
        label="Email"
        leftIcon={{ type: "material", name: "email" }}
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        leftIcon={{ type: "material", name: "lock" }}
        value={password}
        onChangeText={(val) => setPassword(val)}
        secureTextEntry
      />
      <Button
        title="Sign In"
        buttonStyle={styles.button}
        onPress={handleSignIn}
      />
      <Button
        title="Register"
        buttonStyle={styles.button}
        onPress={handleRegister}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 200,
  },
  container: {
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
});

export default LoginScreen;
