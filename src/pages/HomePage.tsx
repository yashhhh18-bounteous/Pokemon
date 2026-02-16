
import Navbar from '@/components/ui/Navbar';
import PokemonPlp from '@/components/ui/pokemon/PokemonPlp';


const Home
 = () => {
  return (
    <div>
      <Navbar/>
      <div className='grid'>
<PokemonPlp/>
      </div>
      
      
    </div>
  )
}

export default Home;
