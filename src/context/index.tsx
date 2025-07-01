import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState } from "react";

type Tema = "claro" | "escuro"

interface TemaProviderProps {
    children: React.ReactNode
}
interface TemaContextoProps {
    tema: Tema
    alternarTema: () => void
}
const TemaContexto = createContext<TemaContextoProps | undefined>(undefined)

export const TemaProvider = ({ children }: TemaProviderProps) => {
    const [tema, setTema] = useState<Tema>("claro")

    const alternarTema = () => {
        setTema((temaAnterior) => (temaAnterior === "claro" ? "escuro" : "claro"))
    }

    const salvarTema = async (valor: Tema) => {
        try {
            const json = JSON.stringify(valor)
            await AsyncStorage.setItem("tema", valor)
        } catch (erro) {
            console.log(erro)
        }
    }

    return (<TemaContexto.Provider value={{ tema, alternarTema }}>
        {children}
    </TemaContexto.Provider>
    )


}

export const useTema = () => useContext(TemaContexto)