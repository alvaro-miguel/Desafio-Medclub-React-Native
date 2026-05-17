import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router"
import { estiloAgendar } from "../style/estiloAgendar";
import { useConsultas } from "./consultasContext"
import { mascaraData, mascaraHora } from "@/utils/mascaras";
import { validarHora, validarData } from "@/utils/validacoes";
import api from "@/services/api";
import * as SecureStore from 'expo-secure-store'


export default function Agendar() {
    const router = useRouter();
    const { adicionarConsulta } = useConsultas();

    const [medico, setMedico] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [localizacao, setLocalizacao] = useState("");

    const dataInvalida = data.length > 0 && !validarData(data);
    const horaInvalida = hora.length === 5 && !validarHora(hora, data);

    const formularioValido =
        (medico.trim().length > 0 &&
            especialidade.trim().length > 0 &&
            data.length === 10 && !dataInvalida &&
            hora.length === 5 && !horaInvalida &&
            localizacao.trim().length > 0);

    const salvarConsulta = async () => {
        const novaConsulta = {
            medico: medico.trim(),             
            especialidade: especialidade.trim(), 
            data: converterDataDjango(data),
            hora,
            localizacao: localizacao.trim()
        };

        try {
            const token = await SecureStore.getItemAsync('user_acess_token');
            const response = await api.post('consultas/', novaConsulta, {
                headers: {Authorization: `Bearer ${token}`}
            });
            adicionarConsulta(response.data);
            router.back();
        } catch (error: any) {
            console.error("Operação falhou", error.response?.data);

            if (error.response?.data) {
                alert(`Erro no preenchimento dos dados: ${JSON.stringify(error.response.data)}`);
            } else {
                alert("Operação falhou!");
            }
        }
    }

    const converterDataDjango = (dataBr: string) => {
        const [dia, mes, ano] = dataBr.split("/");
        return `${ano}-${mes}-${dia}`;
    };

    return (
        <ScrollView style={estiloAgendar.container}>
            <Text style={estiloAgendar.titulo}>Agendar Nova Consulta</Text>

            <Text style={estiloAgendar.label}>Data</Text>
            <TextInput
                placeholder="DD/MM/AAAA"
                value={data}
                onChangeText={(t) => setData(mascaraData(t))}
                maxLength={10}
                style={[estiloAgendar.input, dataInvalida && { borderColor: 'red', borderWidth: 2 }]}
                keyboardType="number-pad" />

            <Text style={estiloAgendar.label}>Hora</Text>
            <TextInput
                placeholder="HH:MM"
                value={hora}
                onChangeText={(t) => setHora(mascaraHora(t))}
                maxLength={5}
                style={[estiloAgendar.input, horaInvalida && { borderColor: 'red', borderWidth: 2 }]}
                keyboardType="number-pad" />

            <Text style={estiloAgendar.label}>Médico</Text>
            <TextInput
                placeholder="Nome do Médico"
                value={medico}
                onChangeText={setMedico}
                maxLength={50}
                style={estiloAgendar.input} 
            />

            <Text style={estiloAgendar.label}>Especialidade</Text>
            <TextInput
                placeholder="Ex: Cardiologista"
                value={especialidade}
                onChangeText={setEspecialidade}
                maxLength={50}
                style={estiloAgendar.input} 
            />

            <Text style={estiloAgendar.label}>Localização</Text>
            <TextInput
                placeholder="Ex: Ala A, Sala 10"
                value={localizacao}
                onChangeText={setLocalizacao}
                maxLength={50}
                style={estiloAgendar.input} />

            <TouchableOpacity style={[estiloAgendar.botaoSalvar, !formularioValido && { backgroundColor: '#CCC' }]}
                onPress={salvarConsulta}
                disabled={!formularioValido}>
                <Text style={estiloAgendar.textoBotao}>Confirmar Agendamento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estiloAgendar.btnVoltar} onPress={() => router.back()}>
                <Text style={estiloAgendar.textVoltar}>Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}