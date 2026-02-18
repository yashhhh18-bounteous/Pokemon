
import {
    InputGroup,
    InputGroupAddon,
    
    InputGroupInput,

} from "@/components/ui/input-group"
import { SearchIcon } from 'lucide-react'


interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
}

const Navbar = ({ search, setSearch }: NavbarProps) => {
  return (
    <div className="flex flex-wrap justify-between border-b border-black sticky top-0 bg-pokedex bg-cover bg-center bg-no-repeat p-2 z-50">

      {/* Logo / Title */}
      <div>
        <h1 className="text-white text-xl font-bold">Pokedex</h1>
      </div>

      {/* Search Input */}
      <div>
        <InputGroup className="bg-white rounded">
          <InputGroupInput
            placeholder="Search..."
            value={search}            // 👈 use prop from Home
            onChange={(e) => setSearch(e.target.value)} // 👈 update Home state
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

    </div>
  );
};

export default Navbar;