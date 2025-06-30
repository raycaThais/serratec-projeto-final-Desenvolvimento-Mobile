import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MiniCharacterCard } from '../../components/MiniCharacterCard/MiniCharacterCard';
import { onePieceCharacters, getCharacterAttributes } from '../../data/OnePieceCharacters';
import { deckScreenStyles as styles } from './deckScreenStyles';
import { useNavigation } from '@react-navigation/native'; // rapaz sem navegação isso aqui quebra 

// --- Importação do serviço e do tipo ---
import { fetchAllCharacterDetails, CharacterData } from '../../services/JikanApi';

const MINI_CARD_WIDTH = 110;
const MINI_CARD_HEIGHT = 145;

// Combinamos o tipo do serviço com a propriedade 'group' que usaremos localmente
type CharacterDisplayData = CharacterData & { group: string };

export const DeckScreen: React.FC = () => {
  const [charactersData, setCharactersData] = useState<Record<number, CharacterDisplayData>>({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // rapaz sem navegação isso aqui quebra  2

  useEffect(() => {
    const fetchDeckData = async () => {
      setLoading(true);

      // 1. Busca os detalhes (nome, imagem) do serviço centralizado
      const detailsFromApi = await fetchAllCharacterDetails();
      const combinedData: Record<number, CharacterDisplayData> = {};

      // 2. Combina os dados da API com os dados locais (como o 'group')
      for (const localChar of onePieceCharacters) {
        const apiData = detailsFromApi[localChar.malId];
        combinedData[localChar.malId] = {
          name: apiData?.name || `Personagem ${localChar.malId}`,
          imageUrl: apiData?.imageUrl,
          group: localChar.group, // Adiciona o grupo dos dados locais
        };
      }

      setCharactersData(combinedData);
      setLoading(false);
    };

    fetchDeckData();
  }, []);

  // Agrupa os personagens por grupo para exibição na tela
  const grouped = onePieceCharacters.reduce((acc, curr) => {
    if (!acc[curr.group]) {
      acc[curr.group] = [];
    }
    acc[curr.group].push(curr);
    return acc;
  }, {} as Record<string, typeof onePieceCharacters>);

  // Títulos para cada grupo
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
                  onPress={ () => {
                    const character = charactersData[char.malId];
                    const attributes = getCharacterAttributes(char.malId);
                    navigation.navigate('CharacterDetails', {
                      ...character,
                      ...attributes,
                    } as any);
                  } }
                >
                  <MiniCharacterCard
                    group={ groupKey as any }
                    name={ (() => {
                      const fullName = charactersData[char.malId]?.name || '';
                      // Pega apenas o último nome para caber no card
                      const parts = fullName.split(/[ ,]/).filter(Boolean);
                      return parts.length > 0 ? parts[parts.length - 1] : '';
                    })() }
                    imageUrl={ charactersData[char.malId]?.imageUrl }
                    borderColor={ groupKey === 'whitebeard' ? '#fff' : undefined }
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
  );
};