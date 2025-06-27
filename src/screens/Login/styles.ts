import { StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({

container:{   
  paddingHorizontal: 24,
  justifyContent: "center",
  paddingBottom: 45, 
   
},
logo: { 
  width: 200,
  height: 200,
  borderRadius: 50,  
  marginTop: 90,
  marginLeft: 100,

},
login:{
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',    
    textAlign: 'center',
    marginBottom: 32
},
texto: {  
  fontWeight: 'bold',
  textDecorationLine: 'underline',
  marginTop: 24,
  fontSize: 16,
  color: '#fff'
  
}

})