import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
import React, {useState} from 'react';


export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);


  // Add new task
  const handleAddTask = () => {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task])
      setTask(null);
  }
  // Complete task
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  


  return (
    <View style={styles.container}>

      <ScrollView>

      <View style ={styles.tasksWrapper}>

        <Text style= {styles.sectionTitle}>Today's tasks</Text>


     <View style={styles.items}>

        {/* This is where the tasks will go! */}
      
    {
        taskItems.map((item, index) => {
          return (
            <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
              <Task text={item} /> 
            </TouchableOpacity>
          )
        })
    }
  
     </View>
    </View> 

      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

// Style  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },

  tasksWrapper : {
      paddingTop : 80,
      paddingHorizontal : 20,
  },

  sectionTitle: {
    fontSize : 24,
    fontWeight: 'bold'
  },
  items : {
    marginTop : 30,
  },
  writeTaskWrapper : {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input : {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,

  },
  addWrapper : {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText : {
    color : '#E8EAED',
    fontSize : 25
  },
});
