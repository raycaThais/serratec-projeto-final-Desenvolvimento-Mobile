import React from 'react';
import { View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideInUp } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import GameTableStyles from './GameTableStyles';

// Tipos de carta e props
export interface Card {
  id: string | number;
  group: string;
  forca?: number;
  velocidade?: number;
  resistencia?: number;
  inteligencia?: number;
  haki?: number;
  recompensa?: number;
}

interface GameTableProps {
  playerHand: Card[];
  botDeckCount: number;
  playedCards: { player?: Card; bot?: Card };
  onSelectCard: (card: Card) => void;
  onSelectAttribute: (attribute: string) => void;
  isPlayerTurn: boolean;
  isShuffling: boolean;
  isDealing: boolean;
  tableBackground?: string;
  selectableAttributes?: string[];
}

const defaultAttributes = [
  'forca',
  'velocidade',
  'resistencia',
  'inteligencia',
  'haki',
  'recompensa',
];

export const GameTable: React.FC<GameTableProps> = ({
  playerHand,
  botDeckCount,
  playedCards,
  onSelectCard,
  onSelectAttribute,
  isPlayerTurn,
  isShuffling,
  isDealing,
  tableBackground,
  selectableAttributes = defaultAttributes,
}) => {
  // Fundo da mesa
  const background = tableBackground || require('../../../assets/table-bg.png'); // coloque uma imagem de mesa em assets

  // Renderiza mini deck do bot (cartas viradas)
  const renderBotDeck = () => (
    <View style={ GameTableStyles.deckRow }>
      { [...Array(botDeckCount)].map((_, i) => (
        <Animatable.View
          key={ i }
          animation={ isDealing ? 'slideInDown' : undefined }
          duration={ 400 }
          delay={ i * 60 }
          style={ [GameTableStyles.cardBack, { top: i * 2, left: i * 2 }] }
        />
      )) }
    </View>
  );

  // Renderiza mão do player
  const renderPlayerHand = () => (
    <View style={ GameTableStyles.handRow }>
      { playerHand.map((card, i) => (
        <TouchableOpacity
          key={ card.id }
          disabled={ !isPlayerTurn || isShuffling || isDealing }
          onPress={ () => onSelectCard(card) }
        >
          <Animatable.View
            animation={ isDealing ? 'slideInUp' : undefined }
            duration={ 400 }
            delay={ i * 60 }
            style={ GameTableStyles.miniCard }
          >
            <Text style={ GameTableStyles.cardText }>{ card.group }</Text>
          </Animatable.View>
        </TouchableOpacity>
      )) }
    </View>
  );

  // Renderiza cartas jogadas no centro
  const renderPlayedCards = () => (
    <View style={ GameTableStyles.centerArea }>
      { playedCards.bot && (
        <Animated.View entering={ FadeIn } exiting={ FadeOut } style={ GameTableStyles.playedCardBot }>
          <View style={ GameTableStyles.cardFront }><Text style={ GameTableStyles.cardText }>{ playedCards.bot.group }</Text></View>
        </Animated.View>
      ) }
      { playedCards.player && (
        <Animated.View entering={ FadeIn } exiting={ FadeOut } style={ GameTableStyles.playedCardPlayer }>
          <View style={ GameTableStyles.cardFront }><Text style={ GameTableStyles.cardText }>{ playedCards.player.group }</Text></View>
        </Animated.View>
      ) }
    </View>
  );

  // Renderiza seleção de atributo
  const renderAttributeChoices = () => (
    <View style={ GameTableStyles.attributeRow }>
      { selectableAttributes.map(attr => (
        <TouchableOpacity
          key={ attr }
          style={ GameTableStyles.attributeButton }
          onPress={ () => onSelectAttribute(attr) }
          disabled={ !isPlayerTurn }
        >
          <Text style={ GameTableStyles.attributeText }>{ attr.toUpperCase() }</Text>
        </TouchableOpacity>
      )) }
    </View>
  );

  return (
    <ImageBackground source={ background } style={ GameTableStyles.bg } resizeMode="cover">
      <View style={ GameTableStyles.tableContainer }>
        {/* Deck do bot */ }
        { renderBotDeck() }
        {/* Cartas jogadas */ }
        { renderPlayedCards() }
        {/* Mão do player */ }
        { renderPlayerHand() }
        {/* Seleção de atributo (aparece só se for a vez do player e já escolheu carta) */ }
        { isPlayerTurn && renderAttributeChoices() }
        {/* Animação de embaralhar (exemplo simples) */ }
        { isShuffling && (
          <Animatable.View animation="shake" iterationCount="infinite" style={ GameTableStyles.shuffleOverlay }>
            <Text style={ GameTableStyles.shuffleText }>Embaralhando...</Text>
          </Animatable.View>
        ) }
      </View>
    </ImageBackground>
  );
};

