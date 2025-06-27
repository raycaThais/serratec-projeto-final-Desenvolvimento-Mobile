import React, { useEffect, useState } from "react"
import { OnePieceCharacter, onePieceCharacters } from "../../data/OnePieceCharacters"


export const Jogo = () => {
    //vou começar colocando a lógica aqui, mas talvez mude para outro arquivo

    const [baralho, setBaralho] = useState<OnePieceCharacter[]>(onePieceCharacters)
    const [vezJogador, setVezJogador] = useState<boolean>(true)
    const [cartaAtualJogador, setCartaAtualJogador] = useState<OnePieceCharacter>()
    const [cartaAtualBot, setCartaAtualBot] = useState<OnePieceCharacter>()
    const [cartasJogador, setCartasJogador] = useState<OnePieceCharacter[]>([])
    const [cartasBot, setCartasBot] = useState<OnePieceCharacter[]>([])
    const [resultado, setResultado] = useState<string>("") // usar para exibir mensagem na tela e contar vitorias (se formos fazer um contador)
    const [pilhaCartasEmpate, setPilhaCartasEmpate] = useState<OnePieceCharacter[]>()


    const dividirCartas = (baralho: OnePieceCharacter[]) => {
        const cartasJogador = baralho.slice(0, 5)
        setCartasJogador(cartasJogador)
        const cartasBot = baralho.slice(5, 10)
        setCartasBot(cartasBot)
    }

    const pegarPrimeiraCartaJogador = (baralhoJogador: OnePieceCharacter[]) => {
        const novaLista = [...cartasJogador]
        const carta = novaLista.shift()

        setCartasJogador(novaLista)
        setCartaAtualJogador(carta)

    }

    const pegarPrimeiraCartaBot = (baralhoBot: OnePieceCharacter[]) => {
        const novaLista = [...cartasBot]
        const carta = novaLista.shift()

        setCartasBot(novaLista)
        setCartaAtualBot(carta)
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

    const repetirPartida = () => {
        if (vezJogador) {
            pegarPrimeiraCartaJogador(baralho) //exibe a carta e o jogador escolhe?

            //jogador pega proxima carta e escolhe outro atributo
            //as quatro ou mais cartas tem que ir para o baralho do vencedor
        }
    }

    const compararAtributos = (atributo: keyof OnePieceCharacter) => {

        const atributoBot = cartaAtualBot ? cartaAtualBot[atributo]! : 0;
        const atributoJogador = cartaAtualJogador ? cartaAtualJogador[atributo]! : 0

        let novoBaralhoJogador = [...cartasJogador]
        let novoBaralhoBot = [...cartasBot]

        if (atributoBot > atributoJogador) {
            //bot vence
            setResultado("Derrota")
            novoBaralhoBot.push(...pilhaCartasEmpate!, cartaAtualJogador!, cartaAtualBot!)
            setCartasBot(novoBaralhoBot)
            setVezJogador(false) //bot joga novamente se ganhar??
            setPilhaCartasEmpate([])
        } else if (atributoJogador > atributoBot) {
            //jogador vence
            setResultado("Vitória")
            setTimeout(() => {
                novoBaralhoJogador.push(...pilhaCartasEmpate!, cartaAtualJogador!, cartaAtualBot!)
                setCartasJogador(novoBaralhoJogador)
                setVezJogador(true)
                setPilhaCartasEmpate([])
                setResultado("")
            }, 2000)

        } else {
            // empate (tem que repetir a jogada) -> mesma pessoa que escolheu o atributo, escolhe dnv
            //exibir mensagem de empate 
            const pilhaCartas: OnePieceCharacter[] = [...pilhaCartasEmpate!, cartaAtualJogador!, cartaAtualBot!]
            setPilhaCartasEmpate(pilhaCartas)
            // colocar um setTimeout para a mensagem ser exibida por um tempo antes de repetir a partida?
            setResultado("Empate")
            repetirPartida()
        }

    }
    // método para usar nos atributos
    const escolherAtributoJogador = (atributo: keyof OnePieceCharacter) => {
        compararAtributos(atributo)
    }

    const realizarJogadaBot = () => {
        const atributoEscolhidoBot = escolherMelhorAtributo(cartaAtualBot!) as keyof OnePieceCharacter

        compararAtributos(atributoEscolhidoBot)

    }


    useEffect(() => {
        if (cartasJogador.length === 0 || cartasBot.length === 0) {
            setResultado(cartasBot.length != 0 ? "Bot venceu!" : "Você venceu!")
            return
        }
        if (vezJogador) {
            pegarPrimeiraCartaJogador(baralho) //tem que exibir essa carta aqui para o jogador escolher um atributo

        } else {
            pegarPrimeiraCartaBot(baralho)

            setTimeout(() => {
                realizarJogadaBot()
            }, 800)

        }
    }, [vezJogador])

    // método para chamar no botão
    const iniciarPartida = () => {
        const baralhoEmbaralhado = [...baralho].sort(() => Math.random() - 0.5)
        setBaralho(baralhoEmbaralhado)
        dividirCartas(baralhoEmbaralhado)

        setVezJogador(true) // vai sempre começar sendo a vez do jogador assim

    }


    //falta o método de comparação dos atributos escolhidos e indicar o vencedor da rodada(completar)
    //falta fazer useEffect para o jogada do bot
    //falta todo o fluxo da partida (que chama os métodos feitos)


    return (<></>)


}