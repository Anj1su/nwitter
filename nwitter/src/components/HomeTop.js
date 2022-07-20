import { dbService, storageService } from "myBase";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore"
import {
    ref,
    uploadString,
    getDownloadURL
} from "firebase/storage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const HomeTop = ({ refreshUser, userObj }) => {
    const [nweet, setNweet] = useState("");
    const [photo, setPhoto] = useState("");

    //선택했던 첨부파일명 없애기
    const photoInput = useRef();

    //Firebase에 보낸 트윗 저장하기 (사진, 텍스트)
    const onSubmit = async (event) => {
        if (nweet === "") {
            return;
        }
        event.preventDefault();
        let photoUrl = "";
        if (photo !== "") {
            const photoRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const uplaodPhoto = await uploadString(photoRef, photo, "data_url");
            photoUrl = await getDownloadURL(uplaodPhoto.ref);
        }

        //트윗할때, 메시지와 사진도 같이 firestore에 생성
        const nweetPosting = {
            text: nweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
            photoUrl,
        };
        // //트윗하기 누르면 nweetPosting 형태로 새로운 document 생성하여 nweets 콜렉션에 넣기
        await addDoc(collection(dbService, "nweets"), nweetPosting);
        // state 비워서 form 비우기
        setNweet("");
        //파일 미리보기 img src 비워주기
        setPhoto("");

        photoInput.current.value = "";
        refreshUser();
    };

    const onChange = async (event) => {
        const {
            target: {value},
        } = event;
        setNweet(value);
    };

    //이미지 첨부하기
    const onFileChange  = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader =  new FileReader();

        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result},} = finishedEvent;
            setPhoto(result)
        }
        reader.readAsDataURL(theFile);
    };

    const onClearPhoto = () => {
        setPhoto("");
        photoInput.current.value = "";
    };

    return (
        <form onSubmit={onSubmit} className="hTForm">
            <div className="hTInput-container">
                <input
                    className="hTInput-input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="오늘 하루는 어떠셨나요?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="hTInput-arrow" />
            </div>
            <label for="attach-file" className="hTInput-label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                ref={photoInput}
                className="ImgAdd"
            />
            <input type="submit" value="" />
            
            {photo && (
                <div className="hTForm-attachment">
                    <img
                        src={photo}
                        alt="preview"
                        style={{
                            backgroundImage: photo,
                        }}
                    />
                    <div className="hTForm-clear" onClick={onClearPhoto}>
                        <span>지우기</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
}
export default HomeTop;