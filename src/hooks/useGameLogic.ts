import { useState, useCallback, useEffect } from "react";
import {
  onePieceCharacters,
  OnePieceCharacter,
} from "../data/OnePieceCharacters";

// Define o tipo 'Atributo' para garantir que apenas chaves válidas de um personagem sejam usadas.
// Omite 'malId' e 'group'.
export type Atributo = keyof Omit<OnePieceCharacter, "malId" | "group">;

// Pontuação necessária para vencer a partida.
const PONTOS_PARA_VENCER = 5;

// Variável externa ao hook para armazenar o vencedor da última rodada.
// No 'Jogo.tsx' original, essa lógica era gerenciada pelo estado 'vezJogador' e pela passagem de cartas.
let vencedorDaUltimaRodada: "jogador" | "bot" | "empate" = "jogador";

/**
 * Hook customizado que encapsula toda a lógica do jogo de Super Trunfo.
 * Ele gerencia o estado do jogo (deck, placar, turno) e expõe funções para interagir com ele.
 * @param characterData - Um objeto com dados dos personagens (nome, imagem) vindos de uma API externa.
 */
export const useGameLogic = (
  characterData: Record<number, { name: string; imageUrl?: string }> = {}
) => {
  // --- ESTADOS DO JOGO ---
  // Estes estados controlam o fluxo e os dados do jogo. No 'Jogo.tsx' original,
  // tínhamos estados separados para 'cartasJogador' e 'cartasBot'.
  // O modelo atual é mais simples: um único deck e um placar de pontos.

  const [deck, setDeck] = useState<OnePieceCharacter[]>([]); // Armazena o baralho principal.
  const [cartaAtualJogador, setCartaAtualJogador] =
    useState<OnePieceCharacter | null>(null); // A carta visível do jogador.
  const [cartaAtualBot, setCartaAtualBot] = useState<OnePieceCharacter | null>(
    null
  ); // A carta visível do bot.
  const [turno, setTurno] = useState<"jogador" | "bot">("jogador"); // Controla de quem é a vez de jogar.
  const [placarJogador, setPlacarJogador] = useState(0); // Pontuação do jogador.
  const [placarBot, setPlacarBot] = useState(0); // Pontuação do bot.
  const [resultado, setResultado] = useState(""); // Mensagem de status exibida na tela.
  const [vencedorRodada, setVencedorRodada] = useState<
    "jogador" | "bot" | "empate" | null
  >(null); // Controla a fase de resultado da rodada e a exibição do botão "Próxima Rodada".
  const [jogoFinalizado, setJogoFinalizado] = useState(false); // Indica se a partida acabou.
  const [atributoDisputado, setAtributoDisputado] = useState<Atributo | null>(
    null
  ); // Armazena qual atributo foi escolhido para a comparação na rodada.

  /**
   * Reseta e inicia uma nova partida.
   * Equivalente ao 'iniciarPartida' e 'dividirCartas' do 'Jogo.tsx'.
   * A lógica foi simplificada: em vez de dividir o baralho em duas mãos,
   * ele embaralha e tira as duas primeiras cartas, uma para cada jogador.
   */
  const iniciarPartida = useCallback(() => {
    const baralhoEmbaralhado = [...onePieceCharacters].sort(
      () => Math.random() - 0.5
    );
    setCartaAtualJogador(baralhoEmbaralhado.pop()!);
    setCartaAtualBot(baralhoEmbaralhado.pop()!);
    setDeck(baralhoEmbaralhado);
    setPlacarJogador(0);
    setPlacarBot(0);
    setTurno("jogador");
    setResultado("O jogo começou! Sua vez de jogar.");
    setVencedorRodada(null);
    setJogoFinalizado(false);
    setAtributoDisputado(null);
  }, []);

  /**
   * Função chamada pelo botão "Próxima Rodada" na interface.
   * Esta função é uma das principais melhorias em relação ao 'Jogo.tsx', que avançava
   * automaticamente com 'setTimeout'. Dar o controle ao jogador melhora a experiência.
   */
  const avancarParaProximaRodada = useCallback(() => {
    // 1. Atualiza o placar com base no resultado da rodada que acabou de terminar.
    const novoPlacarJogador =
      placarJogador + (vencedorDaUltimaRodada === "jogador" ? 1 : 0);
    const novoPlacarBot =
      placarBot + (vencedorDaUltimaRodada === "bot" ? 1 : 0);
    setPlacarJogador(novoPlacarJogador);
    setPlacarBot(novoPlacarBot);

    // 2. Verifica se o jogo terminou por pontuação ou por falta de cartas.
    if (
      novoPlacarJogador >= PONTOS_PARA_VENCER ||
      novoPlacarBot >= PONTOS_PARA_VENCER ||
      deck.length < 2
    ) {
      setJogoFinalizado(true);
      return;
    }

    // 3. Define quem joga na próxima rodada. Se empatou, o turno não muda.
    const proximoTurno =
      vencedorDaUltimaRodada === "empate" ? turno : vencedorDaUltimaRodada;
    setTurno(proximoTurno);

    // 4. Puxa novas cartas do baralho para os jogadores.
    const novoDeck = [...deck];
    setCartaAtualJogador(novoDeck.pop()!);
    setCartaAtualBot(novoDeck.pop()!);
    setDeck(novoDeck);

    // 5. Reseta os estados da rodada para prepará-la para a próxima jogada.
    setVencedorRodada(null);
    setAtributoDisputado(null);
    setResultado(
      proximoTurno === "jogador" ? "Sua vez de jogar!" : "Vez do Bot..."
    );
  }, [deck, placarJogador, placarBot, turno]);

  /**
   * Compara o atributo escolhido entre a carta do jogador e a do bot.
   * Esta função centraliza a lógica de vitória/derrota da rodada, que no 'Jogo.tsx'
   * estava mais espalhada e continha 'setTimeout's.
   * @param atributo O atributo a ser comparado (ex: 'forca').
   * @param autorDaJogada Quem iniciou a jogada.
   */
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

      // A "mágica" acontece aqui: atualizamos todos os estados relevantes de uma só vez.
      // Isso garante que a UI (interface) reaja de forma sincronizada, mostrando o resultado,
      // a carta do bot e o botão "Próxima Rodada" ao mesmo tempo.
      vencedorDaUltimaRodada = vencedor;
      setAtributoDisputado(atributo); // Dispara a revelação das cartas e do overlay.
      setResultado(textoResultado); // Mostra o texto final do resultado.
      setVencedorRodada(vencedor); // Libera a exibição do botão de avançar.
    },
    [cartaAtualJogador, cartaAtualBot, jogoFinalizado, characterData]
  );

  /**
   * Lógica de "IA" do bot. Ele simplesmente escolhe o atributo com o maior valor em sua carta atual.
   * Funcionalmente idêntico ao 'escolherMelhorAtributo' do 'Jogo.tsx', mas integrado ao novo fluxo.
   */
  const escolherMelhorAtributoBot = useCallback(() => {
    if (!cartaAtualBot) return;

    setResultado("Vez do Bot... Ele está escolhendo um atributo.");

    // Um pequeno delay para simular o "pensamento" do bot.
    setTimeout(() => {
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

      // Em vez de gerar a mensagem aqui, ele chama a função de comparação,
      // que agora é responsável por gerar o texto de resultado final.
      compararAtributos(melhorAtributo, "bot");
    }, 1500);
  }, [cartaAtualBot, compararAtributos]);

  /**
   * Efeito que funciona como o "motor" do turno do bot.
   * Ele "escuta" as mudanças nas variáveis 'turno' e 'vencedorRodada'.
   * Se for a vez do bot E a rodada ainda não tiver um vencedor, ele inicia a jogada do bot.
   * Isso é mais eficiente que o useEffect do 'Jogo.tsx' que dependia apenas de 'vezJogador'.
   */
  useEffect(() => {
    if (turno === "bot" && !vencedorRodada && !jogoFinalizado) {
      escolherMelhorAtributoBot();
    }
  }, [turno, vencedorRodada, jogoFinalizado, escolherMelhorAtributoBot]);

  // O hook retorna um objeto com todos os estados e funções que a interface precisa para funcionar.
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
    avancarParaProximaRodada,
  };
};
