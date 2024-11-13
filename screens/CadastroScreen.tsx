// screens/CadastroProduto.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useProdutos } from '../contexts/ProdutosContext';

const CadastroProduto = () => {
  const { adicionarProduto } = useProdutos();
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [cor, setCor] = useState('');
  const [marca, setMarca] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleCadastro = () => {
    if (nome && quantidade && precoCompra && precoVenda) {
      adicionarProduto({
        nome,
        tamanho,
        cor,
        marca,
        precoCompra: parseFloat(precoCompra),
        precoVenda: parseFloat(precoVenda),
        quantidade: parseInt(quantidade),
      });
      Alert.alert('Produto cadastrado com sucesso!');
      setNome('');
      setTamanho('');
      setCor('');
      setMarca('');
      setPrecoCompra('');
      setPrecoVenda('');
      setQuantidade('');
    } else {
      Alert.alert('Preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nome do Produto:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text>Tamanho:</Text>
      <TextInput style={styles.input} value={tamanho} onChangeText={setTamanho} keyboardType="default" />

      <Text>Cor:</Text>
      <TextInput style={styles.input} value={cor} onChangeText={setCor} />

      <Text>Marca:</Text>
      <TextInput style={styles.input} value={marca} onChangeText={setMarca} />

      <Text>Preço de compra por peça:</Text>
      <TextInput
        style={styles.input}
        value={precoCompra}
        onChangeText={setPrecoCompra}
        keyboardType="numeric"
      />

      <Text>Preço de venda por peça:</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
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

export default CadastroProduto;
