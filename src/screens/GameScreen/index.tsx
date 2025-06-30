import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';

import { useGameLogic, Atributo } from '../../hooks/useGameLogic';
import { ExpandableCardOverlay } from '../../components/ExpandableCardOverlay';
import GameOverModal from '../../components/GameOverModal';
import { MiniCharacterCard } from '../../components/MiniCharacterCard/MiniCharacterCard';
import { CardBack } from '../../components/CardBack';
import { styles } from './styles';
import type { OnePieceCharacter } from '../../data/OnePieceCharacters';
import { fetchAllCharacterDetails, CharacterData } from '../../services/JikanApi';

// --- Tipos e Constantes ---
type Card = OnePieceCharacter & CharacterData;

const CARD_WIDTH = 180;
const CARD_HEIGHT = 250;

const GameScreen = () => {
  // --- Estados do Componente ---
  const [characterDetails, setCharacterDetails] = useState<Record<number, CharacterData>>({});
  const [loading, setLoading] = useState(true);
  const [cardToExpand, setCardToExpand] = useState<Card | null>(null);

  // --- Uso do Hook de Lógica ---
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
  } = useGameLogic(characterDetails); // O hook recebe os detalhes dos personagens

  // --- Efeitos do Componente (Lifecycle) ---

  // Efeito para buscar os dados dos personagens usando o serviço centralizado
  useEffect(() => {
    const fetchGameData = async () => {
      setLoading(true);
      const details = await fetchAllCharacterDetails(); // Chama a função do serviço
      setCharacterDetails(details);
      setLoading(false);
    };
    fetchGameData();
  }, []); // Executa apenas uma vez, na montagem do componente

  // Efeito que inicia a partida assim que o carregamento dos dados termina.
  useEffect(() => {
    if (!loading) {
      iniciarPartida();
    }
  }, [loading]); // Depende do estado de 'loading'

  // --- Funções de Manipulação de Eventos (Handlers) ---
  const handleSelectAttribute = (attribute: Atributo) => {
    if (cardToExpand) {
      setCardToExpand(null);
      compararAtributos(attribute, 'jogador');
    }
  };

  // --- Renderização ---

  if (loading) {
    return (
      <View style={ styles.centered }>
        <ActivityIndicator size="large" color="#facc15" />
      </View>
    );
  }

  const playerCardWithDetails = cartaAtualJogador ? { ...cartaAtualJogador, ...characterDetails[cartaAtualJogador.malId] } : null;
  const botCardWithDetails = cartaAtualBot ? { ...cartaAtualBot, ...characterDetails[cartaAtualBot.malId] } : null;
  const isResultPhase = !!vencedorRodada;

  return (
    <SafeAreaView style={ styles.container }>
      { !cardToExpand ? (
        <>
          {/* Placar */ }
          <View style={ styles.scoreContainer }>
            <Text style={ styles.scoreText }>Você: { placarJogador }</Text>
            <Text style={ styles.scoreText }>Bot: { placarBot }</Text>
          </View>

          {/* Campo de Batalha */ }
          <View style={ styles.battlefield }>
            {/* Lado do Bot */ }
            <View style={ styles.playerSide }>
              <Text style={ styles.playerName }>Bot</Text>
              <View style={ styles.cardWrapper }>
                { atributoDisputado && botCardWithDetails ? (
                  <MiniCharacterCard
                    { ...botCardWithDetails }
                    atributoDestacado={ atributoDisputado }
                    cardWidth={ CARD_WIDTH }
                    cardHeight={ CARD_HEIGHT }
                  />
                ) : (
                  <CardBack />
                ) }
              </View>
            </View>
            {/* Lado do Jogador */ }
            <View style={ styles.playerSide }>
              <Text style={ styles.playerName }>Você</Text>
              <TouchableOpacity
                style={ styles.cardWrapper }
                onPress={ () => playerCardWithDetails && setCardToExpand(playerCardWithDetails) }
                disabled={ turno !== 'jogador' || isResultPhase }
              >
                { playerCardWithDetails && (
                  <MiniCharacterCard
                    { ...playerCardWithDetails }
                    atributoDestacado={ atributoDisputado }
                    cardWidth={ CARD_WIDTH }
                    cardHeight={ CARD_HEIGHT }
                  />
                ) }
              </TouchableOpacity>
            </View>
          </View>

          {/* Status e Ações */ }
          <View style={ styles.statusContainer }>
            <Text style={ styles.statusText }>{ resultado }</Text>
            { isResultPhase && !jogoFinalizado && (
              <TouchableOpacity style={ styles.confirmButton } onPress={ avancarParaProximaRodada }>
                <Text style={ styles.confirmButtonText }>Próxima Rodada</Text>
              </TouchableOpacity>
            ) }
          </View>
        </>
      ) : (
        // Modal de carta expandida
        <ExpandableCardOverlay
          visible={ !!cardToExpand }
          card={ cardToExpand! }
          onSelectAttribute={ handleSelectAttribute as (attr: string) => void }
          onClose={ () => setCardToExpand(null) }
        />
      ) }

      {/* Modal de Fim de Jogo */ }
      <GameOverModal
        visible={ jogoFinalizado }
        result={ placarJogador > placarBot ? 'win' : 'lose' }
        onClose={ iniciarPartida }
      />
    </SafeAreaView>
  );
};

export default GameScreen;