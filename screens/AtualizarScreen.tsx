import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useProdutos } from '../contexts/ProdutosContext';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Atualizar: { produto: any };
};

type AtualizarProdutoRouteProp = RouteProp<RootStackParamList, 'Atualizar'>;

const AtualizarProduto = () => {
  const { atualizarProduto } = useProdutos();
  const route = useRoute<AtualizarProdutoRouteProp>();
  const navigation = useNavigation();
  const produto = route.params?.produto;

  if (!produto) {
    Alert.alert('Erro', 'Produto não encontrado');
    navigation.goBack();
    return null;
  }

  const [nome, setNome] = useState(produto.nome || '');
  const [tamanho, setTamanho] = useState(produto.tamanho || '');
  const [cor, setCor] = useState(produto.cor || '');
  const [marca, setMarca] = useState(produto.marca || '');
  const [precoCompra, setPrecoCompra] = useState(String(produto.precoCompra || ''));
  const [precoVenda, setPrecoVenda] = useState(String(produto.precoVenda || ''));
  const [quantidade, setQuantidade] = useState(String(produto.quantidade || ''));

  const handleAtualizar = () => {
    if (nome && quantidade && precoCompra && precoVenda) {
      atualizarProduto(produto.id, {
        nome,
        tamanho,
        cor,
        marca,
        precoCompra: parseFloat(precoCompra),
        precoVenda: parseFloat(precoVenda),
        quantidade: parseInt(quantidade, 10),
      });
      Alert.alert('Produto atualizado com sucesso!');
      navigation.goBack();
    } else {
      Alert.alert('Preencha todos os campos necessários');
    }
  };

  return (
    <View style={styles.container}>
      <Text>ID do Produto: {produto.id}</Text>
      <Text>Nome do Produto:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text>Tamanho:</Text>
      <TextInput style={styles.input} value={tamanho} onChangeText={setTamanho} />

      <Text>Cor:</Text>
      <TextInput style={styles.input} value={cor} onChangeText={setCor} />

      <Text>Marca:</Text>
      <TextInput style={styles.input} value={marca} onChangeText={setMarca} />

      <Text>Preço de Compra:</Text>
      <TextInput
        style={styles.input}
        value={precoCompra}
        onChangeText={setPrecoCompra}
        keyboardType="numeric"
      />

      <Text>Preço de Venda:</Text>
      <TextInput
        style={styles.input}
        value={precoVenda}
        onChangeText={setPrecoVenda}
        keyboardType="numeric"
      />

      <Text>Quantidade:</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleAtualizar}>
        <Text style={styles.buttonText}>Atualizar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderRadius: 15,
    borderColor: '#97A5FF',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#6044FF', // Cor de fundo do botão
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AtualizarProduto;
