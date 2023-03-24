/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSites } from './store/slices/sites';
import Dashboard from './components/Dashboard';
function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    isLoggedIn && dispatch(getAllSites());
  }, [isLoggedIn]);
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
