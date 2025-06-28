import axios, { AxiosResponse } from "axios";

const apiLogin = axios.create({
    baseURL: "https://685d9e167b57aebd2af6a7ed.mockapi.io/grupo06/"
});

export interface UserItemProps{
    index: number,
    nome: string,
    email: string,
    senha: string
}

 interface UserItemResponse{
    index: number,
    email: string,
    senha: string
}

export function getUserItems():Promise<AxiosResponse<UserItemResponse, any>>{
    const url = 'usuarios';

    return apiLogin.get("https://685d9e167b57aebd2af6a7ed.mockapi.io/grupo06/usuarios");
}