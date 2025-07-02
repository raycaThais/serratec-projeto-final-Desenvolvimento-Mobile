import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState } from "react";
import AsyncService from ".././services/Async"

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
        setTema((temaAnterior) => {
            const novoTema = temaAnterior === "claro" ? "escuro" : "claro"
            AsyncService.saveData(novoTema)
            return novoTema
        })
    }

    

    return (<TemaContexto.Provider value={{ tema, alternarTema }}>
        {children}
    </TemaContexto.Provider>
    )


}

export const useTema = () => useContext(TemaContexto)!