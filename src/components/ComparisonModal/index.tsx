import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import {styles} from './styles'

type Props = {
  visible: boolean;
  onClose: () => void;
  playerName: string;
  playerValue: number;
  botName: string;
  botValue: number;
  attribute: string;
  resultText: string;
};

export const ComparisonModal = ({ visible, onClose, playerName, playerValue, botName, botValue, attribute, resultText }: Props) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.attributeTitle}>Disputa de {attribute}</Text>
        <View style={styles.comparisonRow}>
          <Text style={styles.playerText}>{playerName}: {playerValue}</Text>
          <Text style={styles.vsText}>vs</Text>
          <Text style={styles.playerText}>{botName}: {botValue}</Text>
        </View>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>
    </TouchableOpacity>
  </Modal>
);