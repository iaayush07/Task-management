import './App.css'
import Header from './core/components/header/Header'
import Sidebar from './core/components/sidebar/Sidebar'
import Boards from './pages/board/components/Boards'
import { BoardProvider } from './pages/board/utility/services/BoardService';

function App() {

  return (
    <>
      <BoardProvider>

        <section className='flex h-full'>
          <Sidebar />
          <div className='flex flex-col flex-grow'>
            <Header />
            <main className='flex flex-grow px-5 py-3'>
              <Boards />
            </main>
          </div>

        </section>
      </BoardProvider>
    </>
  )
}

export default App
