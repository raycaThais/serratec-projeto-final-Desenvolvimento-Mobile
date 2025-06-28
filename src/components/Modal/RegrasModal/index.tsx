import { Modal, View, } from "react-native"
import { styles } from "./styles";
import { ReactNode } from "react";

interface RegrasModalProps {
    IsRegrasModalOpen: boolean,
    setIsRegrasModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    children?: ReactNode;
}

export const RegrasModal = ({ IsRegrasModalOpen, setIsRegrasModalOpen, children }: RegrasModalProps) => {
    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={IsRegrasModalOpen}
                onRequestClose={() => {
                    setIsRegrasModalOpen(false);
                }}
            >
                <View style={styles.modal}>
                    {children}
                </View>
            </Modal>

        </View>
    )

}