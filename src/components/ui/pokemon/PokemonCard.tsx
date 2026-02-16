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
    style={{
      border: "1px solid #ccc",
      borderRadius: 12,
      padding: 16,
      margin: 12,
      width: 200,
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
      backgroundColor: "#f8f8f8",
      transition: "transform 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <h3 style={{ margin: "8px 0", fontSize: 18 }}>
      #{data.id} {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
    </h3>

    <img
      src={data.sprites.front_default}
      alt={data.name}
      style={{ width: 100, height: 100 }}
    />

    <div style={{ display: "flex", justifyContent: "space-around", marginTop: 8 }}>
      <div>
        <strong>Height:</strong> {data.height}
      </div>
      <div>
        <strong>Weight:</strong> {data.weight}
      </div>
    </div>

    <div style={{ marginTop: 8 }}>
      {data.types.map((t: any) => (
        <span
          key={t.type.name}
          style={{
            display: "inline-block",
            backgroundColor: "#eee",
            borderRadius: 8,
            padding: "4px 8px",
            margin: 2,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
        </span>
      ))}
    </div>
  </div>
);

}
