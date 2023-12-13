import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import tasksJSON from './tasks.json';
import formatDate from './utils/formatDate';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const ViewTasks = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await AsyncStorage.getItem('tasks');
        if (tasksData !== null) {
          const parsedTasks = JSON.parse(tasksData);
          parsedTasks.map((task) => {
            const taskDateFormat = task.date.day + 'T' + task.date.hour + ':00-03:00';
            task.date = taskDateFormat;
          });
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();

    const scheduleNotification = async () => {
      try {
        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: tasks[0]?.name,
          },
          trigger: { date: new Date(tasks[0]?.date) },
        });
        console.info('Notification scheduled with ID:', notificationId);
      } catch (error) {
        console.error('Failed to schedule notification:', error);
      }
    };

    scheduleNotification();
  }, []);

  // tasks.map((task) => {
  //   const taskDateFormat = task.date.day + 'T' + task.date.hour + ':00.000';
  //   task.date = new Date(taskDateFormat);
  // });

  const firstTask = tasks[0];
  const remainingTasks = tasks.slice(1);

  return (
    <View style={styles.container}>
      {tasks && firstTask ? (
        <React.Fragment>
          <Text style={styles.heading}>Próxima atividade:</Text>
          <View style={styles.nextTask}>
            <Text style={styles.nextTaskItem}>{firstTask.name}</Text>
            <Text style={styles.time}>{formatDate(firstTask.date)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.tasksList}>
            {remainingTasks.map((task, index) => (
              <View style={styles.task} key={index}>
                <Text style={styles.itemList}>{task.name}</Text>
                <Text style={styles.time}>{formatDate(task.date)}</Text>
              </View>
            ))}
          </View>
        </React.Fragment>
      ) : (
        <Text style={styles.heading}>Não há tarefas cadastradas</Text>
      )}

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
