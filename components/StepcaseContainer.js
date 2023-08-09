import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import initfirebase from '../firebase';
const StepcaseContainer = ({ numero, etat, contenu, id, projet, scenario }) => {
  const db = initfirebase.firestore();
  const auth = initfirebase.auth();
  const [backgroundColor, setBackgroundColor] = useState('');
  useEffect(() => {
    if (etat == 'OK') {
      setBackgroundColor('rgba(0, 159, 0, 1)');
    } else if (etat == 'KO') {
      setBackgroundColor('rgba(230, 0, 36, 1)');
    } else if (etat == 'ENCOURS') {
      setBackgroundColor('rgba(230, 221, 0, 1)');
    } else setBackgroundColor('');
  }, []);
  return (
    <View
      style={{
        marginRight: 5,
        marginTop: 5,
        marginBottom: 15,
        marginLeft: 2,
        // width: 150,
        // height: 180,
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'black',
        width: 150,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
        overflow: 'hidden',
      }}
    >
      <View style={{ flexDirection: 'column' }}>
        <View
          style={{
            width: 150,
            backgroundColor: 'rgba(39, 132, 245, 0.81)',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>
            Step {numero}
          </Text>
        </View>
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },
            { backgroundColor },
          ]}
        >
          <Text style={{ color: 'black' }}>{contenu}</Text>
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            height: 40,
            flexDirection: 'row',
          }}
        >
          <View style={{ paddingTop: 4, paddingLeft: 12 }}>
            <Button
              title="OK"
              buttonStyle={{
                backgroundColor: 'rgba(0, 159, 0, 1)',
                borderRadius: 5,
                paddingBottom: 10,
              }}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: 9,
                textAlign: 'center',
                color: 'black',
              }}
              containerStyle={{
                //marginHorizontal: 50,
                height: 30,
                width: 30,
                //marginVertical: 10,
              }}
              onPress={() => {
                db.collection('projets')
                  .doc(projet)
                  .collection('scenarioTest')
                  .doc(scenario)
                  .collection('TestCases')
                  .doc(id)
                  .update({
                    etat: 'OK',
                  });
                setBackgroundColor('rgba(0, 159, 0, 1)');
              }}
            />
          </View>
          <View style={{ paddingTop: 4, paddingLeft: 4 }}>
            <Button
              title="KO"
              buttonStyle={{
                backgroundColor: 'rgba(230, 0, 36, 1)',
                borderRadius: 5,
                paddingBottom: 10,
              }}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: 9,
                textAlign: 'center',
                color: 'black',
              }}
              containerStyle={{
                //marginHorizontal: 50,
                height: 30,
                width: 30,
                //marginVertical: 10,
              }}
              onPress={() => {
                db.collection('projets')
                  .doc(projet)
                  .collection('scenarioTest')
                  .doc(scenario)
                  .collection('TestCases')
                  .doc(id)
                  .update({
                    etat: 'KO',
                  });
                setBackgroundColor('rgba(230, 0, 36, 1)');
              }}
            />
          </View>
          <View style={{ paddingTop: 4, paddingLeft: 4 }}>
            <Button
              title="EN COURS"
              buttonStyle={{
                backgroundColor: 'rgba(230, 221, 0, 1)',
                borderRadius: 5,
                paddingBottom: 10,
              }}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: 9,
                textAlign: 'center',
                color: 'black',
              }}
              containerStyle={{
                //marginHorizontal: 50,
                height: 30,
                width: 60,
                //marginVertical: 10,
              }}
              onPress={() => {
                db.collection('projets')
                  .doc(projet)
                  .collection('scenarioTest')
                  .doc(scenario)
                  .collection('TestCases')
                  .doc(id)
                  .update({
                    etat: 'ENCOURS',
                  });
                setBackgroundColor('rgba(230, 221, 0, 1)');
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default StepcaseContainer;
