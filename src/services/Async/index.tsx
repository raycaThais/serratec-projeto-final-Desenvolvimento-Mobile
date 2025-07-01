import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@user:data';

 async function saveData(user: string) {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        console.log("Dados salvos!");
    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
}

async function getUser(): Promise<any | null> {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao buscar os dados do usuário:', error);
    return null;
  }
}

async function removeData() {
    try {
        await AsyncStorage.removeItem(USER_KEY);
        console.log("Dados removidos!");
    } catch (error) {
        console.error("Erro ao remover:", error);
    }
};

export default {
  saveData,
  getUser,
  removeData,  
};