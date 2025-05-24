import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const App = () => {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handlePress = (index) => {
    if (board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);  
    if (winner) {
      Alert.alert(`🎉 Player ${winner} wins!`, '', [
        { text: 'Play Again', onPress: resetGame },
      ]);
    } else if (!newBoard.includes(null)) {
      Alert.alert("It's a draw!", '', [{ text: 'Play Again', onPress: resetGame }]);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (b) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6],           // diagonals
    ];
    for (let [a, b_, c] of lines) {
      if (b[a] && b[a] === b[b_] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setCurrentPlayer('X');
  };

  const renderSquare = (i) => (
    <TouchableOpacity key={i} style={styles.square} onPress={() => handlePress(i)}>
      <Text style={styles.squareText}>{board[i]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.turn}>Player {currentPlayer}'s Turn</Text>
      <View style={styles.board}>
        {board.map((_, i) => renderSquare(i))}
      </View>
      <View style={styles.footer}>
      <Text style={styles.footerText}>@Sasi kumar</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222',
  },
  title: {
    fontSize: 32, fontWeight: 'bold', color: '#0ff', marginBottom: 10,
  },
  turn: {
    fontSize: 20, color: '#fff', marginBottom: 20,
  },
  board: {
    width: 300, height: 300, flexDirection: 'row', flexWrap: 'wrap',
  },
  square: {
    width: 100, height: 100, borderWidth: 1, borderColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
  },
  squareText: {
    fontSize: 36, color: '#fff',
  },
  footer :{
          position:'absolute', bottom:40,  alignItems:'flex-end', width:'100%'
  },
  footerText :{
    textAlign:'right',
    color:'white',
    fontSize:14, marginRight:20
  }
});

export default App;
