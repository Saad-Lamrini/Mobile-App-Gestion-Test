import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import React from 'react';

const FormSelectorBtn = ({ backgroundColor, title, style, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          style,
          { backgroundColor },
          {
            height: 48,
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            lineHeight: 24,
            fontWeight: 700,
          }}
        >
          {title}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default FormSelectorBtn;
