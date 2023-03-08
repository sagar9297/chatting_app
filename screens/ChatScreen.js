import React, { useLayoutEffect, useState, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";

import routes from "../navigation/routes";
import { Avatar } from "@rneui/base";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

const ChatScreen = (props) => {
  const { navigation } = props;

  const [messages, setMessages] = useState([]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
        navigation.navigate(routes.LOGIN);
      })
      .catch((error) =>
        console.log(error, "This is from catch of chat screen")
      );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={userSignOut}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const getMsg = async () => {
    try {
      const docRef = collection(db, "chats");

      const q = query(docRef, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        );
      });
      return unsubscribe;
    } catch (error) {
      console.log(error, "This is from reading the chat");
    }
  };

  useLayoutEffect(() => {
    getMsg();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    try {
      const test = await addDoc(collection(db, "chats"), {
        _id,
        createdAt,
        text,
        user,
      });
      console.log(test.id);
    } catch (error) {
      console.log(error, "This is while adding the msg");
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
};

export default ChatScreen;
