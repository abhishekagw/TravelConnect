import { Route, Routes } from "react-router-dom";
import Admin from './Admin/App'
import User from './User/App'



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Admin/*" element={<Admin/>}/>
        <Route path="/User/*" element={<User/>}/>
      </Routes>
    </div>
  );
}

export default App;
