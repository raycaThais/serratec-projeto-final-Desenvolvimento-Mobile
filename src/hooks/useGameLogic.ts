import { useState, useCallback, useEffect } from "react";
import {
  onePieceCharacters,
  OnePieceCharacter,
} from "../data/OnePieceCharacters";

export type Atributo = keyof Omit<OnePieceCharacter, "malId" | "group">;
const PONTOS_PARA_VENCER = 5;

export const useGameLogic = () => {
  const [deck, setDeck] = useState<OnePieceCharacter[]>([]);
  const [cartaAtualJogador, setCartaAtualJogador] =
    useState<OnePieceCharacter | null>(null);
  const [cartaAtualBot, setCartaAtualBot] = useState<OnePieceCharacter | null>(
    null
  );
  const [turno, setTurno] = useState<"jogador" | "bot">("jogador");
  const [placarJogador, setPlacarJogador] = useState(0);
  const [placarBot, setPlacarBot] = useState(0);
  const [resultado, setResultado] = useState("");
  const [vencedorRodada, setVencedorRodada] = useState<
    "jogador" | "bot" | "empate" | null
  >(null);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [atributoDisputado, setAtributoDisputado] = useState<Atributo | null>(
    null
  );

  const iniciarPartida = useCallback(() => {
    const baralhoEmbaralhado = [...onePieceCharacters].sort(
      () => Math.random() - 0.5
    );
    const c1 = baralhoEmbaralhado.pop()!;
    const c2 = baralhoEmbaralhado.pop()!;
    setCartaAtualJogador(c1);
    setCartaAtualBot(c2);
    setDeck(baralhoEmbaralhado);
    setPlacarJogador(0);
    setPlacarBot(0);
    setTurno("jogador");
    setResultado("O jogo começou!");
    setVencedorRodada(null);
    setJogoFinalizado(false);
    setAtributoDisputado(null);
  }, []);

  const proximaRodada = useCallback(() => {
    if (deck.length < 2) {
      setJogoFinalizado(true);
      return;
    }
    const novoDeck = [...deck];
    setCartaAtualJogador(novoDeck.pop()!);
    setCartaAtualBot(novoDeck.pop()!);
    setDeck(novoDeck);
    setVencedorRodada(null);
    setAtributoDisputado(null);
    setResultado(turno === "jogador" ? "Sua vez de jogar!" : "Vez do Bot...");
  }, [deck, turno]);

  const compararAtributos = useCallback(
    (atributo: Atributo) => {
      if (!cartaAtualJogador || !cartaAtualBot || jogoFinalizado) return;

      setAtributoDisputado(atributo);
      const valorJogador = cartaAtualJogador[atributo] ?? 0;
      const valorBot = cartaAtualBot[atributo] ?? 0;

      let vencedor: "jogador" | "bot" | "empate";
      if (valorJogador > valorBot) vencedor = "jogador";
      else if (valorBot > valorJogador) vencedor = "bot";
      else vencedor = "empate";

      let novoPlacarJogador = placarJogador;
      let novoPlacarBot = placarBot;
      let proximoTurno = turno;

      if (vencedor === "jogador") {
        novoPlacarJogador++;
        proximoTurno = "jogador";
        setResultado("Você ganhou a rodada!");
      } else if (vencedor === "bot") {
        novoPlacarBot++;
        proximoTurno = "bot";
        setResultado("O Bot ganhou a rodada!");
      } else {
        setResultado("Empate! Ninguém pontua.");
      }

      setPlacarJogador(novoPlacarJogador);
      setPlacarBot(novoPlacarBot);
      setVencedorRodada(vencedor);

      setTimeout(() => {
        setTurno(proximoTurno);
        if (
          novoPlacarJogador >= PONTOS_PARA_VENCER ||
          novoPlacarBot >= PONTOS_PARA_VENCER
        ) {
          setJogoFinalizado(true);
        } else {
          proximaRodada();
        }
      }, 2500); // TEMPO PRA VER RESULTADO
    },
    [
      cartaAtualJogador,
      cartaAtualBot,
      jogoFinalizado,
      placarJogador,
      placarBot,
      proximaRodada,
      turno,
    ]
  );

  const escolherMelhorAtributoBot = useCallback(() => {
    if (!cartaAtualBot) return;
    const atributos = {
      forca: cartaAtualBot.forca || 0,
      velocidade: cartaAtualBot.velocidade || 0,
      resistencia: cartaAtualBot.resistencia || 0,
      inteligencia: cartaAtualBot.inteligencia || 0,
      haki: cartaAtualBot.haki || 0,
      recompensa: cartaAtualBot.recompensa || 0,
    };
    const melhorAtributo = (Object.keys(atributos) as Atributo[]).reduce(
      (a, b) => (atributos[a] > atributos[b] ? a : b)
    );
    compararAtributos(melhorAtributo);
  }, [cartaAtualBot, compararAtributos]);

  useEffect(() => {
    if (turno === "bot" && !vencedorRodada && !jogoFinalizado) {
      const timeoutId = setTimeout(escolherMelhorAtributoBot, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [turno, vencedorRodada, jogoFinalizado, escolherMelhorAtributoBot]);

  return {
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
  };
};
