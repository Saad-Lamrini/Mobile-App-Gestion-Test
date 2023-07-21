import { View, Text, Animated, TouchableOpacity, Linking } from 'react-native';
import React from 'react';

const FormHeader = ({
  leftHeading,
  rightHeading,
  subHeading,
  leftHeaderTranslateX = 40,
  rightHeaderTransleteY = -20,
  rightHeaderOpacity = 0,
}) => {
  const handleLinkPress = () => {
    // Ouvrir le lien dans le navigateur par défaut du dispositif
    Linking.openURL('https://www.alten.com/');
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.Text
          style={{
            transform: [{ translateX: leftHeaderTranslateX }],
            paddingTop: 35,
            color: '#FA1616',
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1,
          }}
        >
          {leftHeading}
        </Animated.Text>
        <Animated.Text
          style={{
            opacity: rightHeaderOpacity,
            transform: [{ translateY: rightHeaderTransleteY }],
            color: '#FA1616',
            paddingTop: 35,
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1,
          }}
        >
          {rightHeading}
        </Animated.Text>
      </View>
      <TouchableOpacity
        onPress={handleLinkPress}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Text
          style={{
            color: 'black',
            textDecorationLine: 'underline',
            fontSize: 14,
            paddingTop: 5,
            fontWeight: 'bold',
          }}
        >
          {subHeading}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormHeader;
