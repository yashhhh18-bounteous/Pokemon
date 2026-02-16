
import {
    InputGroup,
    InputGroupAddon,
    
    InputGroupInput,

} from "@/components/ui/input-group"
import { SearchIcon } from 'lucide-react'

const Navbar = () => {
    return (
        <div className=' flex flex-wrap px-4 justify-between border-solid border-black'>

            <div>
               <h1>
                Pokedex
               </h1> 
            </div>

            <div>
                <InputGroup>
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