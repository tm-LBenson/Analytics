/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSites } from './store/slices/sites';
import Dashboard from './components/Dashboard';
import { setUser } from './store/slices/auth';
import analytics from 'analytics-benson';
function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    analytics('Analytics', 'd526e49d-cc0f-468f-b04d-f59e21f6365a');
    dispatch(setUser());
  }, []);
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
