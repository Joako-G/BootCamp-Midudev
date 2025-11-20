import Jobs from './components/Jobs'
import Header from './components/Header'
import jobs from './data/Data.json'
import Footer from './components/Footer'


function App() {

  return (
    <>
      <Header />
      <Jobs jobs={jobs} />
      <Footer />
    </>
  )
}

export default App
