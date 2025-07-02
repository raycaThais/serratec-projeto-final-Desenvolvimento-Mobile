import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({

    container: {
        position: "absolute",
        width: 50,
        height: 28,
        borderRadius: 20,
        justifyContent: "center",
        padding: 2,
        bottom: 0,
        top: 40,
        right: 20,
        zIndex: 999 //para nao ficar em baixo de alguma imagem ou botao
    },
    bolinha: {
        width: 24,
        height: 24,
        borderRadius: 12,
    }
})