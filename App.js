import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import FormularioEvento from './components/FormularioEvento';
import DetalleEvento from './components/DetalleEvento';
import ListaEventos from './components/ListaEventos';
import { db, isFirebaseConfigured } from './lib/firebase';

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
      if (isFirebaseConfigured) {
        const eventosRef = collection(db, 'eventos');
        const consulta = query(eventosRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(consulta);

        const eventosRemotos = snapshot.docs.map((eventoDoc) => {
          const data = eventoDoc.data();
          return {
            id: eventoDoc.id,
            ...data,
            categoria: normalizarCategoria(data.categoria),
          };
        });

        setEventos(eventosRemotos);
        await AsyncStorage.setItem('eventos', JSON.stringify(eventosRemotos));
        return;
      }

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
      if (isFirebaseConfigured) {
        const payload = {
          ...nuevoEvento,
          categoria: normalizarCategoria(nuevoEvento.categoria),
          createdAt: serverTimestamp(),
        };

        const docCreado = await addDoc(collection(db, 'eventos'), payload);

        const eventosActualizados = [
          {
            ...payload,
            createdAt: null,
            id: docCreado.id,
          },
          ...eventos,
        ];

        setEventos(eventosActualizados);
        await AsyncStorage.setItem('eventos', JSON.stringify(eventosActualizados));
        setVistaActual('lista');
        return;
      }

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
      if (isFirebaseConfigured) {
        await deleteDoc(doc(db, 'eventos', idEvento));
      }

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
