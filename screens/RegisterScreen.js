import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "@rneui/base";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import routes from "../navigation/routes";

const RegisterScreen = (props) => {
  const { navigation } = props;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const defaultImg =
    "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png";

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user, "This is the user details from register screen");
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: imageUrl ? imageUrl : defaultImg,
        })
          .then(() => {
            alert("User created!..");
            navigation.popToTop();
          })
          .catch((error) => {
            console.log(error, "This is the error from catch");
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your name"
        label="Name"
        leftIcon={{ type: "material", name: "badge" }}
        value={name}
        onChangeText={(val) => setName(val)}
      />
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
      <Input
        placeholder="Enter your image url"
        label="Image"
        leftIcon={{ type: "material", name: "face" }}
        value={imageUrl}
        onChangeText={(val) => setImageUrl(val)}
      />
      <Button title="Register" buttonStyle={styles.button} onPress={register} />
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

export default RegisterScreen;
