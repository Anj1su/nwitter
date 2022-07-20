import React, { useEffect, useState } from "react";
import { authService } from "myBase";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //사용자 로그인 여부 확인
  
  const [userObj, setUserObj] = useState(null);

   useEffect(() => {
    //사용자의 로그인 상태 변화를 관찰함
    //로그인하면 onAuthStateChanged 호출, user을 받음
    const auth = getAuth();
    onAuthStateChanged(auth,(user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
   }, []);

   //새로고침 기능 넣기
   const refreshUser = () => {
      const user = authService.currentUser;
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => user.updateProfile(args),
      });
   }

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
        ) : "" /*Initializing..*/} 
    </>
  );
}

export default App;
