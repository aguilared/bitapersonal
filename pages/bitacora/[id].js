import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Person() {
  const { query } = useRouter();
  console.log('QUERY', query);
  console.log('QUERY', query.id);
  const { data, error } = useSWR(
    () => query.id && `/api/bitacora/${query.id}`,
    fetcher
  );

  console.log('Data', data);

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Fecha</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {data.map((b, i) => (
          <tr>
            <td>{b.id}</td>
            <td>{b.bitacoraDate}</td>
            <td>{b.author.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
