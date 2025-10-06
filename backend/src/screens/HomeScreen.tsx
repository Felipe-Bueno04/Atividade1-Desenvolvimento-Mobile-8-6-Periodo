import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateProduct')}
      >
        <Text style={styles.buttonText}>📦 Cadastrar Produto</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ListProducts')}
      >
        <Text style={styles.buttonText}>📋 Listar Produtos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});