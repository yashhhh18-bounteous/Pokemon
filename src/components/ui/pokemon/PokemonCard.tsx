import { useQuery } from "@tanstack/react-query";

function fetchPokemonDetails(name: string) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed");
      return res.json();
    });
}

export function PokemonCard({ name }: { name: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetails(name),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

return (
<div
  className="border border-gray-300 rounded-xl p-4 m-3 w-[200px] shadow-md text-center bg-gray-50 transition-transform duration-200 hover:scale-105"
>
  <h3 className="my-2 text-lg font-semibold">
    #{data.id} {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
  </h3>

  <img
    src={data.sprites.front_default}
    alt={data.name}
    className="w-[100px] h-[100px] mx-auto"
  />



    <div className="mt-2">
    {data.types.map((t: any) => (
      <span
        key={t.type.name}
        className="inline-block bg-gray-200 rounded-lg px-2 py-1 m-1 text-xs font-medium"
      >
        {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
      </span>
    ))}
  </div>

<div className="grid grid-cols-2 text-center mt-3">
  <div>
    <p className="text-sm font-medium text-gray-500">Height</p>
    <p className="font-semibold">{data.height}</p>
  </div>

  <div>
    <p className="text-sm font-medium text-gray-500">Weight</p>
    <p className="font-semibold">{data.weight}</p>
  </div>
</div>



</div>
  );
}
