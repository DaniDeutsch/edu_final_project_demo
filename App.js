import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const App = () => {
  const [team, setTeam] = useState('');
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://thesportsdb.p.rapidapi.com/searchplayers.php',
        params: { t: team },
        headers: {
          'X-RapidAPI-Key': '94cbdabdebmsh767f719f8eb1017p19e83bjsnaeec2f698398',
          'X-RapidAPI-Host': 'thesportsdb.p.rapidapi.com',
        },
      });
      setPlayers(response.data.player);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Enter a team name:</Text>
      <TextInput
        placeholder="Team name"
        value={team}
        onChangeText={(value) => setTeam(value)}
        style={{
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 5,
          padding: 5,
          margin: 10,
          width: '80%',
        }}
      />
      <Button title="Fetch Players" onPress={fetchPlayers} />
      <View>
        {players.map((player) => (
          <Text key={player.idPlayer}>{player.strPlayer}</Text>
        ))}
      </View>
    </View>
  );
};

export default App;