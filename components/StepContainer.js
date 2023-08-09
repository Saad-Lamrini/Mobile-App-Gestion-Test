import { View, Text } from 'react-native';
import React from 'react';

const StepContainer = ({ preq1 }) => {
  return (
    <View
      style={{
        marginRight: 5,
        marginTop: 5,
        marginBottom: 15,
        //marginLeft: ,
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
          <Text style={{ textAlign: 'center', color: 'white' }}>Prérequis</Text>
        </View>
        <View
          style={{
            //backgroundColor: 'grey',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'black' }}>{preq1}</Text>
        </View>
      </View>
    </View>
  );
};

export default StepContainer;
