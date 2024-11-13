import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useProdutos } from '../contexts/ProdutosContext';

const RemoverProduto = () => {
  const { removerProduto } = useProdutos();
  const [produtoId, setProdutoId] = useState('');

  const handleRemover = () => {
    const id = parseInt(produtoId, 10);
    if (!isNaN(id)) {
      removerProduto(id);
      Alert.alert('Produto removido com sucesso!');
      setProdutoId('');
    } else {
      Alert.alert('Informe um ID válido do produto');
    }
  };

  return (
    <View style={styles.container}>
      <Text>ID do Produto para Remover:</Text>
      <TextInput
        style={styles.input}
        value={produtoId}
        onChangeText={setProdutoId}
        keyboardType="numeric"
      />

      <Button title="Remover Produto" onPress={handleRemover} />
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
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default RemoverProduto;
