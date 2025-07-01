import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import type { Atributo } from '../../hooks/useGameLogic';
import { miniCharacterCardStyles as styles } from './miniCharacterCardStyles';
import { CardBack } from '../CardBack/CardBack';

// Lista de todos os atributos possíveis para consulta
const allAttributes: Atributo[] = ['forca', 'velocidade', 'resistencia', 'inteligencia', 'haki', 'recompensa'];

export const MiniCharacterCard: React.FC<{
  name: string;
  imageUrl?: string;
  cardWidth: number;
  cardHeight: number;
  borderColor?: string;
  forca?: number;
  velocidade?: number;
  resistencia?: number;
  inteligencia?: number;
  haki?: number;
  recompensa?: number;
  atributoDestacado?: Atributo | null;
}> = (props) => {
  const {
    name,
    imageUrl,
    cardWidth,
    cardHeight,
    borderColor,
    atributoDestacado,
  } = props;

  if (!imageUrl) {
    return <CardBack />;
  }

  const getHighlightedValue = () => {
    if (!atributoDestacado) return null;
    return props[atributoDestacado];
  };

  return (
    <View style={ [styles.cardShadow, { shadowColor: borderColor || '#000', borderColor: borderColor || '#fff' }] }>
      <ImageBackground
        source={ { uri: imageUrl } }
        style={ [styles.cardContainer, { width: cardWidth, height: cardHeight }] }
        imageStyle={ styles.cardImage }
      >
        { atributoDestacado && (
          <View style={ styles.highlightOverlay }>
            <Text style={ styles.highlightAttributeName }>
              { atributoDestacado.charAt(0).toUpperCase() + atributoDestacado.slice(1) }
            </Text>
            <Text style={ styles.highlightAttributeValue }>
              { getHighlightedValue() }
            </Text>
          </View>
        ) }

        <View style={ [styles.nameBottomContainer, atributoDestacado && { backgroundColor: 'transparent' }] }>
          <Text style={ styles.nameBottomText }>{ name }</Text>
        </View>
      </ImageBackground>
    </View>
  );
};