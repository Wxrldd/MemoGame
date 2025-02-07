import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AnimatedLogo from '../animation/animatedLogo';
import ParticlesAnimation from '../animation/animatedParticules';
import AudioPlayer from '../audio/AudioPlayer';

export default function ImagePickerButton({ setImages, images, gridSize, onGridSelect, navigation }) {

  const selectImagesFromGallery = async () => {
    if (!gridSize) {
      alert("Veuillez d'abord sélectionner une grille.");
      return;
    }

    if (images.length >= gridSize) {
      alert(`Vous avez déjà pris ${gridSize} photos.`);
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Désolé, nous avons besoin des permissions pour accéder à la caméra');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      selectionLimit: gridSize - images.length,
    });

    if (!result.canceled) {
      const newImages = [...images, ...result.assets.map(asset => asset.uri)];
      setImages(newImages);

      if (newImages.length === gridSize) {
        setTimeout(() => {
          navigation.navigate('Game', { images: newImages });
        }, 500);
      }
    }
  };

  const takePhoto = async () => {
    if (!gridSize) {
      alert("Veuillez d'abord sélectionner une grille.");
      return;
    }

    if (images.length >= gridSize) {
      alert(`Vous avez déjà pris ${gridSize} photos.`);
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Désolé, nous avons besoin des permissions pour accéder à la caméra');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [...images, result.assets[0].uri];
      setImages(newImages);

      if (newImages.length === gridSize) {
        setTimeout(() => {
          navigation.navigate('Game', { images: newImages });
        }, 500);
      }
    }
  };

  const selectGrid = () => {
    Alert.alert('Sélectionnez une grille', '', [
      { text: '2x2 (2 images)', onPress: () => onGridSelect(2) },
      { text: '4x4 (8 images)', onPress: () => onGridSelect(8) },
      { text: '6x6 (18 images)', onPress: () => onGridSelect(18) },
      { text: 'Annuler', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.container}>
      <AudioPlayer />
      <ParticlesAnimation />
      <AnimatedLogo />
      <TouchableOpacity style={styles.button} onPress={selectGrid}>
        <Text style={styles.text}>Sélectionner une grille</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.text}>Prendre une photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={selectImagesFromGallery}>
        <Text style={styles.text}>Sélectionner plusieurs photos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: 220,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  text: {
    fontSize: 18,
    color: '#00d9b8',
    fontFamily: 'monospace',
  },
});
