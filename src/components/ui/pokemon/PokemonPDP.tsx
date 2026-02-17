import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { fetchPDPPokemonDetail } from "./pdp_fetch";
import { Info } from "lucide-react";







function InfoDisplay({ label, value }: { label: string; value: React.ReactNode }) {





  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1">
        <Info className="w-4 h-4 text-gray-500" />
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}


export default function PokemonPDP() {
  const { name } = useParams<{ name: string }>();

 
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
 
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemon", "detail", url],
    queryFn: () => fetchPDPPokemonDetail(url),
    enabled: !!name,
  });
 

if (isLoading) {
  return (
    <div className="flex justify-center items-center h-96">
      <span>Loading...</span>
    </div>
  );
}

if (isError || !data) {
  return (
    <div className="flex justify-center items-center h-96">
      <span>Error loading Pokémon details.</span>
    </div>
  );
}

return (
  <>
  <div className="max-w-5xl mx-auto p-6">
  

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    

    <div className="flex justify-center items-center bg-gray-100 rounded-xl p-6">
      <img
        src={data.sprites.other["official-artwork"].front_default}
        alt={data.name}
        className="w-72 h-72"
      />
    </div>
 
 
    <div>
      <h1 className="text-4xl font-bold capitalize">
        {data.name}
      </h1>
      <p className="text-gray-500 text-sm">#{data.id}</p>
 
 
      <div className="flex gap-2 mt-3">
        {data.types.map((t) => (
          <span
            key={t.type.name}
            className="px-3 py-1 rounded-full text-sm bg-gray-200 capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>
 
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <InfoDisplay label="Height" value={`${data.height / 10} m`} />
        <InfoDisplay label="Weight" value={`${data.weight / 10} kg`} />
        <InfoDisplay label="Base XP" value={data.base_experience} />
      </div>
    </div>
  </div>
 
  


  <section className="mt-10">
  <h2 className="text-2xl font-semibold mb-4">Base Stats</h2>
 
  <div className="space-y-4">
    {data.stats.map((s) => (
      <div key={s.stat.name}>
        
        <div className="flex justify-between text-sm mb-1">
          <span className="capitalize text-gray-700">
            {s.stat.name.replace("-", " ")}
          </span>
          <span className="font-medium text-gray-900">
            {s.base_stat}
          </span>
        </div>
 
      
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-gray-700 rounded"
            style={{ width: `${Math.min(s.base_stat, 100)}%` }}
          />
        </div>
      </div>
    ))}
  </div>
</section>
 
 
  
  <section className="mt-10">
    <h2 className="text-2xl font-semibold mb-4">Abilities</h2>
    <div className="flex flex-wrap gap-3">
      {data.abilities.map((a) => (
        <span
          key={a.ability.name}
          className={`px-4 py-2 rounded-lg text-sm capitalize ${
            a.is_hidden ? "bg-yellow-200" : "bg-gray-200"
          }`}
        >
          {a.ability.name}
          {a.is_hidden && " (Hidden)"}
        </span>
      ))}
    </div>
  </section>
 

  <section className="mt-10">
    <h2 className="text-2xl font-semibold mb-4">Moves</h2>
    <div className="flex flex-wrap gap-2">
      {data.moves.slice(0, 10).map((m) => (
        <span
          key={m.move.name}
          className="text-xs bg-gray-100 px-3 py-1 rounded capitalize"
        >
          {m.move.name}
        </span>
      ))}
    </div>
  </section>
 
</div></>


)

}