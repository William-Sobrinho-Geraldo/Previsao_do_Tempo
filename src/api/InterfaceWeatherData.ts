
export interface WeatherData {
    name: string;
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
    pressure: String;
    city: {
      name: String;
      country: String;
      coord: {
        lat: String;
        lon: String;
      }
    };
    list: {
      main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
      };
    }[];
  };

