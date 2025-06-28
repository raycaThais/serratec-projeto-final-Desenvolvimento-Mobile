import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

// Lógica e componentes
import { useGameLogic, Atributo } from '../../hooks/useGameLogic';
import { ExpandableCardOverlay } from '../../components/ExpandableCardOverlay';
import GameOverModal from '../../components/GameOverModal';
import { MiniCharacterCard } from '../../components/MiniCharacterCard/MiniCharacterCard';
import { CardBack } from '../../components/CardBack';
import { onePieceCharacters } from '../../data/OnePieceCharacters';
import { styles } from './styles'; // Importação corrigida
import type { OnePieceCharacter } from '../../data/OnePieceCharacters';

type CharacterData = { name: string; imageUrl?: string };
type Card = OnePieceCharacter & CharacterData;

const GameScreen = () => {
  const { placarJogador, placarBot, resultado, jogoFinalizado, vencedorRodada, cartaAtualJogador, cartaAtualBot, turno, iniciarPartida, compararAtributos } = useGameLogic();
  const [characterDetails, setCharacterDetails] = useState<Record<number, CharacterData>>({});
  const [loading, setLoading] = useState(true);
  const [cardToExpand, setCardToExpand] = useState<Card | null>(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      setLoading(true);
      const details: Record<number, CharacterData> = {};
      try {
        const res = await axios.get('https://api.jikan.moe/v4/anime/21/characters');
        const apiCharacters = res.data.data;
        for (const char of onePieceCharacters) {
          const apiChar = apiCharacters.find((c: any) => c.character.mal_id === char.malId);
          details[char.malId] = { name: apiChar ? apiChar.character.name : `Personagem ${char.malId}`, imageUrl: apiChar ? apiChar.character.images.jpg.image_url : undefined };
        }
      } catch (error) {
        console.error("Erro ao buscar dados dos personagens:", error);
      } finally {
        setCharacterDetails(details);
        setLoading(false);
      }
    };
    fetchCharacterData();
  }, []);

  useEffect(() => {
    if (!loading) iniciarPartida();
  }, [loading]);

  const handleSelectAttribute = (attribute: Atributo) => {
    if (cardToExpand) {
      setCardToExpand(null);
      compararAtributos(attribute);
    }
  };

  if (loading) return <View style={ styles.centered }><ActivityIndicator size="large" color="#facc15" /></View>;

  const playerCardWithDetails = cartaAtualJogador ? { ...cartaAtualJogador, ...characterDetails[cartaAtualJogador.malId] } : null;
  const botCardWithDetails = cartaAtualBot ? { ...cartaAtualBot, ...characterDetails[cartaAtualBot.malId] } : null;

  const isResultPhase = !!vencedorRodada;

  return (
    <SafeAreaView style={ styles.container }>
      { !cardToExpand ? (
        <>
          <View style={ styles.scoreContainer }>
            <Text style={ styles.scoreText }>Você: { placarJogador }</Text>
            <Text style={ styles.scoreText }>Bot: { placarBot }</Text>
          </View>

          <View style={ styles.battlefield }>
            <View style={ styles.playerSide }>
              <Text style={ styles.playerName }>Bot</Text>
              <View style={ styles.cardWrapper }>
                { isResultPhase && botCardWithDetails ? (
                  <MiniCharacterCard { ...botCardWithDetails } cardWidth={ 180 } cardHeight={ 250 } />
                ) : (
                  <CardBack />
                ) }
              </View>
            </View>
            <View style={ styles.playerSide }>
              <Text style={ styles.playerName }>Você</Text>
              <TouchableOpacity
                style={ styles.cardWrapper }
                onPress={ () => playerCardWithDetails && setCardToExpand(playerCardWithDetails) }
                disabled={ turno !== 'jogador' || isResultPhase }
              >
                { playerCardWithDetails && <MiniCharacterCard { ...playerCardWithDetails } cardWidth={ 180 } cardHeight={ 250 } /> }
              </TouchableOpacity>
            </View>
          </View>

          <View style={ styles.statusContainer }>
            <Text style={ styles.statusText }>{ resultado }</Text>
          </View>
        </>
      ) : (
        <ExpandableCardOverlay
          visible={ !!cardToExpand }
          card={ cardToExpand! }
          onSelectAttribute={ handleSelectAttribute as (attr: string) => void }
          onClose={ () => setCardToExpand(null) }
        />
      ) }

      <GameOverModal
        visible={ jogoFinalizado }
        result={ placarJogador >= 5 ? 'win' : 'lose' }
        onClose={ iniciarPartida }
      />
    </SafeAreaView>
  );
};

export default GameScreen;