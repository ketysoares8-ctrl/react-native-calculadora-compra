import React, { useMemo, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { Ionicons } from '@expo/vector-icons';

// Função para exibir alertas
const exibirAlerta = (titulo: string, mensagem: string) => {
  if (Platform.OS === 'web') {
    alert(`${titulo}: ${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
};

interface ResultadoCalculo {
  valorFinal: number;
  valorParcela?: number;
}

export default function App() {
  // Configuração dos RadioButtons
  const radioButtons = useMemo(() => [
    { id: '1', label: 'compra à vista', value: '1' },
    { id: '2', label: 'compra parcelada', value: '2' }
  ], []);

  const [selectedId, setSelectedId] = useState('1');
  const [valorCompra, setValorCompra] = useState('');
  const [qtdParcelas, setQtdParcelas] = useState('');
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);

  const calcular = () => {
    //conversão do valor digitado
    const valor = parseFloat(valorCompra.replace(',', '.'));

    if (isNaN(valor) || valor <= 0) {
      exibirAlerta('Erro', 'Por favor, digite um valor de compra válido.');
      return;
    }

    if (selectedId === '1') {
      // 1. Pagamento à vista: 5% de desconto
      const valorFinal = valor * 0.95;
      setResultado({ valorFinal });
    } else {
      // 2. Compra parcelada
      const parcelas = parseInt(qtdParcelas, 10);

      // Validação: a quantidade de parcelas deve ser maior que 1
      if (isNaN(parcelas) || parcelas <= 1) {
        exibirAlerta('Erro', 'A quantidade de parcelas deve ser maior que 1 para compra parcelada.');
        return;
      }

      let acréscimo = 0;
      if (parcelas === 2 || parcelas === 3) {
        acréscimo = 0.05; // 5% de acréscimo para 2 ou 3 parcelas
      } else if (parcelas > 3) {
        acréscimo = 0.15; // 15% de acréscimo para mais de 3 parcelas
      }

      const valorFinal = valor * (1 + acréscimo);
      const valorParcela = valorFinal / parcelas;

      setResultado({
        valorFinal,
        valorParcela
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Ícone ilustrativo no topo */}
      <Ionicons name="cart-outline" size={60} color="#007BFF" style={styles.icone} />

      <Text style={styles.titulo}>Compra</Text>

      {/* entrada do valor da compra */}
      <TextInput
        style={styles.input}
        placeholder="digite o valor da compra"
        keyboardType="numeric"
        value={valorCompra}
        onChangeText={setValorCompra}
      />

      {/* Entrada da quantidade de parcelas */}
      <TextInput
        style={styles.input}
        placeholder="digite a qtde. de parcelas"
        keyboardType="numeric"
        value={qtdParcelas}
        onChangeText={setQtdParcelas}
      />

      {/* Opções de Pagamento (RadioGroup) */}
      <View style={styles.containerRadioButtons}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          containerStyle={{ alignItems: 'flex-start' }}
        />
      </View>

      {/* Botão Calcular */}
      <TouchableOpacity style={styles.botao} onPress={calcular}>
        <Text style={styles.textoBotao}>Calcular</Text>
      </TouchableOpacity>

      {/* Mostra Resultados */}
      {resultado !== null && (
        <View style={styles.containerResultado}>
          <Text style={styles.textoResultado}>
            Valor final da compra: R$ {resultado.valorFinal.toFixed(2)}
          </Text>
          {resultado.valorParcela !== undefined && (
            <Text style={styles.textoResultado}>
              Valor das parcelas: R$ {resultado.valorParcela.toFixed(2)}
            </Text>
          )}
        </View>
      )}

      {/* Identificação do Aluno */}
      <View style={styles.rodape}>
        <Text style={styles.textoRodape}>Ketly Soares dos Santos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  icone: {
    marginBottom: 10
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16
  },
  containerRadioButtons: {
    width: '80%',
    marginVertical: 10
  },
  botao: {
    width: '80%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  containerResultado: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#d4edda',
    borderRadius: 8,
    width: '80%',
    alignItems: 'flex-start'
  },
  textoResultado: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#155724',
    marginVertical: 2
  },
  rodape: {
    marginTop: 30
  },
  textoRodape: {
    fontSize: 12,
    color: '#777'
  }
});