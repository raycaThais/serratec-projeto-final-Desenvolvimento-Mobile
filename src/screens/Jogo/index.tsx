import { useEffect, useState, useCallback } from "react";
import { OnePieceCharacter, onePieceCharacters } from "../../data/OnePieceCharacters";

// A função agora se chama `useGameLogic` (convenção de hook)
export const useGameLogic = () => {
    const [maoJogador, setMaoJogador] = useState<OnePieceCharacter[]>([]);
    const [maoBot, setMaoBot] = useState<OnePieceCharacter[]>([]);
    const [turno, setTurno] = useState<'jogador' | 'bot'>('jogador');
    const [resultado, setResultado] = useState<string>("");
    const [pilhaEmpate, setPilhaEmpate] = useState<OnePieceCharacter[]>([]);
    const [vencedorRodada, setVencedorRodada] = useState<'jogador' | 'bot' | 'empate' | null>(null);

    // Função para iniciar/reiniciar a partida
    const iniciarPartida = useCallback(() => {
        const baralhoEmbaralhado = [...onePieceCharacters].sort(() => Math.random() - 0.5);
        const metade = Math.ceil(baralhoEmbaralhado.length / 2);

        setMaoJogador(baralhoEmbaralhado.slice(0, metade));
        setMaoBot(baralhoEmbaralhado.slice(metade));
        setTurno('jogador');
        setPilhaEmpate([]);
        setResultado("Sua vez de jogar!");
    }, []);

    const escolherMelhorAtributo = (carta: OnePieceCharacter) => {
        const atributos = {
            forca: carta.forca || 0,
            velocidade: carta.velocidade || 0,
            resistencia: carta.resistencia || 0,
            inteligencia: carta.inteligencia || 0,
            haki: carta.haki || 0,
            recompensa: carta.recompensa || 0
        };
        return Object.keys(atributos).reduce((a, b) => atributos[a as keyof typeof atributos] > atributos[b as keyof typeof atributos] ? a : b) as keyof typeof atributos;
    };

    // Função principal que processa a rodada
    const jogarRodada = useCallback((atributo: keyof Omit<OnePieceCharacter, 'malId' | 'group'>) => {
        if (maoJogador.length === 0 || maoBot.length === 0) return;

        const cartaJogador = maoJogador[0];
        const cartaBot = maoBot[0];

        const valorJogador = cartaJogador[atributo] || 0;
        const valorBot = cartaBot[atributo] || 0;

        const cartasDaRodada = [cartaJogador, cartaBot, ...pilhaEmpate];

        // Remove as cartas de cima das mãos
        const novaMaoJogador = maoJogador.slice(1);
        const novaMaoBot = maoBot.slice(1);

        if (valorJogador > valorBot) {
            setMaoJogador([...novaMaoJogador, ...cartasDaRodada]);
            setMaoBot(novaMaoBot);
            setResultado("Você ganhou a rodada!");
            setTurno('jogador');
            setVencedorRodada('jogador');
            setPilhaEmpate([]);
        } else if (valorBot > valorJogador) {
            setMaoBot([...novaMaoBot, ...cartasDaRodada]);
            setMaoJogador(novaMaoJogador);
            setResultado("O Bot ganhou a rodada!");
            setTurno('bot');
            setVencedorRodada('bot');
            setPilhaEmpate([]);
        } else {
            setPilhaEmpate(cartasDaRodada);
            setMaoJogador(novaMaoJogador);
            setMaoBot(novaMaoBot);
            setResultado("Empate! As cartas foram para a pilha.");
            // O turno não muda em caso de empate
            setVencedorRodada('empate');
        }
    }, [maoJogador, maoBot, pilhaEmpate]);

    // Efeito para a jogada automática do BOT
    useEffect(() => {
        if (turno === 'bot' && maoBot.length > 0) {
            const timeoutId = setTimeout(() => {
                const cartaDoBot = maoBot[0];
                const atributoEscolhido = escolherMelhorAtributo(cartaDoBot);
                jogarRodada(atributoEscolhido);
            }, 2000); // Espera 2 segundos para o bot jogar
            return () => clearTimeout(timeoutId);
        }
    }, [turno, maoBot, jogarRodada]);

    // Retorna todos os estados e funções que a UI vai precisar
    return {
        maoJogador,
        maoBot,
        turno,
        resultado,
        pilhaEmpate,
        vencedorRodada,
        cartaAtualJogador: maoJogador.length > 0 ? maoJogador[0] : null,
        cartaAtualBot: maoBot.length > 0 ? maoBot[0] : null,
        iniciarPartida,
        jogarRodada,
    };
};