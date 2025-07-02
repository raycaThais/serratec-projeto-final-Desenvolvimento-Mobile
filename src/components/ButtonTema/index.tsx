import { Animated, TouchableOpacity } from "react-native"
import { useTema } from "../../context"
import { useRef } from "react"


export const ButtonTema = () => {
    const { tema, alternarTema } = useTema()
    const isEscuro = tema === "escuro"

      const animacaoBolinha = useRef(new Animated.Value(isEscuro ? 24 : 2)).current;

    return (
        <TouchableOpacity onPress={alternarTema}>
            <Animated.View>

                
            </Animated.View>

        </TouchableOpacity>
    )

}