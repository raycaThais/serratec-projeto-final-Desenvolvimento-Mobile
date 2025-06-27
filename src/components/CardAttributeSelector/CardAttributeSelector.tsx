import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { CharacterCard } from '../CharacterCard';
import CardAttributeSelectorStyles from './CardAttributeSelectorStyles';

interface CardAttributeSelectorProps {
  open: boolean;
  character: {
    name: string;
    imageUrl?: string;
    group: string;
    forca?: number;
    velocidade?: number;
    resistencia?: number;
    inteligencia?: number;
    haki?: number;
    recompensa?: number;
  };
  onSelect: (attribute: string) => void;
  onClose: () => void;
  disabled?: boolean;
}

const ATTRIBUTES = [
  { key: 'forca', label: 'Força', icon: '⚔️' },
  { key: 'velocidade', label: 'Velocidade', icon: '⚡' },
  { key: 'resistencia', label: 'Resistência', icon: '🛡️' },
  { key: 'inteligencia', label: 'Inteligência', icon: '🧠' },
  { key: 'haki', label: 'Haki', icon: '✨' },
  { key: 'recompensa', label: 'Recompensa', icon: '💰' },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;
const CARD_HEIGHT = CARD_WIDTH * 1.25;

const CardAttributeSelector: React.FC<CardAttributeSelectorProps> = ({ open, character, onSelect, onClose, disabled }) => {
  if (!open) return null;
  return (
    <View style={ CardAttributeSelectorStyles.cardShadow }>
      <View style={ CardAttributeSelectorStyles.cardContainer }>
        <CharacterCard
          name={ character.name }
          imageUrl={ character.imageUrl }
          group={ character.group }
          forca={ character.forca }
          velocidade={ character.velocidade }
          resistencia={ character.resistencia }
          inteligencia={ character.inteligencia }
          haki={ character.haki }
          recompensa={ character.recompensa }
          onSelectAttribute={ disabled ? undefined : onSelect }
          disabledAttributes={ disabled }
        />
      </View>
      <TouchableOpacity style={ CardAttributeSelectorStyles.closeBtn } onPress={ onClose }>
        <Text style={ CardAttributeSelectorStyles.closeText }>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
};

