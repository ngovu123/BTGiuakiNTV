import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, List, IconButton } from 'react-native-paper';
import { firebase } from '../config';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const todoRef = firebase.firestore().collection('todos');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = todoRef.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading, complete } = doc.data();
        todos.push({
          id: doc.id,
          heading,
          complete,
        });
      });
      setTodos(todos);
    });
    return () => unsubscribe();
  }, []);

  const deleteTodo = (todo) => {
    todoRef
      .doc(todo.id)
      .delete()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Todo deleted successfully!',
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addTodo = () => {
    if (newTodo && newTodo.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: newTodo,
        complete: false,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setNewTodo('');

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Todo added successfully!',
          });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const toggleComplete = (todo) => {
    todoRef
      .doc(todo.id)
      .update({
        complete: !todo.complete,
      })
      .then(() => {
        
      })
      .catch((error) => {
        alert(error);
      });
  };

  const navigateToDetail = (item) => {
    navigation.navigate('Detail', { item });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="TODOs List" />
      </Appbar.Header>
      <ScrollView style={styles.scrollView}>
        {todos.map((item) => (
          <List.Item
            key={item.id}
            title={item.heading}
            left={() => (
              <IconButton
                icon={item.complete ? 'check-circle' : 'cancel'}
                color={item.complete ? 'green' : 'red'}
                onPress={() => toggleComplete(item)}
              />
            )}
            right={() => (
              <IconButton
                icon="delete"
                color="red"
                onPress={() => deleteTodo(item)}
              />
            )}
            onPress={() => navigateToDetail(item)}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          label="New Todo"
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
          style={styles.textInput}
        />
        <Button
          icon="send"
          mode="contained"
          onPress={addTodo}
          style={styles.addButton}
          color="blue" 
        >
          Add
        </Button>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#788eec',
  },
});

export default Home;
