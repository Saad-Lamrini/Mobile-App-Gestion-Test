import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import StepContainer from './StepContainer';
import StepcaseContainer from './StepcaseContainer';
import initfirebase from '../firebase';
import { useState } from 'react';
const Scenario = ({ number, route, label, preq, id, projet }) => {
  const db = initfirebase.firestore();
  const auth = initfirebase.auth();
  const scenario = id;
  const [step, setStep] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection('projets')
      .doc(projet)
      .collection('scenarioTest')
      .doc(id)
      .collection('TestCases')
      .orderBy('numero')
      .onSnapshot((snapshot) =>
        setStep(
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
      <View style={{ backgroundColor: 'grey', flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Scenario N°:</Text>
        <Text style={{ fontSize: 15 }}>{number}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 15, paddingLeft: 24 }}>
          Label:
        </Text>
        <Text style={{ fontSize: 15 }}>{label}</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={{ padding: 14 }}>
        <StepContainer preq1={preq} />
        {step.map(({ id, data }) => (
          <StepcaseContainer
            numero={data.numero}
            contenu={data.contenu}
            etat={data.etat}
            id={id}
            projet={projet}
            scenario={scenario}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Scenario;
