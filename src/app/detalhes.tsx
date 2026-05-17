import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { estiloDetalhe } from '../style/estiloDetalhe';
import { useConsultas } from './consultasContext';

export default function Detalhes() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { excluirConsulta } = useConsultas();

    const dataExibicao = (data: string | string[] | undefined) => {
        if (!data || typeof data !== 'string'){
            return '';
        }
        if (!data.includes('-')){
            return data
        }

        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    const confirmarExclusao = () => {
        Alert.alert(
            "Excluir consulta", 
            "Deseja realmente desmarcar esta consulta?", 
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        if(params.id){
                            await excluirConsulta(String(params.id));
                            router.replace('/')
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={estiloDetalhe.container}>
            <Text style={estiloDetalhe.title}>Detalhes da Consulta</Text>

            <View style={estiloDetalhe.infoCard}>
                <Text style={estiloDetalhe.label}>Médico:</Text>
                <Text style={estiloDetalhe.value}>{params.medico}</Text>

                <Text style={estiloDetalhe.label}>Data e Hora:</Text>
                <Text style={estiloDetalhe.value}>
                    {dataExibicao(params.data)} às {params.hora}
                </Text>

                <Text style={estiloDetalhe.label}>Especialidade:</Text>
                <Text style={estiloDetalhe.value}>{params.especialidade}</Text>

                <Text style={estiloDetalhe.label}>Local da Consulta:</Text>
                <Text style={estiloDetalhe.value}>{params.localizacao}</Text>
            </View>

       
            <TouchableOpacity 
                style={[estiloDetalhe.backButton, { backgroundColor: '#FF3B30', marginBottom: 12 }]} 
                onPress={confirmarExclusao}
            >
                <Text style={estiloDetalhe.backButtonText}>Desmarcar Consulta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={estiloDetalhe.backButton} onPress={() => router.back()}>
                <Text style={estiloDetalhe.backButtonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}