/** @format */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllSites } from './store/slices/sites';
import Dashboard from './components/Dashboard';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSites());
  }, []);
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
