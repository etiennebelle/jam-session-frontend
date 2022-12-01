import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <header>
          <h1>"If music be the food of love, play on."</h1>
          <p>Welcome to JAM! Here you can discover all the jam sessins happening around you.</p>
          <Link to='/events'>Explore Jam Sessions</Link>
      </header>
      <section>
        <h2>How it works</h2>
        <div>
          <h3>For artists</h3>
          <p>Explore different jam sessions happening around you and sign up to play in them together with other artists!</p>
        </div>
        <div>
          <h3>For hosts</h3>
          <p>Publish upcoming jam sessions event to have more visibility and to have artists playing in them.</p>
        </div>
      </section>
      <section>
        <h2>Music can change the world because it can change people.</h2>
        <Link to='/events'>Explore Jam Sessions</Link>
      </section>
    </div>
  )
}

export default Home