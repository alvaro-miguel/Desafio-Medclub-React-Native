import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '@/services/api';
import * as SecureStore from 'expo-secure-store'


export interface Consulta {
    id: string;
    data: string;
    hora: string;
    localizacao: string;
    especialista:number;
    especialista_detalhes?:{
        id:number;
        nome:string;
        especialidade:string;
    };
}

interface dadosConsultasContnexto {
    consultas: Consulta[];
    adicionarConsulta: (nova: Consulta) => void;
    excluirConsulta: (id:string) => void;
    login: (username: string, password: string) => Promise<void>

}

const ConsultasContnexto = createContext<dadosConsultasContnexto>({} as dadosConsultasContnexto);

export const ConsultasProvider = ({ children }: { children: React.ReactNode }) => {
    const [consultas, setConsultas] = useState<Consulta[]>([]);

    useEffect(() => {
        const dadosIniciaiss = async () => {
            const token = await SecureStore.getItemAsync('user_acess_token');

            if(token){
                api.get('consultas/')
                .then(response => setConsultas(response.data))
                .catch(error => console.error("Não foi possível carregar as consultas.", error));
            }
        };

        dadosIniciaiss();
    }, []);

    const adicionarConsulta = (nova: Consulta) => {
        setConsultas((atual) => [nova, ...atual]);
    };


    const excluirConsulta = async (id:string | number)=>{
        try{
            const idFormatado = isNaN(Number(id)) ? id: Number(id);
            await api.delete(`consultas/${idFormatado}/`);
            setConsultas((atual) => atual.filter(c => Number(c.id) !== Number(idFormatado)));
        } catch (error){
            console.error("Erro ao excluir consulta: ", error);
            alert("Não foi possível excluir consulta");
        }
    };


    const login = async (username:string, password:string) => {
        try{
            const response = await api.post('token/', {username, password});
            const { access } = response.data;

            await SecureStore.setItemAsync('user_acess_token', access);

            const responseConsultas = await api.get('consultas/');
            setConsultas(responseConsultas.data);
        } catch (error){
            console.error('Erro ao realizar login', error)
            alert("Falha no login!")
        }
    };

    return (
        <ConsultasContnexto.Provider value={{ consultas, adicionarConsulta, excluirConsulta, login }}>
            {children}
        </ConsultasContnexto.Provider>
    );
};

export const useConsultas = () => useContext(ConsultasContnexto);