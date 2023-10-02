import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { firebase } from '../config';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const Detail = ({ route }) => {
  const todoRef = firebase.firestore().collection('todos');
  const [textHeading, setTextHeading] = useState(route.params.item.heading);
  const navigation = useNavigation();

  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
        })
        .then(() => {
          navigation.goBack();

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Todo updated successfully!',
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Update Todo"
        value={textHeading}
        onChangeText={setTextHeading}
        style={styles.textInput}
      />
      <Button
        icon="check"
        mode="contained"
        onPress={updateTodo}
        style={styles.updateButton}
      >
        Update
      </Button>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  textInput: {
    marginBottom: 10,
  },
  updateButton: {
    marginTop: 10,
  },
});

export default Detail;
