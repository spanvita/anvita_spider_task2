import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Log from './Pages/login';
import Sign from './Pages/signup';
import MainPage from './Pages/MainPage';
import Search from './Pages/Search';
import Group from './Pages/group_create'

function App(){
  return(
    <Routes>
        <Route path='/'element={<Log />} />
        <Route path='/signup' element={<Sign />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/group_create' element={<Group />} />
    </Routes>
  )
}
export default App;