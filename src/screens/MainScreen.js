
import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTodos} from '../store/todoSlice';
import TodoItem from '../components/TodoItem';
import {Picker} from '@react-native-picker/picker';

const MainScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleFilterChange = value => {
    setFilter(value);
  };

  const sortTodosByRecent = () => {
    return todos
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'done':
        return todos.filter(todo => todo.completed);
      case 'recent':
        return sortTodosByRecent();
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <View
      style={styles.container}>
      <View
        style={styles.dropDown}>
        <Picker
          selectedValue={filter}
          onValueChange={handleFilterChange}>
          <Picker.Item
            style={{color: '#000', fontSize: 20}}
            label="All"
            value="all"
          />
          <Picker.Item
            style={{color: '#000', fontSize: 20}}
            label="Active"
            value="active"
          />
          <Picker.Item
            style={{color: '#000', fontSize: 20}}
            label="Done"
            value="done"
          />
          <Picker.Item
            style={{color: '#000', fontSize: 20}}
            label="Most Recent"
            value="recent"
          />
        </Picker>
      </View>
      <FlatList
        data={filteredTodos}
        renderItem={({item}) => <TodoItem todo={item} />}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('AddTodo')}>
        <Text
          style={styles.btnTxt}>
          Add Todo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;

const styles=StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#b8baba',
    },
    dropDown: {
        borderWidth: 1,
          borderRadius: 10,
          width: '98%',
          backgroundColor: '#787a7a',
          alignSelf: 'center',
          marginBottom: 5,
          marginTop: 10,
    },
    btn: {
        width: '98%',
        alignSelf: 'center',
        height: 50,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
    },
    btnTxt: {
        color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
    }
})
