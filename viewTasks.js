import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import tasks from './tasks.json';
import formatDate from './utils/formatDate';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const ViewTasks = ({ navigation }) => {
  const tasksArray = Array.from(tasks);
  const firstTask = tasksArray[0];
  const remainingTasks = tasksArray.slice(1);

  useEffect(() => {
    const tasksArray = Array.from(tasks);

    if (new Date(firstTask.date) < new Date(Date.now())) {
      console.log('sim');
      tasksArray.shift();
    }

    const scheduledDate = new Date(tasksArray[0].date);

    // Schedule the notification
    const notificationId = Notifications.scheduleNotificationAsync({
      content: {
        title: tasksArray[0].title,
        body: tasksArray[0].description,
      },
      trigger: { date: scheduledDate },
    });

    // Optionally, you can log the notification ID for future reference
    // console.log('Scheduled notification with ID:', notificationId);

    // Clean up the notification if necessary (e.g., when the component unmounts)
    return () => {
      Notifications.cancelScheduledNotificationAsync(notificationId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Próxima atividade:</Text>
      <View style={styles.nextTask}>
        <Text style={styles.nextTaskItem}>{firstTask.title}</Text>
        <Text style={styles.time}>{formatDate(firstTask.date)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.tasksList}>
        {remainingTasks.map((task, index) => (
          <View style={styles.task} key={index}>
            <Text style={styles.itemList}>{task.title}</Text>
            <Text style={styles.time}>{formatDate(task.date)}</Text>
          </View>
        ))}
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
