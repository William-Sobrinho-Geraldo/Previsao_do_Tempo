import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios, { AxiosError } from 'axios';
import { API_KEY } from './src/api/API_KEY';
import { WeatherData } from './src/api/InterfaceWeatherData';
import GraficoLinha from './src/componentes/gráfico';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [temperaturasMax, setTemperaturasMax] = useState<number[]>([15]);

  const xValues = [1,2,3,4,5,6,7,8,9,10];
  let temperaturaData = xValues.map((x,index) => ({
    x,
    y: temperaturasMax[index],
  }));
  console.log("as temperaturas máximas em °C são: " + temperaturasMax)

  useEffect(() => {
    // Obtem a localização atual do dispositivo
    Geolocation.getCurrentPosition(
      position => {
        const latitude: number = 41.8379
        const longitude: number = -87.6828
        // const { latitude, longitude } = position.coords;
        getWeatherData(latitude, longitude);
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
    );
  }, []);
  

  const getWeatherData = async (latitude: number, longitude: number) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
      console.log("a latitude é: " + latitude + " e a longitude é: " + longitude + " e a API_KEY é: " + API_KEY)
      const response = await axios.get(url);
      setWeatherData(response.data);
      const valoresTempMax = weatherData?.list.slice(0,10).map(item => Math.round(item.main.temp_max - 273.15))

        console.log("a variável valoresTempMax recebida foi: " + valoresTempMax)
        if(valoresTempMax === undefined){
          console.log("As temperaturasMáx devolvidas pela API foram do tipo  UNDEFINED")
        } else { setTemperaturasMax(valoresTempMax) }
        
      
      
    } catch (error) {
      console.log("O erro na requisição axios foi:  " + error);
    }
  };


  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weatherData.city.name}</Text>
      <Text style={styles.description}>{weatherData.city.country}</Text>
      <Text style={styles.description}>Latitude {weatherData.city.coord.lat}</Text>
      <Text style={styles.description}>Nível do mar {weatherData.list[2].main.grnd_level}m</Text>
      <Text style={styles.description}>As primeiras temps são: {temperaturasMax}°C</Text>
      <View>
        <GraficoLinha data={temperaturaData}/>
      </View>
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


