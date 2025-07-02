import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/Button";
import { useState } from "react";
import { RegrasModal } from "../../components/Modal/RegrasModal";
import { styles } from "./style";
import { LinearGradient } from "expo-linear-gradient";
import FloatingAnimation from "../../components/FloatingAnimation";
import { RootStackParamList } from "../../routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ButtonStart } from "../../components/ButtonStart";
import fundoEscuro from "../../../assets/ModoNoturno.png";
import fundo from '../../../assets/apenasFundo.png';
import { useTema } from "../../context";
import { ButtonTema } from "../../components/ButtonTema";

type TelaInicialScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "HomeTabs">;

export const TelaInicial = ({ navigation }: { navigation: TelaInicialScreenNavigationProp }) => {
  const [IsRegrasModalOpen, setIsRegrasModalOpen] = useState<boolean>(false);

  const { tema } = useTema()
  const isEscuro = tema === "escuro";

  return (
    <>
      <View>
        <ButtonTema />
      </View>
      <ImageBackground source={isEscuro ? fundoEscuro : fundo} style={styles.container}>
        <FloatingAnimation duration={4000} distance={5} rotationAmount={3}>
          <Image style={styles.image} source={require("../../../assets/LogoSemFundo.png")} />
        </FloatingAnimation>

        <View style={styles.btComojogar}>
          <TouchableOpacity style={styles.duvidas} onPress={() => setIsRegrasModalOpen(true)}>
            <LinearGradient
              colors={isEscuro? ["#1E1E1E", "#2C2C2C"] : ["#f8c007", "#bd6a26"]}
              style={styles.gradient}>
              {isEscuro? <Text>❔</Text> : <Text>❓</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.botoes}>
          <ButtonStart nome={"START"}
            onPress={() => navigation.navigate("GameScreen")}
          />
          {/* <Button nome={ "Ver deck" } 
          onPress={() => navigation.navigate("DeckScreen")}
          /> */}
        </View>

        <RegrasModal
          setIsRegrasModalOpen={setIsRegrasModalOpen}
          IsRegrasModalOpen={IsRegrasModalOpen}
          children={
            <View style={styles.containermodal}>

              <ScrollView style={styles.caixaScroll}>
               <View style={styles.secoesduvidas}>
                  <Text style={styles.titulo}>🎯 Objetivo do Jogo</Text>
                  <Text style={styles.textosecaoduvidas}>
                    ‣ Ser o primeiro jogador a conquistar 5 pontos vencendo rodadas contra o bot
                  </Text>
                </View>

                <View style={styles.secoesduvidas}>
                  <Text style={styles.titulo}>⚔️ Quem Participa</Text>
                  <Text style={styles.textosecaoduvidas}>
                    ‣ Você vs nosso Bot</Text>
                </View>

                <View style={styles.secoesduvidas}>
                  <Text style={styles.titulo}>🃏 Preparação</Text>
                  <Text style={styles.textosecaoduvidas}>
                    ‣ Todas as cartas são embaralhadas e distribuídas igualmente entre você e o bot.{"\n"}
                    ‣ Você e o bot recebem 5 cartas cada um.{"\n"}
                    ‣ O jogo dura até 5 rodadas ou até alguém conquistar 5 pontos.{"\n"}
                    ‣ Você sempre começa jogando na primeira rodada.
                  </Text>
                </View>

                <View style={styles.secoesduvidas}>
                  <Text style={styles.titulo}>🔁 Como Jogar</Text>
                  <Text style={styles.textosecaoduvidas}>
                    ‣ Na sua vez: vire sua primeira carta e escolha um atributo (força, velocidade, etc.).{"\n"}
                    ‣ O bot revela sua carta e compara o mesmo atributo.{"\n"}
                    ‣ Quem tiver o maior valor vence a rodada e ganha 1 ponto.{"\n"}
                    ‣ O vencedor da rodada joga primeiro na próxima rodada.{"\n"}
                    ‣ Em caso de empate, ninguém pontua e uma nova rodada é iniciada com cartas diferentes.{"\n"}
                    ‣ Na vez do bot: ele escolhe automaticamente seu melhor atributo.
                  </Text>
                </View>

                <View style={styles.secoesduvidas}>
                  <Text style={styles.titulo}>⭐ Carta Super Trunfo</Text>
                  <Text style={styles.textosecaoduvidas}>
                    ‣ Se você ou o bot ganharem a carta "Super Trunfo", ela vence automaticamente a rodada, não importa qual atributo seja escolhido.   </Text>
                </View>

                <View style={styles.secoesduvidas}>
                  <Text style={styles.titulo}>🔚 Fim do Jogo</Text>
                  <Text style={styles.textosecaoduvidas}>
                    ‣ O primeiro jogador a conquistar 5 pontos é declarado o grande campeão!
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