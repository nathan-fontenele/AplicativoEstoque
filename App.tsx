import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CadastroProduto from './screens/CadastroScreen';
import AtualizarProduto from './screens/AtualizarScreen';
import RemoverProduto from './screens/RemoverScreen';
import ListarProdutos from './screens/ProdutosScreen';
import { ProdutosProvider } from './contexts/ProdutosContext';

type RootStackParamList = {
  Home: undefined;
  Cadastro: undefined;
  Atualizar: undefined;
  Remover: undefined;
  Listar: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ProdutosProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={CadastroProduto} options={{ title: 'Cadastrar Produto' }} />
          <Stack.Screen name="Atualizar" component={AtualizarProduto} options={{ title: 'Atualizar Produto' }} />
          <Stack.Screen name="Remover" component={RemoverProduto} options={{ title: 'Remover Produto' }} />
          <Stack.Screen name="Listar" component={ListarProdutos} options={{ title: 'Listar Produtos' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProdutosProvider>
  );
}
