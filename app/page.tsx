'use client';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Suspense, useEffect, useState } from 'react';
import Table from '@/components/table';
import TablePlaceholder from '@/components/table-placeholder';

// todo: move all requests to separate file
const getCities = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/weather`);
  return await res.json();
};

const postCities = async (cities: string[]) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/weather`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cities }),
  });
  return await res.json();
};

export default function Home() {
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ cities: string }>();

  const onSubmit: SubmitHandler<{ cities: string }> = ({ cities }) => {
    setIsSubmitting(true);
    const citiesToSubmit = cities?.split(',');
    postCities(citiesToSubmit).then((res) => {
      refetchCities();
    });
    reset();
  };

  const refetchCities = () =>
    getCities().then((res) => {
      setCities(res.data.cities);
      setIsSubmitting(false);
    });

  useEffect(() => {
    refetchCities();
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Weather app
      </h1>
      <Suspense fallback={<TablePlaceholder />}>
        <Table cities={cities} />
      </Suspense>
      <div className="mt-4 bg-white/30 px-12 py-6 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Fetch weather for your city
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="London"
              required
              {...register('cities')}
              disabled={isSubmitting}
            />
          </div>
          <button
            className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
            type="submit"
            disabled={isSubmitting}
          >
            Get weather
          </button>
        </form>
      </div>
    </main>
  );
}
