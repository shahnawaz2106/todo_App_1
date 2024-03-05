
import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';

const AddTodoScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(
        addTodo({
          title: text.trim(),
          completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      );
      setText('');
      navigation.navigate('Main');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#b5baba' }}>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 10, width: '80%', borderRadius: 10 }}
        placeholder="Enter Todo"
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={handleAddTodo}>
        <Text
          style={styles.btnTxt}>
          Add Todo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoScreen;

const styles=StyleSheet.create({
    btn:{
        width: '80%',
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
            fontWeight: 'bold'
    }
})
