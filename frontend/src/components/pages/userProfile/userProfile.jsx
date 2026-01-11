import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../../actions";
import { AccessDenied } from "../access";

const UserProfileContainer = ({className}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const isAuth = useSelector(state => state.user.isAuth)

    useEffect(()=>{
      dispatch(checkAuth())
    }, [dispatch])

    if(!isAuth) {
      return <AccessDenied />
    }

  return(
    <>
    <div className={className}>
      
      <div className="profile-page">
      <h2>My profile</h2>
      <div className="profile-content">
      <p>My ID: {user.id}</p>
      <p>Login: {user.login}</p>
      </div>
      </div>
    </div>
    </>
  )
}

export const UserProfile = styled(UserProfileContainer)`
.profile-page {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

`;