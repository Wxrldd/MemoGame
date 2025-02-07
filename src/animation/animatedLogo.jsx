// 📌 components/AnimatedLogo.js
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import logo from '../assets/logomemo.png';

export default function AnimatedLogo() {
  const translateY = useRef(new Animated.Value(-200)).current;
  const bounce = useRef(new Animated.Value(1)).current;

  useEffect(() => {

    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.spring(bounce, {
        toValue: 1.2,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(bounce, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.Image 
      source={logo} 
      style={[styles.logo, { transform: [{ translateY }, { scale: bounce }] }]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});
