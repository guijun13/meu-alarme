import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTasks = ({ navigation }) => {
  const [task, setTask] = useState({ name: '', date: { day: '', hour: '' } });
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    // Load tasks data from AsyncStorage
    const loadTasks = async () => {
      try {
        const tasksData = await AsyncStorage.getItem('tasks');
        if (tasksData !== null) {
          setTasks(JSON.parse(tasksData));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    // Save tasks data to AsyncStorage whenever tasks state changes
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.log(error);
      }
    };

    saveTasks();
  }, [tasks]);

  const handleAddTask = () => {
    if (task) {
      if (editIndex !== -1) {
        // Edit existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        // Add new task
        setTasks([...tasks, task]);
      }
      setTask({ name: '', date: { day: '', hour: '' } });
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <Text style={styles.itemList}>{item.name}</Text>
      <Text style={styles.itemList}>{item.date.day}</Text>
      <Text style={styles.itemList}>{item.date.hour}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Text style={styles.deleteButton}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  console.log('tasks: ', tasks);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ViewTasks', tasks)}
      >
        <Text style={styles.addButtonText}>Ver to-do list</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da tarefa"
        value={task.name}
        onChangeText={(text) => setTask({ ...task, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o dia da tarefa"
        value={task.date.day}
        onChangeText={(text) => setTask({ ...task, date: { ...task.date, day: text } })}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a hora da tarefa"
        value={task.date.hour}
        onChangeText={(text) => setTask({ ...task, date: { ...task.date, hour: text } })}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>{editIndex !== -1 ? 'Atualizar' : 'Adicionar'}</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
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
});

export default EditTasks;
const handleAddTask = () => {
  if (task) {
    if (editIndex !== -1) {
      // Edit existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(-1);
    } else {
      // Add new task
      setTasks([...tasks, task]);
    }
    setTask({ name: '', date: { day: '', hour: '' } });

    // Navigate to ViewTasks screen and pass tasks data as parameter
    navigation.navigate('ViewTasks', { tasks: tasks });
  }
};
