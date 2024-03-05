
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {toggleTodo, deleteTodo} from '../store/todoSlice';

const TodoItem = React.memo(
  ({todo}) => {
    const dispatch = useDispatch();

    const handleToggleTodo = () => {
      dispatch(toggleTodo(todo.id));
    };

    const handleDeleteTodo = () => {
      dispatch(deleteTodo(todo.id));
    };

    const formatTimestamp = timestamp => {
      if (!timestamp) return ''; // Return empty string if timestamp is undefined or null
      const date = new Date(timestamp);
      return date.toString() !== 'Invalid Date' ? date.toString() : ''; // Return formatted timestamp or empty string if invalid
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity style={{width: '80%'}} onPress={handleToggleTodo}>
          <Text>
            {todo.completed ? (
              <Text style={styles.text}>
                {todo.title}
                <Text style={{color: 'green'}}> Completed</Text>
              </Text>
            ) : (
              <Text style={styles.text}>{todo.title}</Text>
            )}
          </Text>
          <Text style={styles.timestamp}>
            Created: {formatTimestamp(todo.created_at)}
          </Text>
          <Text style={styles.timestamp}>
            Updated: {formatTimestamp(todo.updated_at)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteTodo}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.todo === nextProps.todo;
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    borderColor: 'lightgray',
    padding: 10,
    backgroundColor: '#313333',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold'
  },
  deleteButton: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'red',
  },
});

export default TodoItem;
