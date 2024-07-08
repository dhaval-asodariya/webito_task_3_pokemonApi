import { Button } from '@mui/joy';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function PokoPage() {
    const {id}= useParams();
    const [cardData, setCardData]= useState();
    const[islodding,setIsLodding] =useState(true)
    useEffect( ()=>{
        setpoko()
    },[]);
    const navigate = useNavigate();
    const setpoko = async ()=>{
        setIsLodding(true)
        await  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((data)=>{
            console.log("pokopage",data)
            setCardData(data.data)})
        
        .catch((error)=>console.log(error))
        setIsLodding(false)
    }

  return (<div>
    {islodding ? <p> "Lodding..." </p>:

    <div style={{display:'flex',flexDirection:"column",padding:'20px',maxWidth:'700px',margin:'auto'}}>
        <Button variant="soft" onClick={()=>navigate('/')}>Back</Button>
        <img style={{width:"150px"}} src={cardData.sprites.other.dream_world.front_default}/>
    <div >
        <p><strong>Name:</strong> {cardData.name}</p>
        <p><strong>Type:</strong> {cardData.types.map((type)=>type.type.name).join(' , ')}</p>
        <p><strong>Stats:</strong> {cardData.stats.map((stat)=>(<p>{stat.stat.name} : {stat.base_stat}</p>))  }</p>
        <p><strong>Abilities: </strong>{cardData.abilities.map((abi)=>abi.ability.name).join(' , ')}</p>
        <p><strong>Some moves:</strong> {cardData.moves.slice(0,5).map((move)=>move.move.name).join(' , ')}</p>


    </div>
    </div>
    }
    </div>
  )
}

export default PokoPage