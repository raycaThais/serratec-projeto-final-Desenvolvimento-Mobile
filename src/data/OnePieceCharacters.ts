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
  // =================================================================
  // TIER S+ (Super Trunfo)
  // =================================================================
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

  // =================================================================
  // TIER S (Lendários, Yonkous & Heróis da Marinha)
  // =================================================================
  {
    malId: 2751,
    group: "whitebeard",
    forca: 98,
    velocidade: 70,
    resistencia: 97,
    inteligencia: 80,
    haki: 98,
    recompensa: 99,
  }, // Whitebeard
  {
    malId: 8064,
    group: "marinha",
    forca: 97,
    velocidade: 88,
    resistencia: 96,
    inteligencia: 85,
    haki: 96,
    recompensa: 0,
  }, // Garp
  {
    malId: 727,
    group: "shanks",
    forca: 96,
    velocidade: 95,
    resistencia: 94,
    inteligencia: 95,
    haki: 99,
    recompensa: 95,
  }, // Shanks
  {
    malId: 3331,
    group: "viloes",
    forca: 97,
    velocidade: 75,
    resistencia: 86,
    inteligencia: 94,
    haki: 65,
    recompensa: 92,
  }, // Blackbeard
  {
    malId: 13018,
    group: "marinha",
    forca: 93,
    velocidade: 80,
    resistencia: 95,
    inteligencia: 95,
    haki: 94,
    recompensa: 0,
  }, // Sengoku
  {
    malId: 17142,
    group: "aliados",
    forca: 94,
    velocidade: 93,
    resistencia: 91,
    inteligencia: 95,
    haki: 96,
    recompensa: 90,
  }, // Rayleigh

  // =================================================================
  // TIER A (Elite - Almirantes, Comandantes & Top Shichibukai)
  // =================================================================
  {
    malId: 22687,
    group: "marinha",
    forca: 94,
    velocidade: 80,
    resistencia: 93,
    inteligencia: 80,
    haki: 92,
    recompensa: 0,
  }, // Akainu
  {
    malId: 2752,
    group: "marinha",
    forca: 92,
    velocidade: 90,
    resistencia: 94,
    inteligencia: 90,
    haki: 91,
    recompensa: 0,
  }, // Aokiji
  {
    malId: 21093,
    group: "marinha",
    forca: 90,
    velocidade: 98,
    resistencia: 88,
    inteligencia: 85,
    haki: 90,
    recompensa: 0,
  }, // Kizaru
  {
    malId: 2064,
    group: "shichibukai",
    forca: 95,
    velocidade: 92,
    resistencia: 90,
    inteligencia: 85,
    haki: 97,
    recompensa: 90,
  }, // Mihawk
  {
    malId: 4882,
    group: "shanks",
    forca: 91,
    velocidade: 86,
    resistencia: 88,
    inteligencia: 92,
    haki: 92,
    recompensa: 85,
  }, // Ben Beckman
  {
    malId: 9323,
    group: "whitebeard",
    forca: 88,
    velocidade: 96,
    resistencia: 98,
    inteligencia: 85,
    haki: 90,
    recompensa: 88,
  }, // Marco
  {
    malId: 2072,
    group: "whitebeard",
    forca: 89,
    velocidade: 88,
    resistencia: 85,
    inteligencia: 75,
    haki: 87,
    recompensa: 77,
  }, // Ace
  {
    malId: 2754,
    group: "shichibukai",
    forca: 87,
    velocidade: 86,
    resistencia: 84,
    inteligencia: 92,
    haki: 88,
    recompensa: 74,
  }, // Doflamingo
  {
    malId: 7453,
    group: "shichibukai",
    forca: 89,
    velocidade: 94,
    resistencia: 98,
    inteligencia: 85,
    haki: 40,
    recompensa: 29,
  }, // Kuma

  // =================================================================
  // TIER B (Fortes ou Promissores)
  // =================================================================
  {
    malId: 21559,
    group: "whitebeard",
    forca: 92,
    velocidade: 70,
    resistencia: 99,
    inteligencia: 75,
    haki: 85,
    recompensa: 70,
  }, // Jozu
  {
    malId: 22618,
    group: "viloes",
    forca: 90,
    velocidade: 50,
    resistencia: 92,
    inteligencia: 80,
    haki: 20,
    recompensa: 0,
  }, // Magellan
  {
    malId: 16342,
    group: "shichibukai",
    forca: 82,
    velocidade: 85,
    resistencia: 78,
    inteligencia: 80,
    haki: 85,
    recompensa: 70,
  }, // Hancock
  {
    malId: 18938,
    group: "aliados",
    forca: 87,
    velocidade: 70,
    resistencia: 90,
    inteligencia: 85,
    haki: 60,
    recompensa: 55,
  }, // Jinbei
  {
    malId: 27202,
    group: "whitebeard",
    forca: 87,
    velocidade: 85,
    resistencia: 84,
    inteligencia: 80,
    haki: 89,
    recompensa: 71,
  }, // Vista
  {
    malId: 5677,
    group: "viloes",
    forca: 88,
    velocidade: 91,
    resistencia: 87,
    inteligencia: 85,
    haki: 15,
    recompensa: 0,
  }, // Rob Lucci
  {
    malId: 1541,
    group: "viloes",
    forca: 80,
    velocidade: 96,
    resistencia: 75,
    inteligencia: 85,
    haki: 70,
    recompensa: 50,
  }, // Enel
  {
    malId: 40,
    group: "mugiwaras",
    forca: 85,
    velocidade: 88,
    resistencia: 86,
    inteligencia: 55,
    haki: 40,
    recompensa: 60,
  }, // Luffy
  {
    malId: 62,
    group: "mugiwaras",
    forca: 82,
    velocidade: 80,
    resistencia: 84,
    inteligencia: 50,
    haki: 10,
    recompensa: 51,
  }, // Zoro
  {
    malId: 2749,
    group: "shichibukai",
    forca: 80,
    velocidade: 75,
    resistencia: 78,
    inteligencia: 94,
    haki: 55,
    recompensa: 71,
  }, // Crocodile
  {
    malId: 9562,
    group: "shanks",
    forca: 80,
    velocidade: 88,
    resistencia: 80,
    inteligencia: 80,
    haki: 89,
    recompensa: 75,
  }, // Yasopp
  {
    malId: 4885,
    group: "shanks",
    forca: 86,
    velocidade: 70,
    resistencia: 89,
    inteligencia: 70,
    haki: 86,
    recompensa: 60,
  }, // Lucky Roux

  // =================================================================
  // TIER C (Potenciais e Vilões de Arcos)
  // =================================================================
  {
    malId: 305,
    group: "mugiwaras",
    forca: 78,
    velocidade: 82,
    resistencia: 78,
    inteligencia: 75,
    haki: 5,
    recompensa: 43,
  }, // Sanji
  {
    malId: 2753,
    group: "marinha",
    forca: 78,
    velocidade: 75,
    resistencia: 82,
    inteligencia: 80,
    haki: 55,
    recompensa: 0,
  }, // Smoker
  {
    malId: 7454,
    group: "shichibukai",
    forca: 78,
    velocidade: 60,
    resistencia: 88,
    inteligencia: 80,
    haki: 41,
    recompensa: 32,
  }, // Moria
  {
    malId: 22646,
    group: "aliados",
    forca: 75,
    velocidade: 80,
    resistencia: 70,
    inteligencia: 85,
    haki: 50,
    recompensa: 10,
  }, // Ivankov
  {
    malId: 64,
    group: "mugiwaras",
    forca: 76,
    velocidade: 65,
    resistencia: 80,
    inteligencia: 85,
    haki: 10,
    recompensa: 24,
  }, // Franky
  {
    malId: 309,
    group: "mugiwaras",
    forca: 75,
    velocidade: 75,
    resistencia: 82,
    inteligencia: 90,
    haki: 2,
    recompensa: 1,
  }, // Chopper
  {
    malId: 5627,
    group: "mugiwaras",
    forca: 70,
    velocidade: 84,
    resistencia: 60,
    inteligencia: 70,
    haki: 20,
    recompensa: 28,
  }, // Brook
  {
    malId: 61,
    group: "mugiwaras",
    forca: 40,
    velocidade: 70,
    resistencia: 70,
    inteligencia: 95,
    haki: 15,
    recompensa: 45,
  }, // Robin
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
    malId: 724,
    group: "mugiwaras",
    forca: 25,
    velocidade: 55,
    resistencia: 40,
    inteligencia: 80,
    haki: 8,
    recompensa: 20,
  }, // Usopp
  {
    malId: 723,
    group: "mugiwaras",
    forca: 30,
    velocidade: 60,
    resistencia: 45,
    inteligencia: 90,
    haki: 5,
    recompensa: 15,
  }, // Nami
  {
    malId: 4887,
    group: "viloes",
    forca: 65,
    velocidade: 70,
    resistencia: 72,
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
];

// Helper function para pegar um personagem específico pelos atributos
export const getCharacterAttributes = (malId: number) => {
  const character = onePieceCharacters.find((char) => char.malId === malId);
  if (!character) return {};

  const { malId: _, group: __, ...attributes } = character;
  return attributes;
};
