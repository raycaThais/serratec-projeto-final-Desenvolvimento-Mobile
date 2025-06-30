import axios from 'axios';

export interface CharacterData {
    name: string;
    imageUrl?: string;
}

interface JikanCharacter {
    character: {
        mal_id: number;
        name: string;
        images: {
            jpg: {
                image_url: string;
            };
        };
    };
}

const API_URL = 'https://api.jikan.moe/v4/anime/21/characters';

/**
 * Busca todos os detalhes dos personagens de One Piece da API Jikan.
 * @returns Um mapa (Record) onde a chave é o ID do personagem (malId)
 * e o valor são os dados do personagem (nome e URL da imagem).
 */
export const fetchAllCharacterDetails = async (): Promise<Record<number, CharacterData>> => {
    try {
        const response = await axios.get<{ data: JikanCharacter[] }>(API_URL);
        const apiCharacters = response.data.data;

        const detailsMap: Record<number, CharacterData> = {};
        for (const item of apiCharacters) {
            const char = item.character;
            detailsMap[char.mal_id] = {
                name: char.name,
                imageUrl: char.images.jpg.image_url,
            };
        }
        return detailsMap;

    } catch (error) {
        console.error("Erro ao buscar dados dos personagens na API:", error);
        return {};
    }
};