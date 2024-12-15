import { useEffect, useState } from "react";
import Link from "next/link";

const Home = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/countries/available`)
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Available Countries
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <li
            key={country.countryCode}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <Link
              href={`/country/${country.countryCode}`}
              className="text-lg font-semibold text-blue-500 hover:text-blue-700"
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
