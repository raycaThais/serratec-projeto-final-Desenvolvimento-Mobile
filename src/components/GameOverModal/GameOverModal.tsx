import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import GameOverModalStyles from './GameOverModalStyles';
import { RootStackParamList } from '../../routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type GameScreenScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "GameScreen">;

interface GameOverModalProps {
  navigation: GameScreenScreenNavigationProp;
  visible: boolean;
  result: 'win' | 'lose' | 'draw';
  onClose: () => void;
}

const messages = {
  win: 'Você venceu!',
  lose: 'Você perdeu!',
  draw: 'Empate!',
};

const GameOverModal: React.FC<GameOverModalProps> = ({ visible, result, onClose, navigation}) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={GameOverModalStyles.overlay}>
      <View style={GameOverModalStyles.modal}>
        <Text style={GameOverModalStyles.title}>{messages[result]}</Text>
        <TouchableOpacity
          style={[GameOverModalStyles.button, GameOverModalStyles.primaryButton]}
          onPress={onClose}
        >
          <Text style={GameOverModalStyles.buttonText} numberOfLines={1}>
            Jogar Novamente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[GameOverModalStyles.button, GameOverModalStyles.secondaryButton]}
          onPress={() => navigation.navigate("HomeTabs")}
        >
          <Text style={GameOverModalStyles.buttonText} numberOfLines={1}>
            Voltar a Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default GameOverModal; 