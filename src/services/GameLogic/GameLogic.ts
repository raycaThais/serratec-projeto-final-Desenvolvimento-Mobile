import { OnePieceCharacter } from "../../data/OnePieceCharacters";

// Define um tipo para os atributos que podem ser comparados.
export type Atributo = keyof Omit<
  OnePieceCharacter,
  "malId" | "group" | "nome"
>;

/**
 * Embaralha e divide o baralho inicial para os dois jogadores.
 * @param baralhoCompleto O array de todas as cartas do jogo.
 * @returns Um objeto com os baralhos do jogador e do bot.
 */
export const dividirCartas = (baralhoCompleto: OnePieceCharacter[]) => {
  const baralhoEmbaralhado = [...baralhoCompleto].sort(
    () => Math.random() - 0.5
  );
  const metade = Math.ceil(baralhoEmbaralhado.length / 2);

  const cartasJogador = baralhoEmbaralhado.slice(0, metade);
  const cartasBot = baralhoEmbaralhado.slice(metade);

  return { cartasJogador, cartasBot };
};

/**
 * Compara os atributos e determina o vencedor da rodada.
 * @param cartaJogador - A carta atual do jogador.
 * @param cartaBot - A carta atual do bot.
 * @param atributo - O atributo a ser comparado.
 * @returns O vencedor da rodada ('jogador', 'bot' ou 'empate').
 */
export const compararAtributos = (
  cartaJogador: OnePieceCharacter,
  cartaBot: OnePieceCharacter,
  atributo: Atributo
): "jogador" | "bot" | "empate" => {
  const valorJogador = cartaJogador[atributo] || 0;
  const valorBot = cartaBot[atributo] || 0;

  if (valorJogador > valorBot) {
    return "jogador";
  }
  if (valorBot > valorJogador) {
    return "bot";
  }
  return "empate";
};

/**
 * Lógica para o bot escolher seu melhor atributo.
 * @param carta - A carta do bot.
 * @returns O nome do melhor atributo.
 */
export const escolherMelhorAtributo = (carta: OnePieceCharacter): Atributo => {
  const atributos: Atributo[] = [
    "forca",
    "velocidade",
    "resistencia",
    "inteligencia",
    "haki",
    "recompensa",
  ];
  let melhorAtributo: Atributo = "forca";
  let maiorValor = -1; // Inicia com -1 para garantir que o primeiro atributo seja pego

  for (const attr of atributos) {
    const valor = carta[attr] || 0;
    if (valor > maiorValor) {
      maiorValor = valor;
      melhorAtributo = attr;
    }
  }
  return melhorAtributo;
};

/**
 * **(VERSÃO CORRIGIDA)**
 * Processa o resultado de uma rodada, atualizando os baralhos e a pilha de empate.
 * Esta função agora remove as cartas jogadas e as redistribui corretamente.
 * @param vencedor - O vencedor da rodada ('jogador', 'bot', ou 'empate').
 * @param baralhoJogadorAtual - Baralho completo do jogador ANTES da rodada.
 * @param baralhoBotAtual - Baralho completo do bot ANTES da rodada.
 * @param cartaJogadaPeloJogador - A carta que o jogador usou.
 * @param cartaJogadaPeloBot - A carta que o bot usou.
 * @param pilhaEmpateAtual - As cartas na pilha de empate ANTES da rodada.
 * @returns Um objeto com os novos `cartasJogador`, `cartasBot` e `pilhaCartasEmpate`.
 */
export const atualizarBaralhosAposRodada = (
  vencedor: "jogador" | "bot" | "empate",
  baralhoJogadorAtual: OnePieceCharacter[],
  baralhoBotAtual: OnePieceCharacter[],
  cartaJogadaPeloJogador: OnePieceCharacter,
  cartaJogadaPeloBot: OnePieceCharacter,
  pilhaEmpateAtual: OnePieceCharacter[]
) => {
  // 1. Remove as cartas jogadas dos baralhos.
  const novoBaralhoJogador = baralhoJogadorAtual.filter(
    (c) => c.malId !== cartaJogadaPeloJogador.malId
  );
  const novoBaralhoBot = baralhoBotAtual.filter(
    (c) => c.malId !== cartaJogadaPeloBot.malId
  );

  // 2. Agrupa as cartas que irão para o vencedor ou para a pilha de empate.
  const cartasDaMesa = [
    cartaJogadaPeloJogador,
    cartaJogadaPeloBot,
    ...pilhaEmpateAtual,
  ];

  // 3. Distribui as cartas com base no resultado.
  if (vencedor === "jogador") {
    return {
      cartasJogador: [...novoBaralhoJogador, ...cartasDaMesa],
      cartasBot: novoBaralhoBot,
      pilhaCartasEmpate: [], // Limpa a pilha de empate
    };
  } else if (vencedor === "bot") {
    return {
      cartasJogador: novoBaralhoJogador,
      cartasBot: [...novoBaralhoBot, ...cartasDaMesa],
      pilhaCartasEmpate: [], // Limpa a pilha de empate
    };
  } else {
    // Empate
    return {
      cartasJogador: novoBaralhoJogador,
      cartasBot: novoBaralhoBot,
      pilhaCartasEmpate: cartasDaMesa, // Acumula as cartas na pilha
    };
  }
};
