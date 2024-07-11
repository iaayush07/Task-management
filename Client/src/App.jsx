import './App.css'
import Header from './core/components/header/Header'
import Sidebar from './core/components/sidebar/Sidebar'

function App() {

  return (
    <>
      <section className='flex h-full'>
        <Sidebar />
        <div className='flex-grow'>
        <Header />
          
          <main>

          </main>
        </div>
        
      </section>
    </>
  )
}

export default App
