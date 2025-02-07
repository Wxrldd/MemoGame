import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function ImageGrid({ images }) {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    initializeGame();
  }, [images]);

  const initializeGame = () => {
    if (images.length > 0) {
      const duplicatedImages = [...images, ...images].sort(() => Math.random() - 0.5);
      setCards(duplicatedImages.map((image, index) => ({ id: index, uri: image, flipped: false })));
      setMatchedPairs([]);
      setSelectedCards([]);
      setMessage('');
    }
  };

  const handleCardPress = (index) => {
    if (selectedCards.length === 2 || matchedPairs.includes(index)) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newSelectedCards = [...selectedCards, { index, uri: newCards[index].uri }];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      if (newSelectedCards[0].uri === newSelectedCards[1].uri) {
        setMatchedPairs([...matchedPairs, newSelectedCards[0].index, newSelectedCards[1].index]);
        setSelectedCards([]);
        setMessage('Bravo ! Paire trouvée.');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        setMessage('Dommage ! Réessayez.');
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[newSelectedCards[0].index].flipped = false;
          resetCards[newSelectedCards[1].index].flipped = false;
          setCards(resetCards);
          setSelectedCards([]);
          setMessage('');
        }, 1000);
      }
    }
  };

  const columns = Math.round(Math.sqrt(cards.length));

  return (
    <View style={styles.container}>
      <Text style={[styles.message, { color: message.includes('Bravo') ? 'green' : 'red' }]}>{message}</Text>
      <Text style={styles.pairsFound}>Paires trouvées: {matchedPairs.length / 2}</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { width: `${100 / columns}%` }]}
            onPress={() => handleCardPress(index)}
            activeOpacity={0.8}
          >
            {card.flipped || matchedPairs.includes(index) ? (
              <Image source={{ uri: card.uri }} style={styles.image} />
            ) : (
              <View style={styles.hiddenCard} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Pressable style={styles.button} onPress={initializeGame}>
        <Text style={styles.buttonText}>Relancer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    aspectRatio: 1,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  hiddenCard: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    borderRadius: 5,
  },
  pairsFound: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color : 'white',
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
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
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
