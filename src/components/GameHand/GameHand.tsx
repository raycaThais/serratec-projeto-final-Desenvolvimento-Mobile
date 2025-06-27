import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import MiniCharacterCard from '../MiniCharacterCard';
import GameHandStyles from './GameHandStyles';
import type { OnePieceCharacter } from '../../data/OnePieceCharacters';

// Tipos
type Card = OnePieceCharacter & { name: string; imageUrl?: string };

interface GameHandProps {
  cards: Card[];
  onSelectCard: (card: Card) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(90, width / 6);
const CARD_HEIGHT = CARD_WIDTH * 1.38;
const CARD_OVERLAP = CARD_WIDTH * 0.45;
const ARC_HEIGHT = 15;
const MAX_ANGLE = 8;
const LIFT_AMOUNT = 32;

export const GameHand: React.FC<GameHandProps> = ({ cards, onSelectCard }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getCardStyle = (index: number) => {
    const total = cards.length;
    const center = (total - 1) / 2;
    const offset = index - center;

    // Rotação
    const angle = total > 1 ? offset * (MAX_ANGLE / center) : 0;

    // Posição no arco
    const arc = Math.sin(Math.abs(offset / (center + 0.5)) * Math.PI) * ARC_HEIGHT;

    // Elevação ao passar o mouse/tocar
    let translateY = -arc;
    let scale = 1;
    let shadow = {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    };

    if (hoveredIdx === index) {
      translateY -= LIFT_AMOUNT;
      scale = 1.1;
      shadow = {
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.8,
        shadowRadius: 18,
        elevation: 20,
      };
    }

    return {
      transform: [
        { translateX: offset * (CARD_WIDTH - CARD_OVERLAP) },
        { rotate: `${angle}deg` },
        { translateY },
        { scale },
      ],
      zIndex: hoveredIdx === index ? 100 : index,
      ...shadow,
    };
  };

  return (
    <View style={ GameHandStyles.handContainer }>
      { cards.map((card, i) => (
        <TouchableOpacity
          key={ card.malId }
          style={ [GameHandStyles.cardWrapper, getCardStyle(i)] }
          onPress={ () => onSelectCard(card) }
          activeOpacity={ 0.9 }
          onPressIn={ () => setHoveredIdx(i) }
          onPressOut={ () => setHoveredIdx(null) }
        >
          <MiniCharacterCard
            name={ card.name }
            group={ card.group }
            imageUrl={ card.imageUrl }
            cardWidth={ CARD_WIDTH }
            cardHeight={ CARD_HEIGHT }
            hideName={ true }
          />
        </TouchableOpacity>
      )) }
    </View>
  );
};
