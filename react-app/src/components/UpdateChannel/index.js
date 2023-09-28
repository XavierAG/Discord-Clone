import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import * as channelStore from "../../store/channel";
import './UpdateChannel.css'

export default function UpdateChannel(){
const dispatch = useDispatch()
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
    return(
        <div>
            
        </div>
    )
}
