import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ImagePickerButton from '../components/ImagePickerButton';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [images, setImages] = useState([]);
  const [gridSize, setGridSize] = useState(null);
  const navigation = useNavigation();

  const handleGridSelection = (size) => {
    setGridSize(size);
    setImages([]);
  };

  return (
    <View style={styles.container}>
      <ImagePickerButton
        setImages={setImages}
        images={images}
        gridSize={gridSize}
        onGridSelect={handleGridSelection}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
