import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Routes from './routes/AppRouter';
import { setUserAuthenticated } from './slice/sliceUser';
import { getUserFromStorage } from './utils/GetUserFromStorage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getUserFromStorage();
    if (token) {
      dispatch(setUserAuthenticated(true));
    }
  }, [dispatch])
  
  return <Routes />;
}

export default App;
