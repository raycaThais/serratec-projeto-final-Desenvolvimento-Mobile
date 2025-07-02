import { Animated, TouchableOpacity } from "react-native"
import { useTema } from "../../context"
import { useEffect, useRef } from "react"
import { styles } from "./styles"


export const ButtonTema = () => {
    const { tema, alternarTema } = useTema()
    const isEscuro = tema === "escuro"

    const translateX = useRef(new Animated.Value(isEscuro ? 24 : 2)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isEscuro ? 24 : 2,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isEscuro]);

    return (
        <TouchableOpacity onPress={alternarTema} style={[styles.container, { backgroundColor: isEscuro ? "#333" : "#ccc" }]}>
            <Animated.View style={[styles.bolinha, { transform: [{ translateX }],
            backgroundColor: isEscuro ? "#fff" : "#000",}]}>
            </Animated.View>

        </TouchableOpacity>
    )

}