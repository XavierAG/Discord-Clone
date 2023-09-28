import React, {useState} from  "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as channelStore from '../../store/channel'
import './CreateChannelModal.css'
import { useParams } from "react-router-dom";

export default function CreateChannelModal() {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [name, setName] = useState('')

    const [isPrivate, setisPrivate] = useState(false)
    const [errors, setErrors] = useState({})

    const serverId = useSelector(state => (
        state.servers.currentServer ?
          state.servers.currentServer :
          null
      ));

    const handleSubmit = async (e) => {
        e.preventDefault()
        return dispatch(channelStore.postChannelThunk({
            name,
            serverId,
            isPrivate
        })).then(closeModal)
            // .catch(async (res) => {
            //     const data = await res.json()
            //     if (data && data.errors) setErrors(data.errors)
            //     return data
            // })
    }
    return (
        <div>
            <h2>Create Channel</h2>
            <form onSubmit={handleSubmit}>
                <div className="channel-name">
                    <h3>Channel Name</h3>
                    <input type="text" value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} placeholder="# new-channel"></input>
                </div>
                <div className="private-channel">
                    <h3>Private Channel</h3>
                    <input type="checkbox" id="private-checkbox" checked={isPrivate}
                        onChange={e => setisPrivate(e.target.checked)}></input>
                </div>
                <div className="channel-buttons">
                    <button id="cancel-button" onClick={closeModal}>Cancel</button>
                    <button id="create-channel-button" type="submit">Create Channel</button>
                </div>
            </form>
        </div>
    )
}
