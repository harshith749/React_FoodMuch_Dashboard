import React from 'react';

const Navbar = ({showLoginHandler,showRegisterHandler,showLogout,logoutHandler}) => {

  const firmName=localStorage.getItem('firmName')
  

  return (
    <div className="navSection">
            <div className="company">
              vendor Dashboard
            </div>
            <div className="firmName">
                {firmName && <span>Firm Name: {firmName}</span>}
            </div>
            <div className="userAuth">
              {showLogout ?  <span onClick={logoutHandler}> Logout </span> : <>
              <span onClick={showLoginHandler}>
                    Login
              </span>
              <span onClick={showRegisterHandler}>
                /Register
              </span></>}
            </div>
    </div>
  )
}


export default Navbar;