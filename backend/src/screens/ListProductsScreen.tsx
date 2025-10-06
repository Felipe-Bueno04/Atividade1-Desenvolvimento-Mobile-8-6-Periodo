import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { api } from '../api/api';
import { Product, ProductListResponse } from '../types/product';

export default function ListProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const loadProducts = useCallback(async (pageNum: number = 1, searchTerm: string = '', isRefresh = false) => {
  try {
    console.log('🔍 Iniciando carga de produtos...');
    
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    const response = await api.get<ProductListResponse>(
      `/products?page=${pageNum}&limit=10&search=${searchTerm}`
    );
    
    console.log('✅ Produtos carregados:', response.data);
    console.log('📦 Número de produtos:', response.data.products.length);
    
    if (pageNum === 1 || isRefresh) {
      setProducts(response.data.products);
    } else {
      setProducts(prev => [...prev, ...response.data.products]);
    }
    
    setHasMore(pageNum < response.data.pagination.totalPages);
    setTotal(response.data.pagination.total);
    
  } catch (error: any) {
    console.error('❌ Erro carregando produtos:', error);
    Alert.alert('Erro', 'Não foi possível carregar os produtos');
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearch = (text: string) => {
    setSearch(text);
    setPage(1);
    loadProducts(1, text);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(nextPage, search);
    }
  };

  const onRefresh = () => {
    setPage(1);
    loadProducts(1, search, true);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.productPrice}>R$ {item.preco.toFixed(2)}</Text>
      <Text style={styles.productCategory}>Categoria: {item.categoria}</Text>
      <Text style={styles.productStock}>Estoque: {item.estoque}</Text>
      <Text style={[styles.productStatus, { color: item.ativo ? 'green' : 'red' }]}>
        {item.ativo ? '🟢 Ativo' : '🔴 Inativo'}
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Buscar produtos..."
        value={search}
        onChangeText={handleSearch}
      />
      
      <Text style={styles.resultsText}>
        {total} produto(s) encontrado(s)
      </Text>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id_produto.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 3,
    fontWeight: '600',
  },
  productCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  productStock: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  productStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
});