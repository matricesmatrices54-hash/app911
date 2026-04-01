//Eliam Diclo 2024-0067
//17/03/2026

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FormularioEvento({ onGuardar, onCancelar }) {
  const [fecha, setFecha] = useState(new Date().toLocaleDateString('es-DO'));
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Laptops');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState(null);

  const categorias = ['Laptops', 'Celulares', 'Tablets', 'Monitores', 'Periféricos', 'Otros'];

  const seleccionarFoto = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permiso.granted) {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!resultado.canceled) {
        setFoto(resultado.assets[0].uri);
      }
    } else {
      Alert.alert('Permiso Denegado', 'Necesitamos acceso a tus fotos');
    }
  };

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (permiso.granted) {
      const resultado = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!resultado.canceled) {
        setFoto(resultado.assets[0].uri);
      }
    } else {
      Alert.alert('Permiso Denegado', 'Necesitamos acceso a la cámara');
    }
  };

  const handleGuardar = () => {
    if (!titulo.trim()) {
      Alert.alert('Error', 'El título es obligatorio');
      return;
    }
    if (!descripcion.trim()) {
      Alert.alert('Error', 'La descripción es obligatoria');
      return;
    }
    if (!foto) {
      Alert.alert('Error', 'Debes agregar una foto del evento');
      return;
    }
    const nuevoEvento = {
      fecha,
      titulo,
      categoria,
      descripcion,
      foto
    };
    onGuardar(nuevoEvento);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📝 Nuevo Equipo</Text>
        <Text style={styles.headerSubtitle}>Registro de de Equipos</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.campo}>
          <Text style={styles.label}>📅 Fecha</Text>
          <TextInput
            style={styles.input}
            value={fecha}
            onChangeText={setFecha}
            placeholder="DD/MM/AAAA"
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>📝 Nombre del Equipo</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ej: Laptop, Celular, etc."
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>🏷️ Categoría</Text>
          <View style={styles.categoriasContainer}>
            {categorias.map((itemCategoria) => {
              const seleccionada = categoria === itemCategoria;
              return (
                <TouchableOpacity
                  key={itemCategoria}
                  style={[
                    styles.categoriaChip,
                    seleccionada && styles.categoriaChipActiva,
                  ]}
                  onPress={() => setCategoria(itemCategoria)}
                >
                  <Text
                    style={[
                      styles.categoriaChipTexto,
                      seleccionada && styles.categoriaChipTextoActivo,
                    ]}
                  >
                    {itemCategoria}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>🗒️ Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Describe el Equipo, su estado, y cualquier detalle relevante"
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>📸 Foto del equipo</Text>
          <View style={styles.botonesContainer}>
            <TouchableOpacity style={styles.botonFoto} onPress={tomarFoto}>
              <Text style={styles.textoBotonFoto}>📷 Tomar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonFoto} onPress={seleccionarFoto}>
              <Text style={styles.textoBotonFoto}>🖼️ Galería</Text>
            </TouchableOpacity>
          </View>
          {foto && (
            <Image source={{ uri: foto }} style={styles.imagenPrevia} />
          )}
        </View>
        <View style={styles.botonesAccion}>
          <TouchableOpacity
            style={[styles.boton, styles.botonCancelar]}
            onPress={onCancelar}
          >
            <Text style={styles.textoBoton}>❌ Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.boton, styles.botonGuardar]}
            onPress={handleGuardar}
          >
            <Text style={styles.textoBoton}>💾 Guardar</Text>
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
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  campo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoriasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoriaChip: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  categoriaChipActiva: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  categoriaChipTexto: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  categoriaChipTextoActivo: {
    color: '#fff',
  },
  botonesContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  botonFoto: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotonFoto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagenPrevia: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  botonesAccion: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    marginBottom: 40,
  },
  boton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonCancelar: {
    backgroundColor: '#6b7280',
  },
  botonGuardar: {
    backgroundColor: '#16a34a',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
