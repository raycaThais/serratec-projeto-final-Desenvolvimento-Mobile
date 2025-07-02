import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@user:data';
const THEME_KEY = '@theme:data';

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

 async function saveTema(theme: 'claro' | 'escuro') {
    try {
        await AsyncStorage.setItem(THEME_KEY, theme);
        console.log("Dados salvos!");
    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
}

async function getTema(): Promise<any | null> {
  try {
    const data = await AsyncStorage.getItem(THEME_KEY);
      return data === 'claro' || data === 'escuro' ? data : null;
  } catch (error) {
    console.error('Erro ao buscar tema:', error);
    return null;
  }
}


export default {
  saveData,
  getUser,
  removeData,  
  saveTema,
  getTema
};