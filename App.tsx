import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios, { AxiosError } from 'axios';
import { API_KEY } from './src/api/API_KEY';
import { WeatherData } from './src/api/InterfaceWeatherData';
import GraficoLinha from './src/componentes/gráfico';

const App: React.FC = () => {
  const [lati,setLati] = useState(40.71427);
  const [long,setLong] = useState(-74.00597);
  const [inputTextCidade, setInputTextCidade] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [temperaturasMax, setTemperaturasMax] = useState<number[]>([]);
  const [tempData, setTempData] = useState<{ x: string; y: number; }[]>([])
  const xAxis = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // tempData.forEach(item => {
  //   console.log("x: ", item.x, "  y: ", item.y)
  // })
  console.log("A cidade digitada é: ", inputTextCidade)

  useEffect(() => {
    getWeatherData(lati, long)
  }, [])

  useEffect(() => {
    if (weatherData && typeof weatherData === 'object') {
      const valoresTempMax = weatherData?.list.slice(0, 7).map(item => Math.round(item.main.temp_max - 273.15))

      if (valoresTempMax === undefined) {
        console.log("valoresTempMax é UNDEFINED")
      } else {
        setTemperaturasMax(valoresTempMax)
        console.log("os valoresTempMax são    ==> " + valoresTempMax)
      }

      const temperaturaData = xAxis.map((x, index) => ({
        x: x,
        y: valoresTempMax[index],
      }));
      setTempData(temperaturaData)

    }

  }, [weatherData])

  const getWeatherData = async (latitude: number, longitude: number) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
      await axios.get(url)
        .then(response => {
          setWeatherData(response.data)
        })

    } catch (error) { console.log("O erro na requisição axios foi:  " + error); }
  };

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Cidade'
        onChangeText={(text) => { setInputTextCidade(text) }}
        value={inputTextCidade}
      />
      <Text style={styles.city}>{weatherData.city.name}</Text>
      <Text style={styles.description}>{weatherData.city.country}</Text>
      <Text style={styles.description}>Latitude {weatherData.city.coord.lat}</Text>
      <Text style={styles.description}>Nível do mar {weatherData.list[2].main.grnd_level}m</Text>
      <Text style={styles.description}>As primeiras temps são: {temperaturasMax}°C</Text>
      <View>
        <GraficoLinha data={tempData} />
      </View>
      {/* <Button title="Buscar" onPress={handleButtonPress} /> */}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
  },
});

export default App;


