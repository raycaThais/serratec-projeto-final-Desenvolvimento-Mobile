import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container:{
        flex: 1
    },

    cadastro:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    title:{
        color: '#000',
        fontSize: 40,
        fontWeight: 'bold',
        marginVertical: 90,
        textAlign: 'center',
        marginBottom: 20
    },

    texto:{
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },

    fundoImg:{
        flex: 1,
        resizeMode:"cover"
    },

    logo:{
        width: 200,
        height: 200,
        borderRadius: 50,  
        marginTop: 90,
        alignSelf: 'center',
    }

})