import { Modal, View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTema } from "../../../context";

interface RegrasModalProps {
    IsRegrasModalOpen: boolean,
    setIsRegrasModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    children?: ReactNode;
}

export const RegrasModal = ({ IsRegrasModalOpen, setIsRegrasModalOpen, children }: RegrasModalProps) => {
    const { tema } = useTema()
    const isEscuro = tema === "escuro";
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={IsRegrasModalOpen}
            onRequestClose={() => {
                setIsRegrasModalOpen(false);
            }}
        >
            <View style={styles.modalBackground}>
                <LinearGradient
                    colors={isEscuro?["#adadab", "#2C2C2C"] : ["#f8c007", "#bd6a26"]}
                    style={styles.containermodal}
                >
                    <TouchableOpacity
                        style={{ alignSelf: 'flex-end', marginBottom: 10 }}
                        onPress={() => setIsRegrasModalOpen(false)}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>✕</Text>
                    </TouchableOpacity>
                    {children}
                </LinearGradient>
            </View>
        </Modal>
    );
}