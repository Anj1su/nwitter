import React, { useState } from "react";
import { dbService, storageService } from "myBase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNeet] = useState(nweetObj.text);

    const NweetTextRef = doc(dbService, `nweets/${nweetObj.id}`);

    //Delete 버튼을 누를 때
    const onDeleteClick = async () => {
        const ok = window.confirm("게시물을 삭제하시겠습니까?");
        if(ok){
            //확인을 눌렀을 때 삭제됨
            await deleteDoc(NweetTextRef);
            await storageService.refFromURL(nweetObj.photoUrl).delete();
        }
    };
    //Edit 버튼을 누를 때
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();

        //업데이트 버튼
        await updateDoc(NweetTextRef,{
            text: newNweet,
        });
        //editing 모드가 아니도록 호출
        setEditing(false);
    }

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNeet(value);
    }
    
    return (
        <div className="text-area">
           {editing ? (
                <>
                    <form onSubmit={onSubmit} className="nweetEdit">
                        <input 
                            onChange={onChange}
                            type="text"
                            placeholder="당신의 트윗을 수정하세요"
                            autoFocus
                            value={newNweet}
                            required
                            className="formInput"
                        />
                        <input type="submit" value="업데이트" className="formBtn"/>
                    </form>
                  <button onClick={toggleEditing} className="formBtn cancelBtn">취소</button>
                </>
            ) : (
            <>
                <h4>{nweetObj.text}</h4>

                {nweetObj.photoUrl && <img src={nweetObj.photoUrl}/>}

                {isOwner && (
                <>
                    <div class="text-contents">
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </div>
                </>
                )}
            </>
            )}
        </div>
    );
}

export default Nweet;