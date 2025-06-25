import { Image, TouchableOpacity, View } from "react-native"
import { Button } from "../../components/Button"

export const TelaInicial = () => {  
 return (
  <View>
    <Image/>
  {/* <Image source={require("../../assets/serratec-logo.png")} /> */}
    <Button nome={"Start"}/>  
    <Button nome={"❓"}/>  
    <Button nome={"Ver deck completo"}/>  
  </View>
 )

}