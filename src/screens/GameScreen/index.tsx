import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

// --- Importação de Componentes e Lógica ---
import { useGameLogic, Atributo } from '../../hooks/useGameLogic'; // O hook com a lógica do jogo.
import { ExpandableCardOverlay } from '../../components/ExpandableCardOverlay'; // Modal para expandir a carta.
import GameOverModal from '../../components/GameOverModal'; // Modal de fim de jogo.
import { MiniCharacterCard } from '../../components/MiniCharacterCard/MiniCharacterCard'; // Componente do card.
import { CardBack } from '../../components/CardBack'; // Componente para o verso da carta.
import { onePieceCharacters } from '../../data/OnePieceCharacters'; // Dados estáticos dos personagens.
import { styles } from './styles';
import type { OnePieceCharacter } from '../../data/OnePieceCharacters';

// --- Tipos e Constantes ---
type CharacterData = { name: string; imageUrl?: string }; // Tipo para os dados vindos da API.
type Card = OnePieceCharacter & CharacterData; // Combina os dados locais e da API.

const CARD_WIDTH = 180; // Largura padrão dos cards na tela.
const CARD_HEIGHT = 250; // Altura padrão dos cards na tela.

// Componente de tela que renderiza a interface principal do jogo.

const GameScreen = () => {
  // --- Estados do Componente ---

  // Estado para armazenar dados (nome, imagem) buscados da API.
  const [characterDetails, setCharacterDetails] = useState<Record<number, CharacterData>>({});
  // Estado para controlar a tela de carregamento inicial.
  const [loading, setLoading] = useState(true);
  // Estado para controlar qual carta está expandida na tela.
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
  } = useGameLogic(characterDetails);

  // --- Efeitos do Componente (Lifecycle) ---

  // Efeito para buscar os dados dos personagens da API Jikan na primeira renderização.
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

  // Efeito que inicia a partida assim que o carregamento dos dados termina.
  useEffect(() => {
    if (!loading) iniciarPartida();
  }, [loading]);

  // --- Funções de Manipulação de Eventos (Handlers) ---

  /**
   * Chamada quando o jogador seleciona um atributo na carta expandida.
   * Ela fecha o overlay e chama a função de comparação do hook.
   */
  const handleSelectAttribute = (attribute: Atributo) => {
    if (cardToExpand) {
      setCardToExpand(null);
      compararAtributos(attribute, 'jogador');
    }
  };

  // Renderiza um indicador de carregamento enquanto os dados da API não chegam.
  if (loading) return <View style={ styles.centered }><ActivityIndicator size="large" color="#facc15" /></View>;

  // Combina os dados locais das cartas com os dados da API para renderização.
  const playerCardWithDetails = cartaAtualJogador ? { ...cartaAtualJogador, ...characterDetails[cartaAtualJogador.malId] } : null;
  const botCardWithDetails = cartaAtualBot ? { ...cartaAtualBot, ...characterDetails[cartaAtualBot.malId] } : null;

  // Variável booleana para simplificar a verificação da fase de resultado.
  const isResultPhase = !!vencedorRodada;

  // --- Renderização do JSX ---
  return (
    <SafeAreaView style={ styles.container }>
      {/* Renderiza a tela principal do jogo ou o overlay da carta expandida */ }
      { !cardToExpand ? (
        <>
          {/* Seção do Placar */ }
          <View style={ styles.scoreContainer }>
            <Text style={ styles.scoreText }>Você: { placarJogador }</Text>
            <Text style={ styles.scoreText }>Bot: { placarBot }</Text>
          </View>

          {/* Seção do Campo de Batalha */ }
          <View style={ styles.battlefield }>
            {/* Lado do Bot */ }
            <View style={ styles.playerSide }>
              <Text style={ styles.playerName }>Bot</Text>
              <View style={ styles.cardWrapper }>
                {/* Mostra a carta do bot virada para cima apenas quando um atributo é disputado. Senão, mostra o verso. */ }
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
                // Desabilita o clique se não for o turno do jogador ou se a rodada estiver na fase de resultado.
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

          {/* Seção de Status e Ações */ }
          <View style={ styles.statusContainer }>
            <Text style={ styles.statusText }>{ resultado }</Text>

            {/* Botão de "Próxima Rodada" que só aparece na fase de resultado. */ }
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
