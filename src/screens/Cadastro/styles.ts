import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container:{
        // flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    cadastro:{
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

    title:{
        color: '#000',
        fontSize: 40,
        fontWeight: 'bold',        
        textAlign: 'center',
        marginBottom: 20
    },

    texto:{
        fontWeight: '400',
        textDecorationLine: 'underline',
        fontSize: 20,
        color: '#000',
        marginTop: 24,

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