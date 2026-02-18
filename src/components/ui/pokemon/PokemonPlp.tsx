import React from "react";
import { useInfiniteQuery, useQuery, useQueries } from "@tanstack/react-query";
import { fetchPokemonList } from "./plp_fetch";
import PokemonCard from "./PokemonCard";
import { useInView } from "react-intersection-observer";

export default function PokemonPlp({ search }: { search: string }) {
  const isSearching = search?.trim() !== "";

  const searchQuery = useQuery({
    queryKey: ["pokemon", "search", search],
    queryFn: async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      if (!res.ok) throw new Error("Pokemon not found");
      return res.json();
    },
    enabled: isSearching,
  });


  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["Pokemon", "list"],
    queryFn: fetchPokemonList,
    initialPageParam: 0,
    getNextPageParam: (_lastPage, pages) => pages.length * 20,
    enabled: !isSearching, 
  });

  const pokemonRefs =
    data?.pages.flatMap((page) => page.results) ?? [];

  
  const detailQuery = useQueries({
    queries: pokemonRefs.map((pokemon) => ({
      queryKey: ["pokemon", "details", pokemon.url],
      queryFn: async () => {
        const res = await fetch(pokemon.url);
        if (!res.ok) throw new Error("Detail fetch failed");
        return res.json();
      },
      staleTime: 1000*60*5,
    })),
  });


  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isSearching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isSearching]);

  
  if (isSearching) {
    if (searchQuery.isLoading) return <p>Searching...</p>;
    if (searchQuery.isError) return <p>Pokemon not found</p>;

    const pokemon = searchQuery.data;

    return (
      <div className="grid place-items-center mt-6">
        <PokemonCard
          name={pokemon.name}
          image={
            pokemon.sprites.other["official-artwork"]
              .front_default ?? null
          }
          types={pokemon.types.map((t: { type: { name: any; }; }) => t.type.name)}
          height={pokemon.height}
          weight={pokemon.weight}
          isLoading={false}
        />
      </div>
    );
  }


  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;

  return (
    <div className="grid gap-2 grid-cols-1 min-[400px]:grid-cols-2 min-[426px]:grid-cols-3 min-[769px]:grid-cols-4">

      {pokemonRefs.map((pokemon, index) => {
        const detail = detailQuery[index];

        return (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            image={
              detail.data?.sprites.other["official-artwork"]
                .front_default ?? null
            }
            types={
              detail.data?.types.map((t: { type: { name: any; }; }) => t.type.name) ?? []
            }
            height={detail.data?.height}
            weight={detail.data?.weight}
            isLoading={detail.isLoading}
          />
        );
      })}

    
      <div ref={ref} style={{ height: 1 }} />

      <div className="text-center mt-4 col-span-full">
        {isFetchingNextPage && <p>Loading more...</p>}
        {isFetching && !isFetchingNextPage && <p>Fetching...</p>}
      </div>
    </div>
  );
}
