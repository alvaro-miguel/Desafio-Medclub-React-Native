import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useConsultas } from './consultasContext'; 
import { estiloLogin } from '../style/estiloLogin'; 
import { router } from 'expo-router';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { login } = useConsultas();

  const handleEntrar = async () => {
    if (!username.trim() || !password.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setCarregando(true);
      await login(username, password);
      router.replace('/');

    } catch (error) {
      console.error("Erro na tela de login:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={estiloLogin.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={estiloLogin.card}>
          <Text style={estiloLogin.titulo}>Bem-vindo</Text>
          <Text style={estiloLogin.subtitulo}>Faça login para gerenciar suas consultas</Text>

          <View style={estiloLogin.blocoInput}>
            <Text style={estiloLogin.label}>Usuário</Text>
            <TextInput 
              style={estiloLogin.input}
              placeholder="Digite seu usuário"
              placeholderTextColor="#A0AEC0"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={estiloLogin.blocoInput}>
            <Text style={estiloLogin.label}>Senha</Text>
            <TextInput 
              style={estiloLogin.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#A0AEC0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry 
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity 
            style={estiloLogin.botao} 
            onPress={handleEntrar}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={estiloLogin.textoBotao}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}