import React, { useEffect, useState } from "react";
import { dbService } from "myBase";
import {
     collection,
     onSnapshot,
     query,
     orderBy, 
} from "firebase/firestore"
import HomeTop from "components/HomeTop";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    
    useEffect(() => {
        //시간순으로 정렬하기
        const order = query(
            collection(dbService,"nweets"),
            orderBy("createdAt","desc")
        );
        onSnapshot(order, (snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, [])


    return (
        <>
            <div className="container-inner">
                <HomeTop userObj={userObj}/>
                <div key={nweet.id} style={{ marginTop: 30 }}>
                    {nweets.map((nweet) => (
                        <Nweet 
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                        />
                    ))}
                </div>
                <address> &copy; Copyright 2022 , Ahn jisu. All Rights Rexerved</address>
            </div>
        </>
    );
};

export default Home;