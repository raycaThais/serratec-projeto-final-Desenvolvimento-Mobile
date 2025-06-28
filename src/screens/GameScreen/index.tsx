import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

import { useGameLogic, Atributo } from '../../hooks/useGameLogic';
import { ExpandableCardOverlay } from '../../components/ExpandableCardOverlay';
import GameOverModal from '../../components/GameOverModal';
import { MiniCharacterCard } from '../../components/MiniCharacterCard/MiniCharacterCard';
// ✅ CORREÇÃO 1: Importar o CardBack
import { CardBack } from '../../components/CardBack';
import { onePieceCharacters } from '../../data/OnePieceCharacters';
import { styles as screenStyles } from './styles';
import type { OnePieceCharacter } from '../../data/OnePieceCharacters';

type CharacterData = { name: string; imageUrl?: string };
type Card = OnePieceCharacter & CharacterData;

// ✅ Vamos definir as dimensões dos cards aqui para reutilizar
const CARD_WIDTH = 180;
const CARD_HEIGHT = 250;

const GameScreen = () => {
  const [characterDetails, setCharacterDetails] = useState<Record<number, CharacterData>>({});
  const {
    placarJogador,
    placarBot,
    resultado,
    jogoFinalizado,
    vencedorRodada,
    cartaAtualJogador,
    cartaAtualBot,
    turno,
    iniciarPartida,
    compararAtributos,
    atributoDisputado,
    avancarParaProximaRodada,
  } = useGameLogic(characterDetails);

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
      compararAtributos(attribute, 'jogador');
    }
  };

  if (loading) return <View style={ screenStyles.centered }><ActivityIndicator size="large" color="#facc15" /></View>;

  const playerCardWithDetails = cartaAtualJogador ? { ...cartaAtualJogador, ...characterDetails[cartaAtualJogador.malId] } : null;
  const botCardWithDetails = cartaAtualBot ? { ...cartaAtualBot, ...characterDetails[cartaAtualBot.malId] } : null;

  const isResultPhase = !!vencedorRodada;

  return (
    <SafeAreaView style={ screenStyles.container }>
      { !cardToExpand ? (
        <>
          <View style={ screenStyles.scoreContainer }>
            <Text style={ screenStyles.scoreText }>Você: { placarJogador }</Text>
            <Text style={ screenStyles.scoreText }>Bot: { placarBot }</Text>
          </View>

          <View style={ screenStyles.battlefield }>
            {/* Lado do Bot */ }
            <View style={ screenStyles.playerSide }>
              <Text style={ screenStyles.playerName }>Bot</Text>
              <View style={ screenStyles.cardWrapper }>
                { atributoDisputado && botCardWithDetails ? (
                  <MiniCharacterCard
                    { ...botCardWithDetails }
                    atributoDestacado={ atributoDisputado }
                    // ✅ CORREÇÃO 2: Passar as props de dimensão
                    cardWidth={ CARD_WIDTH }
                    cardHeight={ CARD_HEIGHT }
                  />
                ) : (
                  <CardBack />
                ) }
              </View>
            </View>
            {/* Lado do Jogador */ }
            <View style={ screenStyles.playerSide }>
              <Text style={ screenStyles.playerName }>Você</Text>
              <TouchableOpacity
                style={ screenStyles.cardWrapper }
                onPress={ () => playerCardWithDetails && setCardToExpand(playerCardWithDetails) }
                disabled={ turno !== 'jogador' || isResultPhase }
              >
                { playerCardWithDetails && (
                  <MiniCharacterCard
                    { ...playerCardWithDetails }
                    atributoDestacado={ atributoDisputado }
                    // ✅ CORREÇÃO 2: Passar as props de dimensão
                    cardWidth={ CARD_WIDTH }
                    cardHeight={ CARD_HEIGHT }
                  />
                ) }
              </TouchableOpacity>
            </View>
          </View>

          <View style={ screenStyles.statusContainer }>
            <Text style={ screenStyles.statusText }>{ resultado }</Text>

            { isResultPhase && !jogoFinalizado && (
              <TouchableOpacity style={ styles.confirmButton } onPress={ avancarParaProximaRodada }>
                <Text style={ styles.confirmButtonText }>Próxima Rodada</Text>
              </TouchableOpacity>
            ) }
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
        result={ placarJogador > placarBot ? 'win' : 'lose' }
        onClose={ iniciarPartida }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    backgroundColor: '#facc15',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 15,
    alignSelf: 'center',
    elevation: 5,
  },
  confirmButtonText: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});

export default GameScreen;