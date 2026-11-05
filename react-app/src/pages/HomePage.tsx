import { Counter } from '../components/Counter';


function HomePage() {
  return (
    <>
      <h1 className="app-title">The First React App</h1>
      <section className="counter-section">
        <Counter initVal={0} />
      </section>
    </>
  )
}

export default HomePage;