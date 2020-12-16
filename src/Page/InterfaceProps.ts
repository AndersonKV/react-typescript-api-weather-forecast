
interface FirstArray {
    base: string;
    clouds: {
      all: number;
    };
    cod: number;
    coord: { lon: number; lat: number };
    dt: number;
    id: number;
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    name: string;
    rain: {
      "1h": number;
    };
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    visibility: number;
    weather: {
      [0]: {
        description: string;
        icon: string;
        id: number;
        main: string;
      };
      [1]: {
        description: string;
        icon: string;
        id: number;
        main: string;
      };
    };
    wind: { speed: number; deg: number };
}
  
 interface SecondArray {
    city: {
      coord: { lat: number; lon: number };
      country: string;
      id: number;
      name: string;
      population: number;
      sunrise: number;
      sunset: number;
      timezone: number;
    };
    cnt: number;
    cod: string;
    list:  {
      [0]:ListFromSecondArray;
      [1]:ListFromSecondArray;
      [2]:ListFromSecondArray;
    [3]:ListFromSecondArray;
         [4]:ListFromSecondArray;
      };
      pop: number;
      rain: { "3h": number };
      sys: { pod: string };
      visibility: number;
      weather: {
        [0]: {
          description: string;
          icon: string;
          id: number;
          main: string;
        };
      };
      wind: { speed: number; deg: number };
    
}
   
interface ListFromSecondArray {
    clouds: { 
      all: number
    };
      dt: number;
      dt_txt: string;
      main: {
        grnd_level: number;
        humidity: number;
        pressure: number;
        sea_level: number;
        temp: number;
        temp_kf: number;
        temp_max: number;
        temp_min: number;
      }
}
  


interface ListWeek {
  clouds: {
    all: number
  },
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf:number;
    temp_max: number;
    temp_min: number;
  },
  pop: number;
  rain: {'3h': number}
  sys: {pod: string}
  visibility: number;
  weather: {
    [0]: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }
  }
wind: {
  speed: number, deg: number
  }
}
 

export interface WeekProps {
  map: any;
  city: {
    coord: {
      lat: number, lon: number
    };
    country: string;
    id:  number;
    name: string;
    population:  number;
    sunrise:  number;
    sunset:  number;
    timezone: number;
  },
  cnt: number;
  cod: string;
  list: {
    [0]:ListWeek;
  }
}


export interface WeatherForecast {
    [0]: FirstArray;
    [1]: SecondArray;
}
  