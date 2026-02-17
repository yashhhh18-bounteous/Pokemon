import { useInfiniteQuery, useQueries} from '@tanstack/react-query';
import { fetchPokemonList } from './plp_fetch';
import React from 'react';
import PokemonCard from './PokemonCard';
import { useInView } from 'react-intersection-observer';
import { fetchPDPPokemonDetail } from './pdp_fetch';


export default function PokemonPlp() {
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
  });

  const pokemonRefs = data?.pages.flatMap((page => page.results)) ?? [];
  //console.log(pokemonRefs)

  const detailQuery = useQueries({
    queries: pokemonRefs.map((pokemon) => ({
      queryKey: ["pokemon", "details", pokemon.url],
      queryFn: () => fetchPDPPokemonDetail(pokemon.url),
      staleTime: Infinity,
    }))
  })

  //console.log(detailQuery);

  const { ref, inView } = useInView();


  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;

  return (


    <>
    <div className="grid gap-2 grid-cols-1 min-[400px]:grid-cols-2   min-[426px]:grid-cols-3 
  min-[769px]:grid-cols-4">

    {pokemonRefs.map((pokemon, index) => {
      const detail = detailQuery[index];
  
        console.log(detail.data)
      return (
      
<PokemonCard
  key={pokemon.name}
  name={pokemon.name}
  image={detail.data?.sprites.other["official-artwork"].front_default ?? null}
  types={detail.data?.types.map((t) => t.type.name) ?? []}
  height={detail.data?.height}
  weight={detail.data?.weight}
  isLoading={detail.isLoading}
/>
      );
    })}

    <div ref={ref} style={{ height: 1 }} />

    <div className="text-center mt-4">
      {isFetchingNextPage && <p>Loading more...</p>}
      {isFetching && !isFetchingNextPage && <p>Fetching...</p>}
    </div>

    </div>



    
    </>
  );
}