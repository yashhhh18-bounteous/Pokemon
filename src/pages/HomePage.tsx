import React from "react";
import Navbar from '@/components/ui/Navbar';
import PokemonPlp from '@/components/ui/pokemon/PokemonPlp';

const Home = () => {
  const [search, setSearch] = React.useState("");           
  const [debouncedSearch, setDebouncedSearch] = React.useState(search);

  // Debounce effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000); // 400ms debounce

    return () => clearTimeout(timer); 
  }, [search]);

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />
      <div className='grid'>
        <PokemonPlp search={debouncedSearch} />
      </div>
    </div>
  );
};

export default Home;
