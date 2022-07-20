import React, { useEffect, useState } from "react";
import { authService, dbService } from "myBase";
import { updateProfile } from "firebase/auth";

// 로그인한 유저 정보 prop으로 받기
const Profile = ({ refreshUser, userObj }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => authService.signOut();

    // 내 nweets 얻는 function 생성
    const getMyNweets = async () => {
      const nweets = await dbService
        .collection("nweets")
        .where("creatorId","==",userObj.uid)
        .orderBy("createAt")
        .get();
      console.log(nweets.docs.map((doc) => doc.data())) ;
    };

    const onChange = async (event) => {
      const {
        target: {value},
      } = event;
      setNewDisplayName(value);
    };

    const onSubmit = (event) => {
      event.preventDefault();
      //프로필 네임 변경
      if(userObj.displayName !== newDisplayName){
        updateProfile(authService.currentUser, { displayName: newDisplayName });
        refreshUser();
      }
    };
    
    useEffect(() => {
      getMyNweets();
    }, [])

    return (
      <div className="container-inner">
        <form onSubmit={onSubmit} className="profileForm">
          <input
            onChange={onChange}
            type="text"
            placeholder="Display name"
            value={newDisplayName}
            autoFocus
            className="formInput"
          />
          <input
            type="submit"
            value="저장하기"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          />
        </form>
          <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            로그아웃
          </span>
      </div>
    );
};

export default Profile;