import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ViewTasks = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Próxima atividade:</Text>
      <View style={styles.nextTask}>
        <Text style={styles.nextTaskItem}>Tomar remédio</Text>
        <Text style={styles.time}>10:00</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.tasksList}>
        <View style={styles.task}>
          <Text style={styles.itemList}>Tomar água</Text>
          <Text style={styles.time}>10:10</Text>
        </View>
        <View style={styles.task}>
          <Text style={styles.itemList}>Almoçar</Text>
          <Text style={styles.time}>11:00</Text>
        </View>
        <View style={styles.task}>
          <Text style={styles.itemList}>Tomar remédio</Text>
          <Text style={styles.time}>12:00</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EditTasks')}>
        <Text style={styles.addButtonText}>Ver tarefas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 7,
    color: 'green',
  },
  input: {
    borderWidth: 3,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    fontSize: 18,
  },
  itemList: {
    fontSize: 19,
  },
  taskButtons: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
  nextTask: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  nextTaskItem: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
});

export default ViewTasks;
