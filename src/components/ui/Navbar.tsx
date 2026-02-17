
import {
    InputGroup,
    InputGroupAddon,
    
    InputGroupInput,

} from "@/components/ui/input-group"
import { SearchIcon } from 'lucide-react'

const Navbar = () => {
    return (
        <div className="flex flex-wrap justify-between border-b border-black sticky top-0 bg-[url('C:\practice\Pokemon_Project\Pokedex\public\Pokemon-Pokedex.avif')]   bg-cover
  bg-center
  bg-no-repeatz-50 p-2 z-1000">


            <div>
               <h1 className="text-white">
                Pokedex
               </h1> 
            </div>

            <div>
                <InputGroup className="bg-white">
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>
            </div>


        </div>


    )
}

export default Navbar