import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import { useAuth } from '../../contexts/AuthContext';

export default function modifySong () {
    const {token} = useAuth("state");
    const [songData, setSongData] = useState();
    const [submitting, setSubmitting] = useState(false);
    const [error , setError] = useState(null);
    
    const handleInputChange = (event) =>{
        setSongData({...songData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        if (!submitting){
            setSubmitting(true);
            setError(null);
        }
    }
    return(
        <p>Hola</p>
    )
}
