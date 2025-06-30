import React, { useState, useRef } from 'react';
import { View, Text, ImageBackground, Animated, PanResponder, TouchableOpacity } from 'react-native';
import { characterCardStyles as styles, CARD_WIDTH, CARD_HEIGHT } from './characterCardStyles';
import { BlurView } from 'expo-blur';

const FALLBACK_IMAGE = 'https://static.wikia.nocookie.net/onepiece/images/2/2c/Monkey_D._Luffy_Anime_Pre_Timeskip_Infobox.png';

interface CharacterCardProps {
  name: string;
  imageUrl?: string;
  group: string;
  borderColor?: string;
  forca?: number;
  velocidade?: number;
  resistencia?: number;
  inteligencia?: number;
  haki?: number;
  recompensa?: number;
  hideAttributes?: boolean;
  onSelectAttribute?: (attribute: string) => void;
  disabledAttributes?: boolean;
}

const ATTRIBUTES = [
  { key: 'forca', label: 'Força', icon: '⚔️' },
  { key: 'velocidade', label: 'Velocidade', icon: '⚡' },
  { key: 'resistencia', label: 'Resistência', icon: '🛡️' },
  { key: 'inteligencia', label: 'Inteligência', icon: '🧠' },
  { key: 'haki', label: 'Haki', icon: '✨' },
  { key: 'recompensa', label: 'Recompensa', icon: '💰' },
];

// Cores por grupo
const GROUP_COLORS = {
  mugiwaras: '#ff6b35',
  marinha: '#2563eb',
  aliados: '#10b981',
  shichibukai: '#8b5cf6',
  viloes: '#ef4444',
  shanks: '#f59e0b',
  whitebeard: '#ffffff',
  roger: '#fbbf24',
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  imageUrl,
  group,
  borderColor,
  forca,
  velocidade,
  resistencia,
  inteligencia,
  haki,
  recompensa,
  hideAttributes = false,
  onSelectAttribute,
  disabledAttributes = false,
}) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  
  // Cor da borda baseada no grupo
  const groupBorderColor = borderColor || GROUP_COLORS[group as keyof typeof GROUP_COLORS] || '#fff';
  
  // Animações para o efeito 3D
  const tilt = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const glow = useRef(new Animated.Value(1)).current;
  
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Aumenta o brilho quando começar a mover
        Animated.timing(glow, {
          toValue: 1.5,
          duration: 200,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: (_, gesture) => {
        const maxTilt = 15;
        const sensitivity = 12;
        const tiltX = Math.max(Math.min(gesture.dy / sensitivity, maxTilt), -maxTilt);
        const tiltY = Math.max(Math.min(-gesture.dx / sensitivity, maxTilt), -maxTilt);
        tilt.setValue({ x: tiltX, y: tiltY });
      },
      onPanResponderRelease: () => {
        // Volta ao normal
        Animated.parallel([
          Animated.spring(tilt, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.timing(glow, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          })
        ]).start();
      },
      onPanResponderTerminate: () => {
        Animated.parallel([
          Animated.spring(tilt, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.timing(glow, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          })
        ]).start();
      },
    })
  ).current;

  const animatedStyle = {
    transform: [
      { perspective: 1000 },
      { rotateX: tilt.x.interpolate({ inputRange: [-15, 15], outputRange: ['15deg', '-15deg'] }) },
      { rotateY: tilt.y.interpolate({ inputRange: [-15, 15], outputRange: ['-15deg', '15deg'] }) },
      { scale: tilt.x.interpolate({ inputRange: [-15, 15], outputRange: [1.02, 1.02] }) },
    ],
  };

  // Brilho animado na borda envolvendo todo o card
  const animatedBorderGlow = {
    borderColor: groupBorderColor,
    borderWidth: 8,
    borderRadius: 28,
    shadowColor: groupBorderColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glow.interpolate({ inputRange: [1, 1.5], outputRange: [0.7, 1] }),
    shadowRadius: glow.interpolate({ inputRange: [1, 1.5], outputRange: [24, 40] }),
    elevation: 32,
    backgroundColor: 'transparent',
  };

  // Valores dos atributos
  const attrValues = {
    forca,
    velocidade,
    resistencia,
    inteligencia,
    haki,
    recompensa,
  };

  // Aumentar altura do card para faixa do nome
  const CARD_TOTAL_HEIGHT = CARD_HEIGHT + 54;

  return (
    <Animated.View
      style={[
        animatedBorderGlow,
        styles.cardShadow,
        animatedStyle,
        styles.outerCardContainer,
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.innerCardContainer}>
        <ImageBackground
          source={imgSrc ? { uri: imgSrc } : { uri: FALLBACK_IMAGE }}
          style={styles.innerCardImage}
          imageStyle={styles.innerCardImage}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        >
          {/* Overlay gradient para melhor legibilidade */}
          <View style={styles.gradientOverlay} />
          {/* Glassmorphism nos atributos */}
          {!hideAttributes && (
            <View style={styles.attributesContainer}>
              <BlurView intensity={80} tint="dark" style={styles.blurView} />
              <View style={styles.attributesContent}>
                {ATTRIBUTES.map((attr, idx) => (
                  attrValues[attr.key as keyof typeof attrValues] !== undefined && (
                    onSelectAttribute ? (
                      <TouchableOpacity
                        key={attr.key}
                        style={[
                          styles.attributeRow,
                          idx === ATTRIBUTES.length - 1 && styles.lastAttributeRow,
                          styles.selectableAttributeRow,
                          disabledAttributes && { opacity: 0.5 },
                        ]}
                        onPress={() => onSelectAttribute(attr.key)}
                        activeOpacity={0.7}
                        disabled={disabledAttributes}
                      >
                        <View style={styles.attrLabelContainer}>
                          <Text style={styles.attrIcon}>{attr.icon}</Text>
                          <Text style={styles.attrLabel}>{attr.label}</Text>
                        </View>
                        <View style={styles.attrValueContainer}>
                          <Text style={styles.attrValue}>{attrValues[attr.key as keyof typeof attrValues]}</Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <View key={attr.key} style={[styles.attributeRow, idx === ATTRIBUTES.length - 1 && styles.lastAttributeRow]}>
                        <View style={styles.attrLabelContainer}>
                          <Text style={styles.attrIcon}>{attr.icon}</Text>
                          <Text style={styles.attrLabel}>{attr.label}</Text>
                        </View>
                        <View style={styles.attrValueContainer}>
                          <Text style={styles.attrValue}>{attrValues[attr.key as keyof typeof attrValues]}</Text>
                        </View>
                      </View>
                    )
                  )
                ))}
              </View>
            </View>
          )}
          {/* Grupo indicator */}
          <View style={[styles.groupIndicator, { backgroundColor: groupBorderColor }]}> 
            <Text style={styles.groupText}>{group.toUpperCase()}</Text>
          </View>
        </ImageBackground>
      </View>
      {/* Nome do personagem em faixa preta fora da imagem */}
      <View style={[styles.nameFooterContainer, { borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }]}> 
        <Text style={styles.nameFooterText}>{name}</Text>
      </View>
    </Animated.View>
  );
};