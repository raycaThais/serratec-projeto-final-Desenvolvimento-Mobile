import React, { useEffect, useRef } from 'react';
import { Animated, View, TouchableOpacity, Text, BackHandler } from 'react-native';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import ExpandableCardOverlayStyles from './ExpandableCardOverlayStyles';


import type { OnePieceCharacter } from '../../data/OnePieceCharacters';


type Card = OnePieceCharacter & { name: string; imageUrl?: string };

interface ExpandableCardOverlayProps {
  visible: boolean;
  card: Card;
  onSelectAttribute?: (attribute: string) => void;
  onConfirm?: () => void;
  isConfirmationOnly?: boolean;
  onClose: () => void;
}

export const ExpandableCardOverlay: React.FC<ExpandableCardOverlayProps> = ({
  visible,
  card,
  onSelectAttribute,
  onConfirm,
  isConfirmationOnly = false,
  onClose
}) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backAction = () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, { toValue: 0.8, duration: 200, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 150, useNativeDriver: true })
      ]).start();
    }

    return () => backHandler.remove();
  }, [visible, scaleAnim, opacityAnim, onClose]);

  if (!visible) return null;

  return (
    <View style={ ExpandableCardOverlayStyles.overlayContainer }>
      <Animated.View style={ [ExpandableCardOverlayStyles.overlayBg, { opacity: opacityAnim }] }>
        <TouchableOpacity style={ { flex: 1 } } activeOpacity={ 1 } onPress={ onClose } />
      </Animated.View>

      <Animated.View style={ [ExpandableCardOverlayStyles.cardCenter, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }] }>
        <CharacterCard
          { ...card }
          hideAttributes={ false }
          onSelectAttribute={ !isConfirmationOnly ? onSelectAttribute as (attr: string) => void : undefined }
          disabledAttributes={ isConfirmationOnly }
        />

        { isConfirmationOnly && onConfirm ? (
          <TouchableOpacity style={ ExpandableCardOverlayStyles.confirmButton } onPress={ onConfirm }>
            <Text style={ ExpandableCardOverlayStyles.buttonText }>Confirmar Jogada</Text>
          </TouchableOpacity>
        ) : null }

        <TouchableOpacity style={ ExpandableCardOverlayStyles.closeBtn } onPress={ onClose }>
          <Text style={ ExpandableCardOverlayStyles.closeText }>Cancelar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
