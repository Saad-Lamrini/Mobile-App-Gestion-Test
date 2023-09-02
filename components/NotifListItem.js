import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { ListItem } from 'react-native-elements';
import initfirebase from '../firebase';
const NotifListItem = ({ objet, Content, id }) => {
  const db = initfirebase.firestore();
  const handleDeleteClick = () => {
    // Reference to the Firestore collection where the item is stored

    // Use the delete method to remove the item with the specified itemId
    db.collection('notifications')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Item successfully deleted from Firestore');
      })
      .catch((error) => {
        console.error('Error deleting item from Firestore:', error);
      });
  };

  return (
    <ListItem onPress={() => {}} bottomDivider>
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>{objet}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {Content}
        </ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity onPress={handleDeleteClick}>
        <View style={{ paddingTop: 8 }}>
          <Image
            style={{ height: 24, width: 24, marginRight: 10 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/6861/6861362.png',
            }}
          />
        </View>
      </TouchableOpacity>
    </ListItem>
  );
};

export default NotifListItem;
