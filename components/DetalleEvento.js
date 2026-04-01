//Eliam Diclo 2024-0067
//17/03/2026


import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';

export default function DetalleEvento({ evento, onVolver, onEliminar }) {
  if (!evento) return null;

  const ejecutarEliminacion = () => {
    if (typeof onEliminar === 'function') {
      onEliminar(evento.id);
    }
  };

  const confirmarEliminacion = () => {
    if (Platform.OS === 'web') {
      const confirmado = typeof globalThis.confirm === 'function'
        ? globalThis.confirm('¿Seguro que deseas eliminar este evento?')
        : true;

      if (confirmado) {
        ejecutarEliminacion();
      }
      return;
    }

    Alert.alert(
      'Eliminar evento',
      '¿Seguro que deseas eliminar este evento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: ejecutarEliminacion,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onVolver} style={styles.botonVolver}>
          <Text style={styles.textoVolver}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Equipo</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: evento.foto }} style={styles.imagenPrincipal} />

        <View style={styles.infoContainer}>
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha</Text>
            <Text style={styles.valor}>{evento.fecha}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Título</Text>
            <Text style={styles.titulo}>{evento.titulo}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Categoría</Text>
            <Text style={styles.valor}>{evento.categoria || 'Otros'}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Descripción</Text>
            <Text style={styles.descripcion}>{evento.descripcion}</Text>
          </View>

          <View style={styles.infoAdicional}>
            <Text style={styles.textoAdicional}>
              Equipo Registrado en el Sistema de Inventario. Para más información, contacta al departamento de IT.
            </Text>
          </View>

          <TouchableOpacity style={styles.botonEliminar} onPress={confirmarEliminacion}>
            <Text style={styles.textoEliminar}>Eliminar equipo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#00ff88',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  botonVolver: {
    marginBottom: 10,
  },
  textoVolver: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imagenPrincipal: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    padding: 20,
  },
  campo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  valor: {
    fontSize: 16,
    color: '#333',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  descripcion: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  infoAdicional: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  textoAdicional: {
    fontSize: 14,
    color: '#1e40af',
  },
  botonEliminar: {
    marginTop: 20,
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoEliminar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
