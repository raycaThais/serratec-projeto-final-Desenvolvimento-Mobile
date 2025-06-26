import { TextInput, TextInputProps } from "react-native";
import { styles } from './styles';

interface InputProps extends TextInputProps{

}

export const Input = ({...rest}: InputProps) => {
    return(
        <TextInput style={styles.input} {...rest}/>
    )
}