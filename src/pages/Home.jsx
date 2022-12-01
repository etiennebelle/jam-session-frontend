import { Link } from "react-router-dom";
import { Button } from '@mantine/core';

function Home() {
  return (
    <div>
      <header className="home-header">
        <div className="hero">
          <h1>"If music be the food of love, play on."</h1>
        </div>
        <div className="intro">
          <p>Welcome to JAM! Here you can discover all the jam sessions happening around you.</p>
        </div>
        <div className="explore">
          <Link to='/events'>
            <Button color="dark" radius="xl">
              Explore Jam Sessions
            </Button>
          </Link>
        </div>
      </header>
      <section className="home-main">
        <div className="section-title">
          <h2>How it works</h2>
        </div>
        <div className="home-card">
          <h3>For artists</h3>
          <p>Explore different jam sessions happening around you and sign up to play in them together with other artists!</p>
        </div>
        
        <div className="home-card">
          <h3>For hosts</h3>
          <p>Publish upcoming jam sessions event to have more visibility and to have artists playing in them.</p>
        </div>
        <div className="section-title">
          <h2>Music can change the world because it can change people.</h2>
        </div>
        <Link to='/events'>
            <Button color="dark" radius="xl">
              Explore Jam Sessions
            </Button>
          </Link>
      </section>
    </div>
  )
}

export default Home