export type City = {
  id?: number;
  name: string;
  lat?: number;
  lon?: number;
  // I don't need that list
  weatherList?: Weather[];
  latestWeather?: Weather;
};

export type Weather = {
  id?: number;
  value: number;
  lastUpdated: string;
  cityId?: number;
  createdAt?: string | Date | undefined;
};
