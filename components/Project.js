import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import System from './System';

const Project = ({ title, description, id }) => {
  return (
    <View style={{}}>
      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

          paddingLeft: 7,
          paddingRight: 7,
          paddingTop: 7,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{title}</Text>
        <Image
          style={{ height: 20, width: 20 }}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/271/271226.png',
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 13,
          color: 'rgba(73, 67, 70, 0.8)',
          paddingLeft: 7,
          paddingRight: 7,
        }}
      >
        {description}
      </Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 7,
        }}
        showsHorizontalScrollIndicator={false}
        style={{ paddingTop: 7 }}
      >
        <System title="testing system" />
        <System title="testing system" />
        <System title="testing system" />
        <System title="testing system" />
      </ScrollView>
    </View>
  );
};

export default Project;
