import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Log from './Pages/login';
import Sign from './Pages/signup';
import MainPage from './Pages/MainPage';
import Search from './Pages/Search';
import Group from './Pages/group_create';
import ProfileUpdate from './Pages/profile_update';
import GroupDetails from './Pages/group_details';
import Splash from './Pages/splash';
import Error from './Pages/error';
import Checkbox from './Pages/checkbox';
import ForgotPassword from './Pages/forgot_password';
import Charts from './Pages/charts';

function App(){
  return(
    <Routes>
        <Route path='/login'element={<Log />} />
        <Route path='/signup' element={<Sign />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/group_create' element={<Group />} />
        <Route path='/profileupdate' element={<ProfileUpdate />} />
        <Route path='/group_details' element={<GroupDetails />} />
        <Route path='/' element={<Splash />} />
        <Route path='/error' element={<Error />} />
        <Route path='/checkbox' element={<Checkbox />} />
        <Route path='/forgot_password' element={<ForgotPassword />} />
        <Route path='/charts' element={<Charts />} />
    </Routes>
  )
}
export default App;
