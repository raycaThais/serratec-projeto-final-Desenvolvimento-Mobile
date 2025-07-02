import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  fundoImg: { 
    flex: 1,
    resizeMode: "cover",
  },  
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  perfil: {
    alignItems: 'center',
    fontWeight: 'bold',
  },
  email: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 20,    
  },

  button: {       
    alignItems: 'center',
    marginTop: 40,
  },
});