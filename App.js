import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
export default function App() {


  const [courseGoals, setGoalCourse] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = GoalItem => {
    if (GoalItem.length === 0) {
      return;
    }
    setGoalCourse(currentGoal => [...currentGoal, { id: Math.random().toString(), value: GoalItem }]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setGoalCourse(currentGoal => {
      return currentGoal.filter((goal) => goal.id !== goalId);
    });
  }

  const cancelGoalAdditionalHandler = () => {
    setIsAddMode(false);
  }


  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput  visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionalHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value}  />}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },

});
