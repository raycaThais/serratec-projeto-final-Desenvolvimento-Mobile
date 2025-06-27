import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

// import lógica AQUIIII 
import { onePieceCharacters, OnePieceCharacter } from '../../data/OnePieceCharacters';

import { GameHand } from '../../components/GameHand/GameHand';
import { ExpandableCardOverlay } from '../../components/ExpandableCardOverlay/ExpandableCardOverlay';
import GameOverModal from '../../components/GameOverModal/GameOverModal';
import MiniCharacterCard from '../../components/MiniCharacterCard';
import GameScreenStyles from './GameScreenStyles';

export type CardData = OnePieceCharacter & { name: string; imageUrl?: string };

export default function GameScreen() {
  const navigation = useNavigation();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [characterData, setCharacterData] = useState<Record<number, { name: string; imageUrl: string }>>({});
  const [loading, setLoading] = useState(true);

  // Estados de UI
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [botDeclaredMove, setBotDeclaredMove] = useState<{ card: OnePieceCharacter; attribute: Attribute } | null>(null);
  const [duelData, setDuelData] = useState<{ playerCard: CardData; botCard: CardData; attribute: Attribute; winner: PlayerType | 'draw' } | null>(null);
  const [message, setMessage] = useState('Embaralhando as cartas...');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data: Record<number, { name: string; imageUrl: string }> = {};
      try {
        const res = await axios.get('https://api.jikan.moe/v4/anime/21/characters');
        for (const char of onePieceCharacters) {
          const found = res.data.data.find((c: any) => c.character.mal_id === char.malId);
          data[char.malId] = {
            name: found?.character.name || `Personagem ${char.malId}`,
            imageUrl: found?.character.images.jpg.image_url || '',
          };
        }
      } catch (error) {
        console.warn("API do Jikan falhou, usando dados locais.");
        for (const char of onePieceCharacters) {
          data[char.malId] = { name: `Personagem ${char.malId}`, imageUrl: '' };
        }
      }
      setCharacterData(data);
      setGameState(startNewGame());
      setLoading(false);
      setMessage('Sua vez! Escolha uma carta e um atributo.');
    }
    fetchData();
  }, []);

  const toCardData = useCallback((char: OnePieceCharacter): CardData => ({
    ...char,
    name: characterData[char.malId]?.name || 'Desconhecido',
    imageUrl: characterData[char.malId]?.imageUrl,
  }), [characterData]);

  const processRoundEnd = (newState: GameState, winner: PlayerType | 'draw') => {
    setDuelData(null);
    setGameState(newState);
    if (newState.gameWinner) {
      setMessage(newState.gameWinner === 'player' ? 'Você venceu o jogo!' : 'Você perdeu!');
    } else {
      const winnerMessage = winner === 'player' ? 'Você ganhou!' : winner === 'bot' ? 'O Bot ganhou.' : 'Empate!';
      const nextTurnMessage = newState.turn === 'player' ? 'Sua vez de escolher.' : 'Vez do Bot...';
      setMessage(`${winnerMessage} ${nextTurnMessage}`);
    }
  };

  const handlePlayerSelectsAttribute = (attribute: Attribute) => {
    if (!gameState || !selectedCard) return;

    const botCardToPlay = gameState.bot.hand[0];
    if (!botCardToPlay) return;

    const { newState, winner } = playRound(gameState, selectedCard, botCardToPlay, attribute);

    setDuelData({
      playerCard: toCardData(selectedCard),
      botCard: toCardData(botCardToPlay),
      attribute,
      winner
    });
    setSelectedCard(null);

    setTimeout(() => processRoundEnd(newState, winner), 3000);
  };

  const handlePlayerConfirmsCard = () => {
    if (!gameState || !selectedCard || !botDeclaredMove) return;

    const { newState, winner } = playRound(gameState, selectedCard, botDeclaredMove.card, botDeclaredMove.attribute);

    setDuelData({
      playerCard: toCardData(selectedCard),
      botCard: toCardData(botDeclaredMove.card),
      attribute: botDeclaredMove.attribute,
      winner
    });
    setBotDeclaredMove(null);
    setSelectedCard(null);

    setTimeout(() => processRoundEnd(newState, winner), 3000);
  }

  const handlePlayerSelectsCard = (card: CardData) => {
    if (!gameState || duelData) return;

    if (gameState.turn === 'player') {
      setSelectedCard(card);
    } else if (gameState.turn === 'bot' && botDeclaredMove) {
      // No turno do bot, a seleção de carta abre a tela de confirmação
      setSelectedCard(card);
    }
  }

  useEffect(() => {
    if (gameState?.turn === 'bot' && !duelData && !botDeclaredMove && !gameState.gameWinner) {
      const botTurnTimeout = setTimeout(() => {
        if (!gameState || gameState.bot.hand.length === 0) return;

        const move = getBotMove(gameState.bot.hand);
        setBotDeclaredMove(move);
        const cardName = characterData[move.card.malId]?.name || 'uma carta';
        setMessage(`Bot jogou ${cardName} e escolheu ${move.attribute.toUpperCase()}! Escolha sua carta.`);

      }, 1500);

      return () => clearTimeout(botTurnTimeout);
    }
  }, [gameState, duelData, botDeclaredMove, characterData]);

  // **ESTA É A VERIFICAÇÃO PRINCIPAL QUE RESOLVE OS ERROS DE TIPO NULO**
  if (loading || !gameState) {
    return (
      <View style={ GameScreenStyles.loadingContainer }>
        <ActivityIndicator size="large" color="#f5b942" />
        <Text style={ GameScreenStyles.loadingText }>{ message }</Text>
      </View>
    );
  }

  // A partir daqui, gameState nunca será nulo
  const { player, bot, turn, playerScore, botScore, gameWinner } = gameState;
  const playerHand = player.hand.map(toCardData);

  return (
    <ImageBackground source={ require('../../../assets/table-bg.png') } style={ GameScreenStyles.mainContainer } resizeMode="cover">
      <View style={ GameScreenStyles.absoluteScoreBar }>
        <View style={ GameScreenStyles.scoreBar }>
          <Text style={ GameScreenStyles.scoreText }>VOCÊ: { playerScore }</Text>
          <Text style={ GameScreenStyles.roundsText }>| Cartas: { player.hand.length } |</Text>
          <Text style={ GameScreenStyles.scoreText }>BOT: { botScore }</Text>
        </View>
      </View>

      <View style={ GameScreenStyles.botPlayArea }>
        { botDeclaredMove && !duelData && (
          <Animatable.View animation="fadeInDown">
            <MiniCharacterCard
              { ...toCardData(botDeclaredMove.card) }
              cardWidth={ 100 }
              cardHeight={ 138 }
            />
          </Animatable.View>
        ) }
      </View>

      <View style={ GameScreenStyles.messageContainer }>
        <Text style={ GameScreenStyles.messageText }>{ message }</Text>
      </View>

      { duelData && (
        <DuelAnimation
          playerCard={ duelData.playerCard }
          botCard={ duelData.botCard }
          winner={ duelData.winner }
          duelAttribute={ duelData.attribute }
          onAnimationEnd={ () => { } }
        />
      ) }

      { !duelData && (
        <GameHand
          cards={ playerHand }
          onSelectCard={ handlePlayerSelectsCard }
        />
      ) }

      { selectedCard && (
        <ExpandableCardOverlay
          visible={ !!selectedCard }
          card={ selectedCard }
          onSelectAttribute={ handlePlayerSelectsAttribute }
          onConfirm={ handlePlayerConfirmsCard }
          isConfirmationOnly={ turn === 'bot' }
          onClose={ () => setSelectedCard(null) }
        />
      ) }

      { gameWinner && (
        <GameOverModal
          visible={ !!gameWinner }
          result={ gameWinner === 'player' ? 'win' : 'lose' }
          onClose={ () => navigation.goBack() }
        />
      ) }
    </ImageBackground>
  );
}