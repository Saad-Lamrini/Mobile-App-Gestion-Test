import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import initfirebase from '../firebase';
import { useEffect } from 'react';
import { Button } from 'react-native-elements';
const Changeprio = ({ route }) => {
  console.log(route.params.id);
  //   const data = [
  //     { key: 'Item 1', value: 'Value 1' },
  //     { key: 'Item 2', value: 'Value 2' },
  //     { key: 'Item 3', value: 'Value 3' },
  //     // Add more data items as needed
  //   ];
  const [data, setData] = useState([]);
  const db = initfirebase.firestore();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // const [data, setData] = useState([]);
  const auth = initfirebase.auth();
  const [editableIndex, setEditableIndex] = useState(null);
  const [textValues, setTextValues] = useState({});
  const handleEditClick = (index, value) => {
    setEditableIndex(index);
    setTextValues({ ...textValues, [index]: value });
  };
  const handleTextChange = (index) => {
    // Handle text changes here (e.g., update the state or send data to an API).
    // For this example, we'll just set the textValue in the state.
    const newTextValues = { ...textValues };
    newTextValues[index] = textValues[index];
    setTextValues(newTextValues);
    setEditableIndex(null); // Disable editing after text change.
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribe = db
          .collection('projets')
          .doc(route.params.id)
          .collection('scenarioTest')
          .onSnapshot((snapshot) =>
            setData(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          );

        return unsubscribe;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const updateFirestore = () => {
    // Create an array to hold the batch write operations
    const batch = db.batch();

    // Iterate through your data and update Firestore documents
    data.forEach((item, index) => {
      const { id } = item;
      const newValue = textValues[index] || item.data.UATSCENARION;

      const documentRef = db
        .collection('projets')
        .doc(route.params.id)
        .collection('scenarioTest')
        .doc(id);

      batch.update(documentRef, {
        UATSCENARION: newValue,
      });
    });

    // Commit the batch write
    batch
      .commit()
      .then(() => {
        console.log('Firestore update successful');
        setUpdateSuccess(true);
        // Optionally, you can perform any additional actions here.
      })
      .catch((error) => {
        console.error('Error updating Firestore:', error);
      });
  };
  const handleValidation = () => {
    // Show a confirmation dialog before updating Firestore
    Alert.alert(
      'Confirmation',
      'Vous voulez que toutes les modifications soient enregistrées?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            updateFirestore(); // Call the function to update Firestore
          },
        },
      ]
    );
  };
  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.data.LABEL}</Text>
      <View style={styles.cell}>
        <TouchableOpacity
          onPress={() => handleEditClick(index, item.data.UATSCENARION)}
        >
          {editableIndex === index ? (
            <View style={{ paddingLeft: 20 }}>
              <TextInput
                style={[styles.editableText, { width: 180, paddingLeft: 10 }]}
                onChangeText={(text) => {
                  const newTextValues = { ...textValues };
                  newTextValues[index] = text;
                  setTextValues(newTextValues);
                }}
                //onBlur={() => handleTextChange(index)}
                value={textValues[index] || ''}
              />
            </View>
          ) : (
            <View style={{ width: 140, paddingLeft: 20 }}>
              <Text style={styles.cellText}>
                {textValues[index] || item.data.UATSCENARION}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={{}}>
          <Image
            style={{ height: 20, width: 20 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10336/10336114.png',
            }}
          />
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, {}]}>Scenario Label</Text>
        <Text
          style={[
            styles.headerText,
            { marginRight: 10, backgroundColor: 'red', textAlign: 'center' },
          ]}
        >
          Priorite
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {updateSuccess && (
        <Text style={styles.successMessage}>Update successful!</Text>
      )}
      <View style={{ paddingBottom: 30 }}>
        <Button
          style={{}}
          title="Validate"
          onPress={() => {
            // Handle the validation logic here
            handleValidation();
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  cell: {
    flexDirection: 'row',
    flex: 1,
    fontSize: 14,
  },
  successMessage: {
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
    marginTop: 10,
  },
});
export default Changeprio;
