import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useProdutos } from '../contexts/ProdutosContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Cadastro: undefined;
  Atualizar: { produto: any };
  Remover: undefined;
  Listar: undefined;
};

type ListarProdutosNavigationProp = StackNavigationProp<RootStackParamList, 'Listar'>;

interface Produto {
  id: number;
  nome: string;
  tamanho: string;
  cor: string;
  marca: string;
  precoCompra: number;
  precoVenda: number;
  quantidade: number;
}

const ListarProdutos = () => {
  const { produtos, removerProduto } = useProdutos();
  const navigation = useNavigation<ListarProdutosNavigationProp>();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProdutos, setFilteredProdutos] = useState(produtos);

  useEffect(() => {
    if (searchTerm) {
      const filtered = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProdutos(filtered);
    } else {
      setFilteredProdutos(produtos);
    }
  }, [produtos, searchTerm]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Remover Produto',
      'Tem certeza de que deseja remover este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => removerProduto(id),
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (produto: Produto) => {
    navigation.navigate('Atualizar', { produto });
  };

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>ID: {item.id}</Text>
        <Text style={styles.title}>{item.nome}</Text>
        <Text>Tamanho: {item.tamanho}</Text>
        <Text>Cor: {item.cor}</Text>
        <Text>Marca: {item.marca}</Text>
        <Text>Preço de Compra: R$ {item.precoCompra.toFixed(2)}</Text>
        <Text>Preço de Venda: R$ {item.precoVenda.toFixed(2)}</Text>
        <Text>Quantidade: {item.quantidade}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Icon name="edit" size={24} color="#6044FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="delete" size={24} color="#FF4D4D" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar produto..."
        value={searchTerm}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredProdutos}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#97A5FF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#97A5FF',
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
});

export default ListarProdutos;
