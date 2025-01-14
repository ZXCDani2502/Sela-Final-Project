import HomePageCard from '../components/HomePageCard.tsx'
import Navbar from '../components/Navbar.tsx'


const HomePage = () => {

  return (
    <div>
      <Navbar/>
      <div className='flex flex-row w-full pt-20 justify-center items-center'>
        <HomePageCard src='/images/backgammon.jpg' href='/Backgammon' title='Backgammon' description='Want to test your luck?'/>
        <HomePageCard src='/images/chess.jpg' title='Chess' description='Find your favorite strategy and improve your game!'/>
      </div>
    </div>
  )
}

export default HomePage