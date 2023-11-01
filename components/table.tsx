import { City } from '@/types';

type TableProps = {
  cities: City[];
};

export default async function Table(props: TableProps) {
  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-semibold w-1/3">City</div>
        <div className="text-sm font-semibold w-1/3">Temperature</div>
        <div className="text-sm font-semibold w-1/3">Last updated</div>
      </div>
      <div className="divide-y divide-gray-900/5">
        {props.cities.map((city) => (
          <div
            key={city.name}
            className="flex justify-between items-center py-3"
          >
            <div className="font-medium leading-none w-1/3">{city.name}</div>
            <div className="text-sm text-gray-500 w-1/3">{city.latestWeather?.value}</div>
            <div className="text-sm text-gray-500 w-1/3">{city.latestWeather?.lastUpdated}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
