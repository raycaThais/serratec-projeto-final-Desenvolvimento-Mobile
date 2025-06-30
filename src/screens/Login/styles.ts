import { StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
fundoImg:{ 
  flex: 1,
  resizeMode:"cover"
  //paddingBottom: 45, //margin nos botões de navegação do celular 
},
container:{   
  paddingHorizontal: 20,
  justifyContent: "center",
},
logo: { 
  width: 200,
  height: 200,
  borderRadius: 50,  
  marginTop: 90,
  alignSelf: 'center',
},
login:{
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    marginTop: 70,
},
titulo:{
    color: '#000',
    fontSize: 36,
    fontWeight: 'bold',    
    textAlign: 'center',
    marginBottom: 32
},
texto: {  
  fontWeight: 400,
  textDecorationLine: 'underline',
  marginTop: 24,
  fontSize: 20,
  color: '#000'
}
})