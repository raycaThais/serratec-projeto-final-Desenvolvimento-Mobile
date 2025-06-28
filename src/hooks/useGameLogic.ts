import { useState, useCallback, useEffect } from "react";
import {
  onePieceCharacters,
  OnePieceCharacter,
} from "../data/OnePieceCharacters";

export type Atributo = keyof Omit<OnePieceCharacter, "malId" | "group">;
const PONTOS_PARA_VENCER = 5;

// ✅ Vamos guardar o vencedor para usar na próxima rodada
let vencedorDaUltimaRodada: "jogador" | "bot" | "empate" = "jogador";

export const useGameLogic = (
  characterData: Record<number, { name: string; imageUrl?: string }> = {}
) => {
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
    setResultado("O jogo começou! Sua vez de jogar.");
    setVencedorRodada(null);
    setJogoFinalizado(false);
    setAtributoDisputado(null);
  }, []);

  // ✅ NOVA FUNÇÃO: Chamada pelo botão para avançar o jogo
  const avancarParaProximaRodada = useCallback(() => {
    // Atualiza o placar
    const novoPlacarJogador =
      placarJogador + (vencedorDaUltimaRodada === "jogador" ? 1 : 0);
    const novoPlacarBot =
      placarBot + (vencedorDaUltimaRodada === "bot" ? 1 : 0);
    setPlacarJogador(novoPlacarJogador);
    setPlacarBot(novoPlacarBot);

    // Verifica se o jogo terminou
    if (
      novoPlacarJogador >= PONTOS_PARA_VENCER ||
      novoPlacarBot >= PONTOS_PARA_VENCER ||
      deck.length < 2
    ) {
      setJogoFinalizado(true);
      return;
    }

    // Define o próximo turno
    const proximoTurno =
      vencedorDaUltimaRodada === "empate" ? turno : vencedorDaUltimaRodada;
    setTurno(proximoTurno);

    // Prepara a nova rodada
    const novoDeck = [...deck];
    setCartaAtualJogador(novoDeck.pop()!);
    setCartaAtualBot(novoDeck.pop()!);
    setDeck(novoDeck);

    // Reseta os estados da rodada
    setVencedorRodada(null);
    setAtributoDisputado(null);
    setResultado(
      proximoTurno === "jogador" ? "Sua vez de jogar!" : "Vez do Bot..."
    );
  }, [deck, placarJogador, placarBot, turno, vencedorDaUltimaRodada]);

  const compararAtributos = useCallback(
    (atributo: Atributo, autorDaJogada: "jogador" | "bot") => {
      if (!cartaAtualJogador || !cartaAtualBot || jogoFinalizado) return;

      const valorJogador = cartaAtualJogador[atributo] ?? 0;
      const valorBot = cartaAtualBot[atributo] ?? 0;

      const nomeJogador =
        characterData[cartaAtualJogador.malId]?.name || "Jogador";
      const nomeBot = characterData[cartaAtualBot.malId]?.name || "Bot";

      let vencedor: "jogador" | "bot" | "empate";
      let textoResultado = "";

      const nomeAtributo = atributo.charAt(0).toUpperCase() + atributo.slice(1);
      const textoComparacao = `${nomeAtributo}: ${nomeJogador} (${valorJogador}) vs ${nomeBot} (${valorBot}).`;

      if (valorJogador > valorBot) {
        vencedor = "jogador";
        textoResultado = `${textoComparacao} Você ganhou a rodada!`;
      } else if (valorBot > valorJogador) {
        vencedor = "bot";
        textoResultado = `${textoComparacao} O Bot ganhou a rodada!`;
      } else {
        vencedor = "empate";
        textoResultado = `${textoComparacao} Empate!`;
      }

      // ✅ A MÁGICA ACONTECE AQUI:
      // Atualizamos tudo de uma vez para sincronizar a UI
      vencedorDaUltimaRodada = vencedor;
      setAtributoDisputado(atributo); // Revela as cartas e o overlay
      setResultado(textoResultado); // Mostra o resultado final
      setVencedorRodada(vencedor); // Libera o botão "Confirmar"

      // ✅ REMOVEMOS O SETTIMEOUT DAQUI. O jogo agora espera o botão.
    },
    [cartaAtualJogador, cartaAtualBot, jogoFinalizado, characterData]
  );

  const escolherMelhorAtributoBot = useCallback(() => {
    if (!cartaAtualBot) return;

    setResultado("Vez do Bot... Ele está escolhendo um atributo.");

    setTimeout(() => {
      // Apenas um delay para simular o "pensamento"
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

      // Chama a comparação. A mensagem de resultado será gerada lá dentro.
      compararAtributos(melhorAtributo, "bot");
    }, 1500);
  }, [cartaAtualBot, compararAtributos]);

  useEffect(() => {
    // Inicia a jogada do bot apenas se a rodada não tiver um vencedor ainda
    if (turno === "bot" && !vencedorRodada && !jogoFinalizado) {
      escolherMelhorAtributoBot();
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
    avancarParaProximaRodada, // ✅ Exportamos a nova função
  };
};
