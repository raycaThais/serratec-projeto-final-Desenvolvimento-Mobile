import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native"
import { Button } from "../../components/Button"
import { useState } from "react"
import { RegrasModal } from "../../components/Modal/RegrasModal"
import { styles } from "./style"
import { LinearGradient } from "expo-linear-gradient"

export const TelaInicial = () => {
  const [IsRegrasModalOpen, setIsRegrasModalOpen] = useState<boolean>(false);

  return (
    <>

      <ImageBackground blurRadius={1} style={styles.container} source={require("../../../assets/apenasFundo.png")}>

        <Image style={styles.image} source={require("../../../assets/LogoSemFundo.png")} />
        <View style={styles.btComojogar}>
          <TouchableOpacity style={styles.duvidas} onPress={() => setIsRegrasModalOpen(true)}>
            <LinearGradient
              colors={["#facc15", "#ef7208"]}
              style={styles.gradient}>
              <Text>❓</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

        <View style={styles.botoes}>

          <Button nome={"Start"} />
          <Button nome={"Ver deck"} />

        </View>
        <RegrasModal setIsRegrasModalOpen={setIsRegrasModalOpen}
          IsRegrasModalOpen={IsRegrasModalOpen}
          children={
            <View>
              <Text>🎴 Objetivo do Jogo:</Text>
              <Text>
                Ser o último jogador com cartas na mão.
                <Text>👥 Número de Jogadores:</Text>
                2 ou mais.
                <Text>🃏 Preparação:</Text>
                Todas as cartas são embaralhadas e distribuídas igualmente entre os jogadores.
                Cada jogador mantém seu monte virado para baixo e não olha suas cartas.
                <Text>🔁 Como Jogar:</Text>
                O primeiro jogador vira a primeira carta do seu monte (sem mostrar as dos outros).
                Ele escolhe um atributo da carta (ex: força, velocidade, resistencia, etc.).
                Os demais jogadores também viram a primeira carta de seus montes e comparam o mesmo atributo.
                Quem tiver o maior valor nesse atributo vence a rodada e coleta todas as cartas jogadas, colocando-as no final do seu monte.
                O vencedor da rodada escolhe o próximo atributo.
                <Text>⭐ Carta Super Trunfo:</Text>
                Se alguém jogar a carta "Super Trunfo", ela irá vence automaticamente.
                {/* carta fred será supertrunfo ou algo tipo hipersupertrunfo? */}
                As regras do Super Trunfo podem variar de um baralho para outro.
                <Text>🔚 Fim do Jogo:</Text>
                Os jogadores que ficarem sem cartas são eliminados.
                O último jogador com cartas é o vencedor. </Text>
            </View>} />
      </ImageBackground>
    </>
  )
}