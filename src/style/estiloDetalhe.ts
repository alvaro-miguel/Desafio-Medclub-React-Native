import { StyleSheet } from "react-native";

export const estiloDetalhe = StyleSheet.create({
    title:{
   fontSize: 24, 
   fontWeight: 'bold', 
   marginBottom: 20, 
   textAlign: 'center', 
   color: '#0D47A1'
  },
  container:{ 
    flex: 1, 
    paddingTop: 50, 
    backgroundColor: '#F5F7FA' 
},
  infoCard:{
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 12, 
    elevation: 4
  },
  label:{
    fontSize: 14, 
    color: '#666', 
    marginTop: 10,
  },
  value:{
    fontSize: 18, 
    fontWeight: '600', 
    color: '#333',
  },
  backButton:{ 
    marginTop: 30, 
    backgroundColor: '#007AFF', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  backButtonText:{ 
    color: '#FFF', 
    fontWeight: 'bold' 
},
})