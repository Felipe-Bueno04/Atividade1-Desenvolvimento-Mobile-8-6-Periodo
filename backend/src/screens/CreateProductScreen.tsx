import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productCreateSchema, ProductCreateForm } from '../validators/product';
import { api } from '../api/api';
import { ProductCreate } from '../types/product';

const CATEGORIES = [
  { label: 'Hardware', value: 'HARDWARE' },
  { label: 'Software', value: 'SOFTWARE' },
  { label: 'Acessórios', value: 'ACESSORIOS' },
  { label: 'Serviços', value: 'SERVICOS' },
  { label: 'Outros', value: 'OUTROS' },
];

export default function CreateProductScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductCreateForm>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      preco: 0,
      categoria: 'HARDWARE',
      estoque: 0,
      ativo: true,
    },
  });

  const onSubmit = async (data: ProductCreateForm) => {
    try {
      setLoading(true);

      const productData: ProductCreate = {
        nome: data.nome,
        descricao: data.descricao || undefined,
        preco: data.preco,
        categoria: data.categoria,
        estoque: data.estoque,
        ativo: data.ativo,
      };

      await api.post('/products', productData);
      
      Alert.alert('Sucesso', 'Produto criado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      console.error('Error creating product:', error);
      Alert.alert('Erro', error.response?.data?.error || 'Não foi possível criar o produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, errors.nome && styles.inputError]}
              placeholder="Nome do produto*"
              value={value}
              onChangeText={onChange}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="descricao"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, styles.textArea, errors.descricao && styles.inputError]}
              placeholder="Descrição (opcional)"
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={3}
            />
            {errors.descricao && <Text style={styles.errorText}>{errors.descricao.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="preco"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, errors.preco && styles.inputError]}
              placeholder="Preço*"
              value={value.toString()}
              onChangeText={(text) => onChange(text)}
              keyboardType="numeric"
            />
            {errors.preco && <Text style={styles.errorText}>{errors.preco.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="categoria"
        render={({ field: { onChange, value } }) => (
          <View>
            <View style={[styles.pickerContainer, errors.categoria && styles.inputError]}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
              >
                {CATEGORIES.map((cat) => (
                  <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
                ))}
              </Picker>
            </View>
            {errors.categoria && <Text style={styles.errorText}>{errors.categoria.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="estoque"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={[styles.input, errors.estoque && styles.inputError]}
              placeholder="Estoque"
              value={value.toString()}
              onChangeText={(text) => onChange(text)}
              keyboardType="numeric"
            />
            {errors.estoque && <Text style={styles.errorText}>{errors.estoque.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="ativo"
        render={({ field: { onChange, value } }) => (
          <View style={styles.switchContainer}>
            <Text>Produto ativo:</Text>
            <Switch
              value={value}
              onValueChange={onChange}
            />
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar Produto</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
});