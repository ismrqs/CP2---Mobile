import React, { useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addTransaction = (type: string) => {
    const num = parseFloat(inputValue);
    if (!inputValue.trim() || isNaN(num) || num <= 0) {
      alert('Erro: Por favor, digite apenas números válidos maiores que zero.');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      type: type,
      value: num,
    };

    setTransactions((current) => [...current, newTransaction]);
    if (type === 'Entrou') {
      setTotal((currentTotal) => currentTotal + num);
    } else {
      setTotal((currentTotal) => currentTotal - num);
    }
    setInputValue('');
  };

  const deleteTransaction = (index: number) => {
    setTransactions((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, margin: 20 }}>
      <TextInput
        placeholder="Digite o valor"
        value={inputValue}
        onChangeText={setInputValue}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
      />

      <View style={{ marginVertical: 5 }}>
        <Button title="Entrou" color="green" onPress={() => addTransaction('Entrou')} />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Button title="Saiu" color="red" onPress={() => addTransaction('Saiu')} />
      </View>

      <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: 'bold' }}>
        Total: R$ {total.toFixed(2)}
      </Text>

      <Text style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>Histórico</Text>

      {/* Adicionado flex: 1 aqui para garantir que a lista apareça perfeitamente */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={transactions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5, padding: 5, backgroundColor: '#f0f0f0' }}>
              <Text>{item.type}: R$ {item.value.toFixed(2)}</Text>
              <Button title="X" color="gray" onPress={() => deleteTransaction(index)} />
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ color: '#888', fontStyle: 'italic' }}>Nenhuma transação ainda.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}