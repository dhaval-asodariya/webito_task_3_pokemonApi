import React ,{useEffect, useState} from 'react';
import axios from 'axios'
import {Button, Input} from '@mui/joy'

import PokoCard from './PokoCard';
import { Link } from 'react-router-dom';
function FatchNDisplayCards() {
    const[allPokemons, setAllPokemons] = useState([]);
    const[loadmore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=5');
    const[searchText, setSearchText] = useState('');
    const[ isLodding, setIsLodding]= useState(true);
    const [categoty,setCategory] = useState([]);
  
    
    useEffect(()=>{
      console.log("useEffect called")
      if(allPokemons.length == 0){
        FatchPokemons();
       
      }
    },[])
   
    const FatchPokemons = async()=>{
       setIsLodding(true)
       console.log('loadmore1',loadmore)
        await axios.get(loadmore)
        .then((data)=>{
          console.log(data.data)
          setLoadMore(data.data.next)
          function createPokoObjects(results){
            results.forEach( async oneResult => {
              await axios.get(`https://pokeapi.co/api/v2/pokemon/${oneResult.name}`)
              .then((data)=>{
                setAllPokemons((priv)=>[...priv,data.data])
                
              })
            });
          }
          createPokoObjects(data.data.results);
        })
        .catch((error)=>console.log(error))
        setIsLodding(false)
    }
  //   const Fatchcategory =async ()=>{
  //     await axios.get(`https://pokeapi.co/api/v2/type`)
  //     .then((data)=>{
  //       console.log("name cate",data.data.results)
  //       setCategory(data.data.results.slice(0,6))
  //       // setAllPokemons(data.data)
  //     })
  //     .catch((error)=>console.log(error))
  
      
  // }
    function handleSearch(e){
      e.preventDefault();
      //  const filteredPoko =  allPokemons.filter((poko)=>poko.name.includes(searchText))
      if(searchText == "" && allPokemons.length != 5){
        setAllPokemons([])
        FatchPokemons()
      }else{
       setAllPokemons((priv)=>{
        const searchedPoko = priv.filter((poko)=>poko.name.includes(searchText))
        return searchedPoko;
       })
      }
      // FatchPoko(searchText)
    }
    return (
      <div className="App">
        <h1>Pokemon Evolution</h1>
        <form onSubmit={handleSearch} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Input sx={{margin:"10px"}} placeholder="Search poko…" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
          <Button type='submit' variant="soft">Search</Button>
  
        </form>
        <div className='all-container' style={{display:"flex",flexWrap:'wrap'}}>
          {isLodding?<p>Lodding...</p> :
           
            allPokemons?.map((pokemon,index)=>{
             return(<Link to={`pokemon/${pokemon.id}`}> <PokoCard 
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              /></Link>)
            })}
        </div>
        <Button variant="soft" onClick={FatchPokemons}>Load More</Button>
        {/* <button></button> */}
      </div>
    );
  }

export default FatchNDisplayCards