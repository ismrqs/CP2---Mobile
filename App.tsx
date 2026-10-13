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
    if (isNaN(num) || num <= 0) return;

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
    <SafeAreaView style={{ margin: 20 }}>
      <TextInput
        placeholder="Digite o valor"
        value={inputValue}
        onChangeText={setInputValue}
        keyboardType="numeric"
      />

      <Button title="Entrou" color="green" onPress={() => addTransaction('Entrou')} />
      <Button title="Saiu" color="red" onPress={() => addTransaction('Saiu')} />

      <Text style={{ marginVertical: 10 }}>Total: R$ {total.toFixed(2)}</Text>

      <Text style={{ fontWeight: 'bold' }}>Histórico</Text>

      <FlatList
        data={transactions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <Text>{item.type}: R$ {item.value.toFixed(2)} </Text>
            <Button title="X"  color="red" onPress={() => deleteTransaction(index)} />
          </View>
        )}
        ListEmptyComponent={
          <Text>Nenhuma transação ainda.</Text>
        }
      />
    </SafeAreaView>
  );
}