import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MiniCharacterCard } from '../../components/MiniCharacterCard/MiniCharacterCard';
import { CharacterCard } from '../../components/CharacterCard/CharacterCard';
import { onePieceCharacters, getCharacterAttributes } from '../../data/OnePieceCharacters';
import axios from 'axios';
import { deckScreenStyles as styles } from './deckScreenStyles';
import { useNavigation } from '@react-navigation/native';

const MINI_CARD_WIDTH = 110;
const MINI_CARD_HEIGHT = 145;

export const DeckScreen: React.FC = () => {
  const [charactersData, setCharactersData] = useState<Record<number, { name: string; imageUrl: string; group: string }>>({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      let data: Record<number, { name: string; imageUrl: string; group: string }> = {};
      let apiCharacters: any[] = [];
      try {
        const res = await axios.get('https://api.jikan.moe/v4/anime/21/characters');
        apiCharacters = res.data.data;
      } catch {
        apiCharacters = [];
      }
      for (const char of onePieceCharacters) {
        const found = apiCharacters.find((c) => c.character.mal_id === char.malId);
        data[char.malId] = {
          name: found ? found.character.name : '',
          imageUrl: found ? found.character.images.jpg.image_url : '',
          group: char.group
        };
      }
      setCharactersData(data);
      setLoading(false);
    }
    fetchImages();
  }, []);

  // Agrupar personagens por grupo para exibição
  const grouped = onePieceCharacters.reduce((acc, curr) => {
    if (!acc[curr.group]) acc[curr.group] = [];
    acc[curr.group].push(curr);
    return acc;
  }, {} as Record<string, { malId: number; group: string }[]>);

  // Títulos dos grupos
  const groupTitles: Record<string, string> = {
    roger: 'Super Trunfo',
    mugiwaras: 'Mugiwara / Chapéus de Palha',
    aliados: 'Aliados Importantes',
    shichibukai: 'Shichibukai',
    marinha: 'Marinha e Governo Mundial',
    viloes: 'Vilões Principais',
    shanks: 'Tripulação do Shanks',
    whitebeard: 'Piratas do Barba Branca',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Baralho</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#facc15" style={{ marginTop: 40 }} />
      ) : (
        Object.keys(grouped).map((groupKey) => (
          <View key={groupKey} style={styles.groupSection}>
            <Text style={styles.groupTitle}>{groupTitles[groupKey]}</Text>
            <View style={styles.grid}>
              {grouped[groupKey].map((char) => (
                <TouchableOpacity
                  key={char.malId}
                  style={styles.cardWrapper}
                  activeOpacity={0.85}
                  onPress={() => {
                    const character = charactersData[char.malId];
                    const attributes = getCharacterAttributes(char.malId);
                    navigation.navigate('CharacterDetails', {
                      ...character,
                      ...attributes,
                    } as any);
                  }}
                >
                  <MiniCharacterCard
                    group={groupKey as any}
                    name={(() => {
                      const fullName = charactersData[char.malId]?.name || '';
                      const parts = fullName.split(/[ ,]/).filter(Boolean);
                      return parts.length > 0 ? parts[parts.length - 1] : '';
                    })()}
                    imageUrl={charactersData[char.malId]?.imageUrl}
                    borderColor={groupKey === 'whitebeard' ? '#fff' : undefined}
                    cardWidth={MINI_CARD_WIDTH}
                    cardHeight={MINI_CARD_HEIGHT}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};