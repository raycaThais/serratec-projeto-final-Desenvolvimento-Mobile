import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import GameOverModalStyles from './GameOverModalStyles';

interface GameOverModalProps {
  visible: boolean;
  result: 'win' | 'lose' | 'draw';
  onClose: () => void;
}

const messages = {
  win: 'Você venceu!',
  lose: 'Você perdeu!',
  draw: 'Empate!',
};

const GameOverModal: React.FC<GameOverModalProps> = ({ visible, result, onClose }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={GameOverModalStyles.overlay}>
      <View style={GameOverModalStyles.modal}>
        <Text style={GameOverModalStyles.title}>{messages[result]}</Text>
        <TouchableOpacity style={GameOverModalStyles.button} onPress={onClose}>
          <Text style={GameOverModalStyles.buttonText}>Voltar ao início</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default GameOverModal; 