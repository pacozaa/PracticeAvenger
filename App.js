import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AsyncStorage } from "react-native"

export default class App extends React.Component {
  state = {
    case1: '',
    case2: '',
    case3: ''
  };

  caseOneStepMinus = async (previousValue) => {
    const result = previousValue * 2 - 1
    await AsyncStorage.multiSet([
      ['caseOneStepMinus-result', result.toString()],
      ['caseOneStepMinus-previousValue', previousValue.toString()]
    ])
    return result
  }


  caseTwoEquation = async (v1, v2, v3, v4) => {
    const result = v4 - v2 * v3 - v1
    await AsyncStorage.multiSet([
      ['caseTwoEquation-result', result.toString()],
      ['caseTwoEquation-params1', v1.toString()],
      ['caseTwoEquation-params2', v2.toString()],
      ['caseTwoEquation-params3', v3.toString()],
      ['caseTwoEquation-params4', v4.toString()]
    ])
    return result
  }

  caseThreePuzzle = async (numberFiveStack) => {
    let sum = 4
    for (let i = 0; i < numberFiveStack; i++) {
      const stackNumber = i + 1
      const stackValue = stackNumber * (Math.pow(10, stackNumber - 1))
      sum += stackValue
    }
    await AsyncStorage.multiSet([
      ['caseThreePuzzle-sum', sum.toString()],
      ['caseThreePuzzle-value', numberFiveStack.toString()]
    ])

    return sum
  }
  componentDidMount = async ()=> {
    let case1 = await this.caseOneStepMinus(15)
    let case2 = await this.caseTwoEquation(24, 10, 2, 99)
    let case3 = await this.caseThreePuzzle(5)
    console.log(case1)
    this.setState({
      case1: case1,
      case2: case2,
      case3: case3
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Test App</Text>
        <Text>1. 3, 5, 9, 15, X =>{this.state.case1}</Text>
        <Text>2. (Y + 24)+(10 × 2) = 99 =>{this.state.case2}</Text>
        <Text>3. If 1 = 5 , 2 = 25 , 3 = 325 , 4 = 4325 Then 5 = X =>{this.state.case3}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
