import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, TextInput, ScrollView, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { estiloAgendar } from "../style/estiloAgendar";
import { useConsultas } from "./consultasContext";
import { mascaraData } from "@/utils/mascaras";
import { validarData } from "@/utils/validacoes";
import { Dropdown } from 'react-native-element-dropdown';
import api from "@/services/api";
import * as SecureStore from 'expo-secure-store';

interface Horario {
    id: number;
    horario: string;
    disponivel: boolean;
}

interface Especialista {
    id: number;
    nome: string;
    especialidade: string;
    horarios_disponiveis: Horario[];
}

export default function Agendar() {
    const router = useRouter();
    const { adicionarConsulta } = useConsultas();

    const [especialistas, setEspecialistas] = useState<Especialista[]>([]);
    const [horariosFiltrados, setHorariosFiltrados] = useState<Horario[]>([]);
    const [carregando, setCarregando] = useState(true);

    const [especialistaId, setEspecialistaId] = useState<number | null>(null);
    const [horarioSelecionadoId, setHorarioSelecionadoId] = useState<number | null>(null);
    const [data, setData] = useState("");
    const [localizacao, setLocalizacao] = useState("");

    const dataInvalida = data.length > 0 && !validarData(data);

    const formularioValido = (
        especialistaId !== null &&
        horarioSelecionadoId !== null &&
        data.length === 10 && !dataInvalida &&
        localizacao.trim().length > 0
    );

    useEffect(() => {
        const carregarDadosIniciais = async () => {
            try {
                const response = await api.get('especialistas/');
                setEspecialistas(response.data);
            } catch (error) {
                console.error("Erro ao buscar especialistas:", error);
                alert("Não foi possível carregar la lista de médicos.");
            } finally {
                setCarregando(false);
            }
        };

        carregarDadosIniciais();
    }, []);

    const handleEspecialistaChange = (item: Especialista) => {
        setEspecialistaId(item.id);
        setHorarioSelecionadoId(null);

        const livres = item.horarios_disponiveis.filter(h => h.disponivel === true);
        setHorariosFiltrados(livres);
    };

    const salvarConsulta = async () => {
        if (!formularioValido) return;

        const novaConsulta = {
            data: converterDataDjango(data),
            horario_selecionado: Number(horarioSelecionadoId),
            localizacao: localizacao.trim(),
            especialista: Number(especialistaId)
        };

        try {
            const response = await api.post('consultas/', novaConsulta);
            adicionarConsulta(response.data);
            router.back();
        } catch (error: any) {
            console.error("Operação falhou:", error.response?.data);
            if (error.response?.data) {
                alert(`Erro na validação do Django: ${JSON.stringify(error.response.data)}`);
            } else {
                alert("Não foi possível confirmar o agendamento.");
            }
        }
    };

    const converterDataDjango = (dataBr: string) => {
        const [dia, mes, ano] = dataBr.split("/");
        return `${ano}-${mes}-${dia}`;
    };

    if (carregando) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F7FA' }}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 10, color: '#444' }}>Carregando especialistas...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={estiloAgendar.container}>
            <Text style={estiloAgendar.titulo}>Agendar Nova Consulta</Text>

            <Text style={estiloAgendar.label}>Médico / Especialidade</Text>
            <Dropdown
                style={estiloAgendar.input}
                containerStyle={{ borderRadius: 12, overflow: 'hidden' }}
                placeholderStyle={{ color: '#999', fontSize: 16 }}
                selectedTextStyle={{ color: '#333', fontSize: 16 }}
                inputSearchStyle={{ borderRadius: 8 }}
                data={especialistas}
                search
                maxHeight={300}
                labelField="nome"
                valueField="id"
                placeholder="Selecione o médico"
                searchPlaceholder="Buscar médico..."
                value={especialistaId}
                onChange={handleEspecialistaChange}
                renderItem={(item: Especialista) => (
                    <View style={{ padding: 14, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{item.nome}</Text>
                        <Text style={{ fontSize: 14, color: '#007AFF', marginTop: 2 }}>{item.especialidade}</Text>
                    </View>
                )}
            />

            <Text style={estiloAgendar.label}>Horário Disponível</Text>
            <Dropdown
                style={[estiloAgendar.input, !especialistaId && { backgroundColor: '#E2E8F0' }]}
                containerStyle={{ borderRadius: 12, overflow: 'hidden' }}
                placeholderStyle={{ color: '#999', fontSize: 16 }}
                selectedTextStyle={{ color: '#333', fontSize: 16 }}
                inputSearchStyle={{ borderRadius: 8 }}
                data={horariosFiltrados}
                maxHeight={300}
                labelField="horario"
                valueField="id"
                placeholder={especialistaId ? "Selecione o horário" : "Selecione um médico primeiro"}
                value={horarioSelecionadoId}
                disable={!especialistaId}
                onChange={item => {
                    setHorarioSelecionadoId(Number(item.id));
                }}
            />

            <Text style={estiloAgendar.label}>Data</Text>
            <TextInput
                placeholder="DD/MM/AAAA"
                value={data}
                onChangeText={(t) => setData(mascaraData(t))}
                maxLength={10}
                style={[estiloAgendar.input, dataInvalida && { borderColor: 'red', borderWidth: 2 }]}
                keyboardType="number-pad"
            />
            {dataInvalida && <Text style={{ color: 'red', marginLeft: 4, marginBottom: 10 }}>Data inválida ou retroativa.</Text>}

            <Text style={estiloAgendar.label}>Localização</Text>
            <TextInput
                placeholder="Ex: Ala A, Sala 10"
                value={localizacao}
                onChangeText={setLocalizacao}
                maxLength={50}
                style={estiloAgendar.input}
            />

            <TouchableOpacity
                style={[estiloAgendar.botaoSalvar, !formularioValido && { backgroundColor: '#CCC' }]}
                onPress={salvarConsulta}
                disabled={!formularioValido}
            >
                <Text style={estiloAgendar.textoBotao}>Confirmar Agendamento</Text>
            </TouchableOpacity>

            <TouchableOpacity style={estiloAgendar.btnVoltar} onPress={() => router.back()}>
                <Text style={estiloAgendar.textVoltar}>Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}