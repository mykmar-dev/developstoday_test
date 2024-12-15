import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const CountryInfo = () => {
  const { code } = useRouter().query;
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (code) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/countries/${code}`)
        .then((res) => res.json())
        .then((data) => setCountry(data));
    }
  }, [code]);

  if (!country) return <div className="text-center text-2xl font-semibold mt-10">Loading...</div>;

  const populationData = country.populationData?.populationCounts || [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          {country.countryData.commonName}
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={country.flagData?.flag}
            alt={`${country.countryData.commonName} flag`}
            className="w-48 rounded-lg shadow-lg"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Border Countries:</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-gray-600">
          {country.countryData.borders?.map((border) => (
            <li
              key={border.countryCode}
              className="p-2 bg-gray-200 rounded text-center hover:bg-gray-300"
            >
              {border.commonName}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Population Over Time:</h2>
        <div className="w-full h-96">
          <ResponsiveContainer>
            <LineChart data={populationData}>
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#555' }}/>
              <YAxis tick={{ fontSize: 12, fill: '#555' }} />
              <Tooltip />
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4a90e2"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;
