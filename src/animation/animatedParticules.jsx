import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'];

const ParticlesAnimation = () => {
  const particles = Array.from({ length: 30 }, () => ({
    x: useRef(new Animated.Value(Math.random() * screenWidth)).current,
    y: useRef(new Animated.Value(Math.random() * screenHeight)).current,
    opacity: useRef(new Animated.Value(Math.random())).current,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  useEffect(() => {
    particles.forEach(({ x, y, opacity }) => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(x, {
            toValue: Math.random() * screenWidth,
            duration: 4000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
          Animated.timing(y, {
            toValue: Math.random() * screenHeight,
            duration: 4000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: Math.random(),
            duration: 2000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle, index) => (
        <Animated.View
          key={index}
          style={[styles.particle, {
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: [
              { translateX: particle.x },
              { translateY: particle.y },
            ],
          }]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    top: 0,
    left: 0,
  },
  particle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
  },
});

export default ParticlesAnimation;
