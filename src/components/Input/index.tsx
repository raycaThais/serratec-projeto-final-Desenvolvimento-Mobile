import { TextInput, TextInputProps } from "react-native";
import { styles } from './styles';
import { forwardRef } from "react";

interface InputProps extends TextInputProps{

}

export const Input = forwardRef<TextInput, InputProps>(({...rest}, ref) => {
    return(
        <TextInput ref={ref} style={styles.input} {...rest}/>
    )
});