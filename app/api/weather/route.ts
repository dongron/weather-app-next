// https://www.prisma.io/nextjs
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { City, Weather } from '@/types';

type PostRequestType = {
  cities: string[];
};

export async function GET() {
  try {
    const citiesRaw = await prisma.city.findMany({
      include: {
        weatherList: true,
      },
    });
    const cities = citiesRaw.map((city: any) => {
      // actually, I complicated it too much, 1-1 relation would be better in this scenario
      const latestWeather = city.weatherList[city.weatherList.length - 1];
      return { ...city, latestWeather };
    });
    return NextResponse.json({
      message: 'Weather fetched',
      data: { cities },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const { cities } = (await request.json()) as PostRequestType;
  // todo: add Promise.all for array of cities
  const cityName = cities[0];
  let updatedCity;
  try {
    // todo: create query params using url search params would be better
    const apiResponse = await fetch(
      `${process.env.WEATHER_API_URL}/current.json?q=${cityName}&key=${process.env.WEATHER_API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const apiData = await apiResponse.json();
    const responseCity: City = {
      name: apiData.location?.name,
      lat: apiData.location?.lat,
      lon: apiData.location?.lon,
    };
    const responseWeather: Weather = {
      lastUpdated: apiData.current?.last_updated,
      value: apiData.current?.temp_c,
    };

    const foundCity = await prisma.city.findUnique({
      where: {
        name: responseCity.name,
      },
      include: {
        weatherList: true,
      },
    });

    if (!foundCity) {
      updatedCity = await prisma.city.create({
        data: {
          ...responseCity,
          weatherList: { create: [responseWeather] },
        },
      });
    } else if (foundCity) {
      const weather = await prisma.weather.create({
        data: {
          ...responseWeather,
        },
      });
      // actually I don't need an array here, I would change it to 1-1 relation and update only this weather record
      updatedCity = await prisma.city.update({
        where: {
          name: responseCity.name,
        },
        data: {
          weatherList: {
            connect: {
              id: weather.id,
            },
          },
        },
      });
    }
    return NextResponse.json({
      message: 'City added',
      data: updatedCity,
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'API request error' }, { status: 400 });
  }
}
