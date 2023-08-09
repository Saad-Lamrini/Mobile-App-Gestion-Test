import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Scenario from '../components/Scenario';
import { useState } from 'react';
import initfirebase from '../firebase';
import { useEffect } from 'react';
const Recette = ({ navigation, route }) => {
  //console.log(route.params.id);
  const db = initfirebase.firestore();
  const auth = initfirebase.auth();
  const [scenario, setScenario] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'chats',

      headerLeft: () => (
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 4,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={{ paddingTop: 16 }}>
              <Image
                style={{ height: 20, width: 20 }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            flex: 1,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 500,
              fontSize: 18,
              paddingLeft: 50,
            }}
          >
            RECETTE PROJET {route.params.titre}
          </Text>
        </View>
      ),
      headerRight: () => <View></View>,
    });
  }, []);
  useEffect(() => {
    const unsubscribe = db
      .collection('projets')
      .doc(route.params.id)
      .collection('scenarioTest')

      .onSnapshot((snapshot) =>
        setScenario(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  }, []);
  return (
    <View>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {scenario.map(({ id, data }) => (
          <Scenario
            number={data.UATSCENARION}
            label={data.LABEL}
            preq={data.PREREQUISITE}
            id={id}
            projet={route.params.id}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Recette;
