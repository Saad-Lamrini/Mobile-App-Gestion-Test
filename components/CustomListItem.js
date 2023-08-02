import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import initfirebase from '../firebase';
const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const db = initfirebase.firestore();
  useEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestampField', 'desc')
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe;
  });
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/924/924915.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.sender}: {chatMessages?.[0]?.messageText}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;
