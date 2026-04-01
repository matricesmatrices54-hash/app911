import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormularioEvento from './components/FormularioEvento';
import DetalleEvento from './components/DetalleEvento';
import ListaEventos from './components/ListaEventos';

const normalizarCategoria = (categoria) => {
  const valor = typeof categoria === 'string' ? categoria.trim() : '';
  return valor || 'Otros';
};

export default function App() {
  const [eventos, setEventos] = useState([]);
  const [vistaActual, setVistaActual] = useState('lista');
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const eventosGuardados = await AsyncStorage.getItem('eventos');
      if (eventosGuardados) {
        const eventosParseados = JSON.parse(eventosGuardados);
        const eventosNormalizados = eventosParseados.map((evento) => ({
          ...evento,
          categoria: normalizarCategoria(evento.categoria),
        }));
        setEventos(eventosNormalizados);
      }
    } catch (error) {
      console.log('Error al cargar eventos:', error);
    }
  };

  const guardarEventos = async (nuevoEvento) => {
    try {
      const eventosActualizados = [
        ...eventos,
        {
          ...nuevoEvento,
          categoria: normalizarCategoria(nuevoEvento.categoria),
          id: Date.now().toString(),
        },
      ];
      await AsyncStorage.setItem('eventos', JSON.stringify(eventosActualizados));
      setEventos(eventosActualizados);
      setVistaActual('lista');
    } catch (error) {
      console.log('Error al guardar eventos:', error);
    }
  };

  const verDetalle = (evento) => {
    setEventoSeleccionado(evento);
    setVistaActual('detalle');
  };

  const eliminarEvento = async (idEvento) => {
    try {
      const eventosActualizados = eventos.filter((evento) => evento.id !== idEvento);
      await AsyncStorage.setItem('eventos', JSON.stringify(eventosActualizados));
      setEventos(eventosActualizados);
      setEventoSeleccionado(null);
      setVistaActual('lista');
    } catch (error) {
      console.log('Error al eliminar evento:', error);
    }
  };

  const renderizarVista = () => {
    if (vistaActual === 'lista') {
      return (
        <ListaEventos
          eventos={eventos}
          onNuevo={() => setVistaActual('formulario')}
          onVerDetalle={verDetalle}
        />
      );
    } else if (vistaActual === 'formulario') {
      return (
        <FormularioEvento
          onGuardar={guardarEventos}
          onCancelar={() => setVistaActual('lista')}
        />
      );
    } else if (vistaActual === 'detalle') {
      return (
        <DetalleEvento
          evento={eventoSeleccionado}
          onVolver={() => setVistaActual('lista')}
          onEliminar={eliminarEvento}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderizarVista()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
