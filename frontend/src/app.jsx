import styled from 'styled-components'
import {Routes, Route} from 'react-router-dom'
import { Header } from './components'
import { About,  Authorization, Registration, MyBoards,MainPaige, UserProfile} from './components/pages';
import { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { checkAuth, fetchAllTasks } from './actions';
import { Board } from './components/board/board.jsx';


const AppContainer = styled.div `
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  width:100%;
  background-color: white;
`;

export const App = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)

  useEffect(()=>{
    dispatch(checkAuth())
  }, [dispatch])

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchAllTasks());
    }
  }, [isAuth, dispatch]);


  return(
    <>
      <AppContainer>
      <Header />
      <Routes>
        <Route path='/' element={<MainPaige />} />
        <Route path='/login' element={<Authorization $margin="100px 0 0 0" />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/boards' element={<MyBoards />} />
        <Route path='/boards/:id' element={<Board />} />
        <Route path='/account' element={<UserProfile />} />
        <Route path='/about' element={<About />} />
      </Routes>
      </AppContainer>
    </>
  )
}