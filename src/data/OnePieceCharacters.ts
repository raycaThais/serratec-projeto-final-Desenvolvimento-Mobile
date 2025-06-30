// Interface para definir a estrutura de um personagem
export interface OnePieceCharacter {
  malId: number;
  group: string;
  forca?: number;
  velocidade?: number;
  resistencia?: number;
  inteligencia?: number;
  haki?: number;
  recompensa?: number;
}

// Array unificado com todos os personagens e seus atributos
export const onePieceCharacters: OnePieceCharacter[] = [
  // Mugiwaras
  {
    malId: 40,
    group: "mugiwaras",
    forca: 95,
    velocidade: 90,
    resistencia: 92,
    inteligencia: 55,
    haki: 90,
    recompensa: 60,
  }, // Luffy
  {
    malId: 62,
    group: "mugiwaras",
    forca: 92,
    velocidade: 88,
    resistencia: 90,
    inteligencia: 50,
    haki: 65,
    recompensa: 51,
  }, // Zoro
  {
    malId: 723,
    group: "mugiwaras",
    forca: 30,
    velocidade: 60,
    resistencia: 45,
    inteligencia: 85,
    haki: 20,
    recompensa: 15,
  }, // Nami
  {
    malId: 724,
    group: "mugiwaras",
    forca: 25,
    velocidade: 55,
    resistencia: 40,
    inteligencia: 80,
    haki: 25,
    recompensa: 20,
  }, // Usopp
  {
    malId: 305,
    group: "mugiwaras",
    forca: 85,
    velocidade: 90,
    resistencia: 80,
    inteligencia: 75,
    haki: 50,
    recompensa: 33,
  }, // Sanji
  {
    malId: 309,
    group: "mugiwaras",
    forca: 70,
    velocidade: 75,
    resistencia: 85,
    inteligencia: 90,
    haki: 2,
    recompensa: 1,
  }, // Chopper
  {
    malId: 61,
    group: "mugiwaras",
    forca: 75,
    velocidade: 70,
    resistencia: 70,
    inteligencia: 95,
    haki: 20,
    recompensa: 43,
  }, // Robin
  {
    malId: 64,
    group: "mugiwaras",
    forca: 88,
    velocidade: 65,
    resistencia: 95,
    inteligencia: 85,
    haki: 10,
    recompensa: 24,
  }, // Franky
  {
    malId: 5627,
    group: "mugiwaras",
    forca: 75,
    velocidade: 85,
    resistencia: 60,
    inteligencia: 70,
    haki: 34,
    recompensa: 28,
  }, // Brook

  // Marinha
  {
    malId: 13018,
    group: "marinha",
    forca: 90,
    velocidade: 70,
    resistencia: 88,
    inteligencia: 95,
    haki: 75,
    recompensa: 0,
  }, // Sengoku
  {
    malId: 8064,
    group: "marinha",
    forca: 95,
    velocidade: 80,
    resistencia: 92,
    inteligencia: 85,
    haki: 95,
    recompensa: 0,
  }, // Garp
  {
    malId: 22687,
    group: "marinha",
    forca: 92,
    velocidade: 75,
    resistencia: 90,
    inteligencia: 80,
    haki: 68,
    recompensa: 0,
  }, // Akainu
  {
    malId: 2752,
    group: "marinha",
    forca: 88,
    velocidade: 60,
    resistencia: 95,
    inteligencia: 90,
    haki: 65,
    recompensa: 0,
  }, // Aokiji
  {
    malId: 21093,
    group: "marinha",
    forca: 85,
    velocidade: 98,
    resistencia: 80,
    inteligencia: 85,
    haki: 60,
    recompensa: 0,
  }, // Kizaru
  {
    malId: 2753,
    group: "marinha",
    forca: 80,
    velocidade: 75,
    resistencia: 85,
    inteligencia: 80,
    haki: 55,
    recompensa: 0,
  }, // Smoker

  // Aliados

  {
    malId: 17142,
    group: "aliados",
    forca: 85,
    velocidade: 80,
    resistencia: 80,
    inteligencia: 95,
    haki: 95,
    recompensa: 90,
  }, // Rayleigh
  {
    malId: 22646,
    group: "aliados",
    forca: 75,
    velocidade: 80,
    resistencia: 70,
    inteligencia: 85,
    haki: 10,
    recompensa: 10,
  }, // Ivankov
  {
    malId: 4875,
    group: "aliados",
    forca: 70,
    velocidade: 85,
    resistencia: 75,
    inteligencia: 80,
    haki: 9,
    recompensa: 32,
  }, // Bon Clay
  {
    malId: 18938,
    group: "aliados",
    forca: 88,
    velocidade: 70,
    resistencia: 95,
    inteligencia: 85,
    haki: 11,
    recompensa: 43,
  }, // Jinbei

  // Shichibukai
  {
    malId: 7453,
    group: "shichibukai",
    forca: 90,
    velocidade: 70,
    resistencia: 95,
    inteligencia: 85,
    haki: 40,
    recompensa: 29,
  }, // Kuma
  {
    malId: 7454,
    group: "shichibukai",
    forca: 85,
    velocidade: 60,
    resistencia: 90,
    inteligencia: 80,
    haki: 41,
    recompensa: 32,
  }, // Moria
  {
    malId: 2754,
    group: "shichibukai",
    forca: 88,
    velocidade: 85,
    resistencia: 80,
    inteligencia: 90,
    haki: 70,
    recompensa: 74,
  }, // Doflamingo
  {
    malId: 2749,
    group: "shichibukai",
    forca: 85,
    velocidade: 75,
    resistencia: 80,
    inteligencia: 95,
    haki: 55,
    recompensa: 71,
  }, // Crocodile
  {
    malId: 16342,
    group: "shichibukai",
    forca: 80,
    velocidade: 85,
    resistencia: 75,
    inteligencia: 80,
    haki: 60,
    recompensa: 70,
  }, // Hancock
  {
    malId: 2064,
    group: "shichibukai",
    forca: 95,
    velocidade: 90,
    resistencia: 80,
    inteligencia: 85,
    haki: 82,
    recompensa: 90,
  }, // Mihawk

  // Vilões
  {
    malId: 1541,
    group: "viloes",
    forca: 70,
    velocidade: 95,
    resistencia: 75,
    inteligencia: 85,
    haki: 50,
    recompensa: 50,
  }, // Enel
  {
    malId: 5677,
    group: "viloes",
    forca: 90,
    velocidade: 95,
    resistencia: 85,
    inteligencia: 85,
    haki: 42,
    recompensa: 0,
  }, // Rob Lucci
  {
    malId: 22618,
    group: "viloes",
    forca: 80,
    velocidade: 50,
    resistencia: 95,
    inteligencia: 80,
    haki: 20,
    recompensa: 0,
  }, // Magellan
  {
    malId: 4887,
    group: "viloes",
    forca: 75,
    velocidade: 70,
    resistencia: 80,
    inteligencia: 60,
    haki: 10,
    recompensa: 20,
  }, // Arlong
  {
    malId: 725,
    group: "viloes",
    forca: 40,
    velocidade: 60,
    resistencia: 50,
    inteligencia: 70,
    haki: 5,
    recompensa: 15,
  }, // Buggy

  // Shanks crew
  {
    malId: 727,
    group: "shanks",
    forca: 95,
    velocidade: 90,
    resistencia: 90,
    inteligencia: 95,
    haki: 98,
    recompensa: 95,
  }, // Shanks
  {
    malId: 4882,
    group: "shanks",
    forca: 88,
    velocidade: 80,
    resistencia: 85,
    inteligencia: 90,
    haki: 85,
    recompensa: 85,
  }, // Ben Beckman
  {
    malId: 9562,
    group: "shanks",
    forca: 70,
    velocidade: 75,
    resistencia: 70,
    inteligencia: 80,
    haki: 75,
    recompensa: 75,
  }, // Yasopp
  {
    malId: 4885,
    group: "shanks",
    forca: 80,
    velocidade: 60,
    resistencia: 90,
    inteligencia: 70,
    haki: 70,
    recompensa: 60,
  }, // Lucky Roux

  // Whitebeard crew
  {
    malId: 2751,
    group: "whitebeard",
    forca: 98,
    velocidade: 70,
    resistencia: 95,
    inteligencia: 90,
    haki: 95,
    recompensa: 99,
  }, // Whitebeard
  {
    malId: 9323,
    group: "whitebeard",
    forca: 85,
    velocidade: 95,
    resistencia: 80,
    inteligencia: 85,
    haki: 80,
    recompensa: 88,
  }, // Marco
  {
    malId: 2072,
    group: "whitebeard",
    forca: 90,
    velocidade: 85,
    resistencia: 85,
    inteligencia: 75,
    haki: 85,
    recompensa: 77,
  }, // Ace
  {
    malId: 21559,
    group: "whitebeard",
    forca: 90,
    velocidade: 70,
    resistencia: 98,
    inteligencia: 75,
    haki: 80,
    recompensa: 70,
  }, // Jozu
  {
    malId: 27202,
    group: "whitebeard",
    forca: 88,
    velocidade: 85,
    resistencia: 80,
    inteligencia: 80,
    haki: 85,
    recompensa: 71,
  }, // Vista

  // Roger
  {
    malId: 4883,
    group: "roger",
    forca: 100,
    velocidade: 100,
    resistencia: 100,
    inteligencia: 100,
    haki: 100,
    recompensa: 100,
  }, // Gol D. Roger
];

// Helper function para pegar um personagem específico pelos atributos
export const getCharacterAttributes = (malId: number) => {
  const character = onePieceCharacters.find((char) => char.malId === malId);
  if (!character) return {};

  const { malId: _, group: __, ...attributes } = character;
  return attributes;
};
