import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Button } from "../../components/Button"
import { useState } from "react"
import { RegrasModal } from "../../components/Modal/RegrasModal"
import { styles } from "./style"
import { LinearGradient } from "expo-linear-gradient"
import FloatingAnimation from "../../components/FloatingAnimation"
import { RootStackParamList } from "../../routes"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ButtonStart } from "../../components/Button Start"

type TelaInicialScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeTabs">;

export const TelaInicial = ({navigation}: {navigation: TelaInicialScreenNavigationProp}) => {
  const [IsRegrasModalOpen, setIsRegrasModalOpen] = useState<boolean>(false);

  return (
    <>
      <ImageBackground blurRadius={ 1 } style={ styles.container } source={ require("../../../assets/apenasFundo.png") }>

        <FloatingAnimation duration={ 4000 } distance={ 5 } rotationAmount={ 3 }>
          <Image style={ styles.image } source={ require("../../../assets/LogoSemFundo.png") } />
        </FloatingAnimation>

        <View style={ styles.btComojogar }>
          <TouchableOpacity style={ styles.duvidas } onPress={ () => setIsRegrasModalOpen(true) }>
            <LinearGradient
              colors={ ["#f8c007", "#bd6a26"] }
              style={ styles.gradient }>
              <Text>❓</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={ styles.botoes }>
          <ButtonStart nome={ "START" }
          onPress={() => navigation.navigate("GameScreen")}
          />
          {/* <Button nome={ "Ver deck" } 
          onPress={() => navigation.navigate("DeckScreen")}
          /> */}
        </View>

        <RegrasModal
          setIsRegrasModalOpen={ setIsRegrasModalOpen }
          IsRegrasModalOpen={ IsRegrasModalOpen }
          children={
            <View style={ styles.containermodal }>

              <ScrollView style={ styles.caixaScroll }>
                <View style={ styles.secoesduvidas }>
                  <Text style={ styles.titulo }>🎴 Objetivo do Jogo</Text>
                  <Text style={ styles.textosecaoduvidas }>
                    ‣ Ser o jogador com mais cartas acumuladas ao decorrer do jogo
                  </Text>
                </View>

                <View style={ styles.secoesduvidas }>
                  <Text style={ styles.titulo }>👥 Número de Jogadores</Text>
                  <Text style={ styles.textosecaoduvidas }>
                    ‣ 2 jogadores</Text>
                </View>

                <View style={ styles.secoesduvidas }>
                  <Text style={ styles.titulo }>🃏 Preparação</Text>
                  <Text style={ styles.textosecaoduvidas }>
                    ‣ Todas as cartas são embaralhadas e distribuídas igualmente entre os dois jogadores.{ "\n" }
                    ‣ Você e o bot/jogador* recebem 5 cartas cada um.{ "\n" }
                    ‣ Cada jogador mantém seu monte virado para baixo e não olha suas cartas.</Text>
                </View>

                <View style={ styles.secoesduvidas }>
                  <Text style={ styles.titulo }>🔁 Como Jogar</Text>
                  <Text style={ styles.textosecaoduvidas }>
                    ‣ O jogador da vez revela a primeira carta do seu monte.{ "\n" }
                    ‣ O jogador da vez escolhe um atributo da carta (ex: força, velocidade, resistencia, etc.).{ "\n" }
                    ‣ O outro jogador também revela sua carta e compara o mesmo atributo.{ "\n" }
                    ‣ Quem tiver o maior valor no atributo vence a rodada e pega as duas cartas, colocando-as no seu monte de cartas ganhadas.{ "\n" }
                    ‣ O vencedor da rodada será o próximo a escolher o atributo.</Text>
                </View>

                <View style={ styles.secoesduvidas }>
                  <Text style={ styles.titulo }>⭐ Carta Super Trunfo</Text>
                  <Text style={ styles.textosecaoduvidas }>
                    ‣ Se um jogador usar a carta "Super Trunfo", ela vence automaticamente a rodada, independente do atributo escolhido.{ "\n" }
                  </Text>
                </View>

                <View style={ styles.secoesduvidas }>
                  <Text style={ styles.titulo }>🔚 Fim do Jogo</Text>
                  <Text style={ styles.textosecaoduvidas }>
                    ‣ O jogo termina quando um dos jogadores ficar sem cartas.{ "\n" }
                    ‣ O jogador que tiver acumulado mais cartas no monte de cartas ganhadas, é declarado o vencedor!
                  </Text>
                </View>
              </ScrollView>
            </View>
          }
        />
      </ImageBackground >
    </>
  )
}