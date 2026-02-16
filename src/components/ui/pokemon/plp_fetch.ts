import * as z from "zod";




export const PokemonSchema = z.object({
    name:z.string(),
    url:z.string(),
})

export const PokemonSchemaList=z.object({
    results:z.array(PokemonSchema),
})



export const individualPokemonContent=z.object({
    name:z.string(),
    height:z.number(),
    weight:z.number(),
    sprites:z.object({
        front_shiny:z.string(),
    }),
    types:z.object({
        name:z.string(),
    }),
  




})






const limit=20;




export async function fetchPokemonList({pageParam=0}){
    const res=await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`);

    if(!res.ok){
        throw new Error("api not working")
    }

    const data=await res.json();

    return PokemonSchemaList.parse(data);
    
}


