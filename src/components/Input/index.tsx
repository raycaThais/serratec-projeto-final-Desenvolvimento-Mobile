import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps{

}

export const Input = ({...rest}: InputProps) => {
    return(
        <TextInput{...rest}/>
    )
}