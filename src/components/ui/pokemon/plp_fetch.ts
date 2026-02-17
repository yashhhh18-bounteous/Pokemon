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
    types:z.array(
        z.object({
         
            type:z.object({
                name:z.string(),
                url:z.string(),
            })
        })
    )
  




})


 
export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
 
  height: z.number(),
  weight: z.number(),
  base_experience: z.number(),
 
  sprites: z.object({
    front_default: z.string().nullable(),
    back_default: z.string().nullable(),
    other: z.object({
      ["official-artwork"]: z.object({
        front_default: z.string(),
      }),
    }),
  }),
 
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
 
  stats: z.array(
    z.object({
      base_stat: z.number(),
      stat: z.object({
        name: z.string(),
      }),
    })
  ),
 
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
      }),
      is_hidden: z.boolean(),
    })
  ),
 
  moves: z.array(
    z.object({
      move: z.object({
        name: z.string(),
      }),
    })
  ),
});
 






const limit=20;




export async function fetchPokemonList({pageParam=0}){
    const res=await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`);

    if(!res.ok){
        throw new Error("api not working")
    }

    const data=await res.json();

    return PokemonSchemaList.parse(data);
    
}


export async function fetchPokemonDetail(url:string){

    const res=await fetch(url);

    if(!res.ok){
        throw new Error("Pokemon details fetching failed")


    }


    const data=await res.json();
try{
    return individualPokemonContent.parse(data);
}
catch(e){
    console.error("Zod error",e);
    console.log("raw api respons",z.json);
    throw e;
}

}

//export type fetchPokemonDetail =z.infer<typeof individualPokemonContent>

