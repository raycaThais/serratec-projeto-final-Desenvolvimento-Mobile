import React, { useState } from "react"
import { OnePieceCharacter, onePieceCharacters } from "../../data/OnePieceCharacters"


export const Jogo = () => {
    //vou começar colocando a lógica aqui, mas talvez mude para outro arquivo

    const [baralho, setBaralho] = useState<OnePieceCharacter[]>(onePieceCharacters)
    const [vezJogador, setVezJogador] = useState<boolean>(true)
    const [cartaAtualJogador, setCartaAtualJogador] = useState<OnePieceCharacter>()
    const [cartaAtualBot, setCartaAtualBot] = useState<OnePieceCharacter>()

    const embaralharCartas = () => {
        const baralhoEmbaralhado = [...baralho].sort(() => Math.random() - 0.5)
        setBaralho(baralhoEmbaralhado)
    }

    const dividirCartas = (baralho: OnePieceCharacter[]) => {
        const cartasJogador = baralho.slice(0, 5)
        const cartasBot = baralho.slice(5, 10)

        return { cartasJogador, cartasBot }
    }

    const pegarPrimeiraCartaJogador = (baralhoJogador: OnePieceCharacter[]) => {
        setCartaAtualJogador(baralhoJogador.shift)
    }

    const pegarPrimeiraCartaBot = (baralhoBot: OnePieceCharacter[]) => {
        setCartaAtualBot(baralhoBot.shift)
    }


    //método para o bot usar
    const escolherMelhorAtributo = (cartaAtual: OnePieceCharacter) => {

        const atributos = {
            forca: cartaAtual.forca || 0,
            velocidade: cartaAtual.velocidade || 0,
            resistencia: cartaAtual.resistencia || 0,
            inteligencia: cartaAtual.inteligencia || 0,
            haki: cartaAtual.haki || 0,
            recompensa: cartaAtual.recompensa || 0
        }

        let melhorAtributo = ""
        let maiorValor = -1

        const at = Object.entries(atributos)

        at.forEach(([atributo, valor]) => {
            if (valor > maiorValor) {
                maiorValor = valor
                melhorAtributo = atributo
            }

        })
        return melhorAtributo
    }

    //falta o método do jogador escolher o atributo da carta
    //falta o método de comparação dos atributos escolhidos e indicar o vencedor da rodada
    //falta o método de colocar as cartas usadas no baralho do vencedor
    //falta fazer useEffect para o jogada do bot
    //falta todo o fluxo da partida (que chama os métodos feitos)


    return (<></>)


}