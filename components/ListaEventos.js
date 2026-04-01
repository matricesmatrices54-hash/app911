//Eliam Diclo 2024-0067
//17/03/2026

import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

export default function ListaEventos({ eventos, onNuevo, onVerDetalle }) {
  const [seccionesAbiertas, setSeccionesAbiertas] = useState({});

  const eventosPorCategoria = useMemo(() => {
    return eventos.reduce((acc, evento) => {
      const categoria = evento.categoria?.trim() || 'Otros';

      if (!acc[categoria]) {
        acc[categoria] = [];
      }

      acc[categoria].push(evento);
      return acc;
    }, {});
  }, [eventos]);

  const categorias = useMemo(() => Object.keys(eventosPorCategoria).sort(), [eventosPorCategoria]);

  const estaSeccionAbierta = (categoria) => {
    const valorGuardado = seccionesAbiertas[categoria];
    return typeof valorGuardado === 'boolean' ? valorGuardado : true;
  };

  const alternarSeccion = (categoria) => {
    setSeccionesAbiertas((previo) => ({
      ...previo,
      [categoria]: !estaSeccionAbierta(categoria),
    }));
  };

  const renderEvento = ({ item }) => (
    <TouchableOpacity
      style={styles.eventoCard}
      onPress={() => onVerDetalle(item)}
    >
      <Image source={{ uri: item.foto }} style={styles.thumbnail} />
      <View style={styles.eventoInfo}>
        <Text style={styles.eventoTitulo} numberOfLines={1}>
          {item.titulo}
        </Text>
        <Text style={styles.eventoFecha}>{item.fecha}</Text>
        <Text style={styles.eventoDescripcion} numberOfLines={2}>
          {item.descripcion}
        </Text>
      </View>
      <Text style={styles.iconoFlecha}></Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matrices Equipos</Text>
        <Text style={styles.headerSubtitle}>
          {eventos.length} equipo{eventos.length !== 1 ? 's' : ''} registrado{eventos.length !== 1 ? 's' : ''}
        </Text>
      </View>
      {eventos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}></Text>
          <Text style={styles.emptyText}>No hay equipos registrados</Text>
          <Text style={styles.emptySubtext}>
            Presiona el botón + para agregar un nuevo equipo
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.lista}>
          {categorias.map((categoria) => {
            const items = eventosPorCategoria[categoria];
            const abierto = estaSeccionAbierta(categoria);

            return (
              <View style={styles.seccionContainer} key={categoria}>
                <TouchableOpacity
                  style={styles.seccionHeader}
                  onPress={() => alternarSeccion(categoria)}
                >
                  <Text style={styles.seccionTitulo}>{categoria}</Text>
                  <Text style={styles.seccionMeta}>
                    {items.length} equipo{items.length !== 1 ? 's' : ''} {abierto ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {abierto && items.map((item) => (
                  <View key={item.id}>{renderEvento({ item })}</View>
                ))}
              </View>
            );
          })}
        </ScrollView>
      )}
      <TouchableOpacity
        style={styles.botonFlotante}
        onPress={onNuevo}
      >
        <Text style={styles.textoBotonFlotante}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#02fd73',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  lista: {
    padding: 15,
  },
  seccionContainer: {
    marginBottom: 12,
  },
  seccionHeader: {
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  seccionMeta: {
    fontSize: 13,
    color: '#4b5563',
    fontWeight: '600',
  },
  eventoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  eventoInfo: {
    flex: 1,
  },
  eventoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventoFecha: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  eventoDescripcion: {
    fontSize: 14,
    color: '#888',
  },
  iconoFlecha: {
    fontSize: 20,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  botonFlotante: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#02fd73',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  textoBotonFlotante: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});
