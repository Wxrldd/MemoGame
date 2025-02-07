import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ImageGrid from '../components/ImageGrid';
import { useRoute } from '@react-navigation/native';

export default function Game() {
  const route = useRoute();
  const { images } = route.params || { images: [] };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game</Text>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        <ImageGrid images={images} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
