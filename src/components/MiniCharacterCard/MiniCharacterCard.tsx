import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { miniCharacterCardStyles as styles } from './miniCharacterCardStyles';

const GROUP_COLORS: Record<string, string> = {
  mugiwaras: '#ff6b35',
  marinha: '#2563eb',
  aliados: '#10b981',
  shichibukai: '#8b5cf6',
  viloes: '#ef4444',
  shanks: '#f59e0b',
  whitebeard: '#ffffff',
  roger: '#fbbf24',
};

interface MiniCharacterCardProps {
  name: string;
  imageUrl?: string;
  group: string;
  borderColor?: string;
  borderWidth?: number;
  cardWidth?: number;
  cardHeight?: number;
  truncateName?: boolean;
  hideName?: boolean;
}

export const MiniCharacterCard: React.FC<MiniCharacterCardProps> = ({
  name,
  imageUrl,
  group,
  borderColor,
  borderWidth = 8,
  cardWidth = 110,
  cardHeight = 145,
  truncateName = false,
  hideName = false,
}) => {
  const groupBorderColor = borderColor || GROUP_COLORS[group] || '#fff';
  return (
    <View style={[
      styles.cardShadow,
      styles.outerMiniCardContainer,
      { borderColor: groupBorderColor, borderWidth, width: cardWidth, height: cardHeight },
    ]}>
      <ImageBackground
        source={imageUrl ? { uri: imageUrl } : undefined}
        style={[styles.innerCardContainer, { width: cardWidth, height: cardHeight }]}
        imageStyle={styles.innerCardImage}
      >
        {!hideName && (
          <View style={styles.nameBottomContainer}>
            <Text
              style={styles.nameBottomText}
              numberOfLines={1}
              ellipsizeMode={truncateName ? 'tail' : 'clip'}
            >
              {truncateName && name.length > 14 ? name.slice(0, 13) + '…' : name}
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}; 