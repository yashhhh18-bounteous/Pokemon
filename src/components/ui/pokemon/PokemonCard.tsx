import { Link } from "react-router-dom"

type PokemonCardProps = {
  name: string
  image: string | null
  types: string[]
  height?: number
  weight?: number
  isLoading?: boolean
}
 
export default function PokemonCard({
  name,
  image,
  types,
  height,
  weight,
  isLoading = false,
}: PokemonCardProps) {
  if (isLoading) {
    return <div className="p-4 border rounded">Loading {name}...</div>
  }
 
  return (

    <Link to={`pokemon/${name}`}>
    <div className="border border-gray-300 rounded-xl p-4 m-3 w-[200px] shadow-md text-center bg-gray-50">
      <h3 className="my-2 text-lg font-semibold">
        #{name.charAt(0).toUpperCase() + name.slice(1)}
      </h3>
 
      {image && (
        <img
          src={image}
          alt={name}
          className="w-[100px] h-[100px] mx-auto"
        />
      )}
 
      <div className="mt-2">
        {types.map((type) => (
          <span
            key={type}
            className="inline-block bg-gray-200 rounded-lg px-2 py-1 m-1 text-xs font-medium"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
 
      <div className="grid grid-cols-2 text-center mt-3">
        <div>
          <p className="text-sm font-medium text-gray-500">Height</p>
          <p className="font-semibold">{height ?? "-"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Weight</p>
          <p className="font-semibold">{weight ?? "-"}</p>
        </div>
      </div>
    </div>
    </Link>
  )
}
 