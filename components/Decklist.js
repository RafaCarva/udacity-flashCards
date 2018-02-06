import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getDecks } from '../utils/helpers'

class Decklist extends React.Component {
  render() {

    const cards = getDecks()

    return (
      <View>
        {cards.map((card, key) => (
          <View key={key} style={styles.card}>
            <Text>{card.title}</Text>
            <Text>{card.questions.length}
              {(card.questions.length > 1) ? 'cards' : 'card'}
            </Text>
          </View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    alignItems: 'center',
    padding: 20
  }
})

export default Decklist