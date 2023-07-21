import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Dimensions,
  Button,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import FormHeader from '../components/FormHeader';
import FormSelectorBtn from '../components/FormSelectorBtn';
import { ScrollView } from 'react-native-gesture-handler';
//import initfirebase from '../firebase';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const { width } = Dimensions.get('window');

const Signup = ({ navigation }) => {
  const animation = useRef(new Animated.Value(0)).current;
  //const auth = initfirebase.auth();
  const scrollView = useRef();

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });
  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 70],
  });
  const rightHeaderTransleteY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });
  const logincolorIntorplate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['#0FABBC', 'rgba(18, 202, 214, 0.2)'],
  });
  const signupcolorIntorplate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['rgba(18, 202, 214, 0.2)', '#0FABBC'],
  });

  return (
    <View style={{ paddingTop: 120, flex: 1 }}>
      <View style={{ height: 80 }}>
        <FormHeader
          leftHeading="Welcome "
          rightHeading="Home"
          subHeading="www.alten.com"
          rightHeaderOpacity={rightHeaderOpacity}
          leftHeaderTranslateX={leftHeaderTranslateX}
          rightHeaderTransleteY={rightHeaderTransleteY}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 24,
          paddingRight: 24,
          marginBottom: 20,
          paddingTop: 20,
        }}
      >
        <FormSelectorBtn
          style={styles.borderLeft}
          backgroundColor={logincolorIntorplate}
          title="Se connecter"
          onPress={() => scrollView.current.scrollTo({ x: 0 })}
        />
        <FormSelectorBtn
          style={styles.borderRight}
          backgroundColor={signupcolorIntorplate}
          title="Creer un compte"
          onPress={() => scrollView.current.scrollTo({ x: width })}
        />
      </View>
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: animation } } }],
          { useNativeDriver: false }
        )}
      >
        <LoginForm nav={navigation} />
        <ScrollView>
          <SignupForm nav={navigation} />
        </ScrollView>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
export default Signup;
