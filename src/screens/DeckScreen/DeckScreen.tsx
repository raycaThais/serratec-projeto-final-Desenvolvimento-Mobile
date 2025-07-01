import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ Adicione este import
import { MiniCharacterCard } from '../../components/MiniCharacterCard/MiniCharacterCard';
import { CharacterCard } from '../../components/CharacterCard/CharacterCard';
import { onePieceCharacters, getCharacterAttributes } from '../../data/OnePieceCharacters';
import { deckScreenStyles as styles } from './deckScreenStyles';
import { fetchAllCharacterDetails, CharacterData } from '../../services/JikanApi';

const MINI_CARD_WIDTH = 110;
const MINI_CARD_HEIGHT = 145;

type CharacterDisplayData = CharacterData & { group: string };

export const DeckScreen: React.FC = () => {
  const [charactersData, setCharactersData] = useState<Record<number, CharacterDisplayData>>({});
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<{
    character: CharacterDisplayData;
    attributes: any;
  } | null>(null);

  const getDisplayName = (fullName: string): string => {
    const parts = fullName.split(/[ ,]/).filter(Boolean);
    return parts.length > 0 ? parts[parts.length - 1] : '';
  };

  const handleCardPress = (char: any) => {
    const character = charactersData[char.malId];
    const attributes = getCharacterAttributes(char.malId);
    setSelectedCard({ character, attributes });
  };

  const getBorderColor = (group: string): string | undefined => {
    const borderColors: Record<string, string> = {
      whitebeard: '#FFFFFF',   // Branco
      roger: '#FFD700',        // Dourado
      shanks: '#DC143C',       // Vermelho carmesim
      marinha: '#1E90FF',      // Azul dodger
      viloes: '#9370DB',       // Roxo medium
      shichibukai: '#FFD700',  // Amarelo dourado
      mugiwaras: '#FF7F50',    // Laranja coral
      aliados: '#32CD32',      // Verde lima
    };
    return borderColors[group];
  };

  useEffect(() => {
    const fetchDeckData = async () => {
      setLoading(true);
      const detailsFromApi = await fetchAllCharacterDetails();
      const combinedData: Record<number, CharacterDisplayData> = {};

      for (const localChar of onePieceCharacters) {
        const apiData = detailsFromApi[localChar.malId];
        combinedData[localChar.malId] = {
          name: apiData?.name || `Personagem ${localChar.malId}`,
          imageUrl: apiData?.imageUrl,
          group: localChar.group,
        };
      }

      setCharactersData(combinedData);
      setLoading(false);
    };

    fetchDeckData();
  }, []);

  const grouped = onePieceCharacters.reduce((acc, curr) => {
    if (!acc[curr.group]) {
      acc[curr.group] = [];
    }
    acc[curr.group].push(curr);
    return acc;
  }, {} as Record<string, typeof onePieceCharacters>);

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

  if (selectedCard) {
    return (
      <View style={ styles.characterCardContainer }>
        <TouchableOpacity style={ styles.backButton } onPress={ () => setSelectedCard(null) }>
          <Text style={ styles.backButtonText }>← Voltar</Text>
        </TouchableOpacity>

        <View style={ styles.characterCardWrapper }>
          <CharacterCard
            name={ selectedCard.character.name }
            imageUrl={ selectedCard.character.imageUrl }
            group={ selectedCard.character.group }
            forca={ selectedCard.attributes?.forca }
            velocidade={ selectedCard.attributes?.velocidade }
            resistencia={ selectedCard.attributes?.resistencia }
            inteligencia={ selectedCard.attributes?.inteligencia }
            haki={ selectedCard.attributes?.haki }
            recompensa={ selectedCard.attributes?.recompensa }
          />
        </View>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={ ['#87CEEB', '#B0E0E6', '#E0F6FF'] } // ✅ Gradiente azul suave
      style={ { flex: 1 } }
    >
      <ScrollView contentContainerStyle={ styles.container }>
        <Text style={ styles.title }>Baralho</Text>
        { loading ? (
          <ActivityIndicator size="large" color="#facc15" style={ { marginTop: 40 } } />
        ) : (
          Object.keys(grouped).map((groupKey) => (
            <View key={ groupKey } style={ styles.groupSection }>
              <Text style={ styles.groupTitle }>{ groupTitles[groupKey] }</Text>
              <View style={ styles.grid }>
                { grouped[groupKey].map((char) => (
                  <TouchableOpacity
                    key={ char.malId }
                    style={ styles.cardWrapper }
                    activeOpacity={ 0.85 }
                    onPress={ () => handleCardPress(char) }
                  >
                    <MiniCharacterCard
                      group={ groupKey as any }
                      name={ getDisplayName(charactersData[char.malId]?.name || '') }
                      imageUrl={ charactersData[char.malId]?.imageUrl }
                      borderColor={ getBorderColor(groupKey) }
                      cardWidth={ MINI_CARD_WIDTH }
                      cardHeight={ MINI_CARD_HEIGHT }
                    />
                  </TouchableOpacity>
                )) }
              </View>
            </View>
          ))
        ) }
      </ScrollView>
    </LinearGradient>
  );
};