import {PokemonDetailSchema} from "./plp_fetch"


export async function fetchPDPPokemonDetail(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch pokemon detail")
 
  const data = await res.json()
  return PokemonDetailSchema.parse(data) 
}
 