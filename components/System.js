import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const System = ({
  id,
  title,
  imgURL,
  description,
  fonctionnalites,
  navigate1,
}) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: 'white', marginRight: 9 }}
      onPress={() => {
        navigate1.navigate('documentation');
      }}
    >
      <View style={{ paddingTop: 4 }}>
        <Image
          style={{
            height: 110,
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={{
            uri: imgURL,
          }}
        />
      </View>
      <View style={{ padding: 12, paddingBottom: 8 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            paddingTop: 6,
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
        <View></View>
      </View>
    </TouchableOpacity>
  );
};

export default System;
