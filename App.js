import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [estado,  setarEstado] = useState('leitura');
  const[anotacao, setarAnotacao] = useState('');

  useEffect(()=>{
  
    // quando iniciar o apo leia aqui
    (async () => {
      try{
       const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
       setarAnotacao(anotacaoLeitura);
      }catch(error){
        alert('o motivo do erro:' + error)
      }
    })()
   
  },[])

  const setData = async() => {
    try{
      await AsyncStorage.setItem('anotacao', anotacao);
    }catch(error){

    }
    alert("sua anotação foi salva com sucesso")
  }

  function atualizarTexto(){
    setarEstado('leitura');
    setData();
  }

  if(estado == "leitura"){
    return (
      <View style={{flex: 1 }}>
        <StatusBar hidden />
        <View style={styles.header}><Text style={{textAlign: 'center',color:'white',fontSize:18}}>Aplicativo de Anotação</Text></View>
        
        {
          (anotacao != '')?
        <View style={{padding:10}}><Text style={styles.anotacao}>{anotacao}</Text></View>
        :
        <View style={{padding:10}}><Text style={{opacity:0.3}}>Nenhuma anotação encontrada :(</Text></View>
        }

        <TouchableOpacity onPress={()=> setarEstado('atualizado')} style={styles.btnAnotacao}>
          
          {
            (anotacao == "")?
          <Text style={styles.btnAnotacaoTexto}>+</Text>
          :
          <Text style={{fontSize:12, color:'white', textAlign:'center', marginTop:16}}>Editar</Text>
          }
          </TouchableOpacity>
      </View>
    );

  }else if(estado == "atualizado"){
    return(
    <View style={{flex: 1 }}> 
    <StatusBar hidden />
    <View style={styles.header}><Text style={{textAlign: 'center',color:'white',fontSize:18}}>Aplicativo de Anotação</Text></View>

    <TextInput autoFocus={true} onChangeText={(text)=>setarAnotacao(text)} style={{padding:20,height: 300, textAlignVertical:'top'}} multiline={true} numberOfLines={5} value={anotacao}></TextInput>
    <TouchableOpacity  onPress={()=> atualizarTexto()} style={styles.btnSalvar}><Text style={{textAlign:'center',color:'white'}}>Salvar</Text></TouchableOpacity>
  </View>
    );
  }
}

const styles = StyleSheet.create({
   header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#069"
    },
   anotacao:{
     fontSize:13
   },
   btnAnotacao:{
     position: 'absolute',
     right:20,
     bottom:20,
     width: 50,
     height: 50,
     backgroundColor: '#069',
     borderRadius: 25
   },
   btnAnotacaoTexto: {
     color: 'white',
     position: 'relative',
     textAlign: 'center',
     top: 15
   },
   btnSalvar:{
    position: 'absolute',
    right:20,
    bottom:20,
    width: 100,
    padding: 15,
    backgroundColor: '#069'
  }
});