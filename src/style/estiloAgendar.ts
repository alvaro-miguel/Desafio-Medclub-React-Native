import { StyleSheet } from "react-native";

export const estiloAgendar = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        padding: 20,
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#0D47A1",
        textAlign: "center",
        marginBottom: 30,
        marginTop: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: "#FFF",
        padding: 14,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    botaoSalvar: {
        backgroundColor: "#007AFF",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        elevation: 2,
    },
    textoBotao: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    btnVoltar:{
    marginTop: 30, 
    backgroundColor: '#007AFF', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center' 
    },
    textVoltar:{
        color: '#FFF', 
        fontWeight: 'bold'
    },
});