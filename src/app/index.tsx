import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { estiloHome } from "../style/estiloHome";
import { useRouter } from "expo-router"
import { useConsultas, Consulta } from "./consultasContext";
import * as SecureStore from 'expo-secure-store'


export default function Index() {
    const router = useRouter()
    const { consultas, excluirConsulta } = useConsultas();


    useEffect(() => {
        const verificarAutenticacao = async () => {
            const token = await SecureStore.getItemAsync('user_acess_token');

            if (!token) {
                router.replace('/login');
            }
        };

        verificarAutenticacao();
    }, []);


    const formatarData = (data: string) =>{
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`
    }


    const renderizaItem = ({ item }: { item: Consulta }) => (
    <TouchableOpacity 
        style={estiloHome.card}
        onPress={() => router.push({
            pathname: "/detalhes",
            params: { 
                id: item.id,
                data: formatarData(item.data),
                hora: item.hora,
                localizacao: item.localizacao,
                medico: item.especialista_detalhes?.nome || "Não informado",          
                especialidade: item.especialista_detalhes?.especialidade || "Não informada" 
            }
        })}
    >
        <Text style={estiloHome.medicoText}>{item.especialista_detalhes?.nome}</Text>
        <Text style={estiloHome.dataHoraText}>{formatarData(item.data)} às {item.hora}</Text>
    </TouchableOpacity>
);

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync('user_acess_token');
        router.replace('/login');
    };

    return (
        <View style={estiloHome.container}>
            <View style={estiloHome.headerContainer}>
                <Text style={estiloHome.headerTitle}>Consultas Agendadas</Text>

                <TouchableOpacity onPress={handleLogout} style={{ padding: 8, backgroundColor: '#E2E8F0', borderRadius: 8 }}>
                    <Text style={{ color: '#4A5568', fontWeight: '600' }}>Sair</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={consultas}
                keyExtractor={(item) => item.id}
                renderItem={renderizaItem}
                contentContainerStyle={estiloHome.listPadding}
                ListEmptyComponent={<Text style={estiloHome.emptyText}>Nenhuma consulta encontrada</Text>}
            />

            <TouchableOpacity style={estiloHome.btnAgendar} onPress={() => router.push("/agendar")}>
                <Text style={estiloHome.textoAgendar}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
