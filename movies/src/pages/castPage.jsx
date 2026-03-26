import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import {getMovieCast }from "../api/tmdb-api";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
    background: "linear-gradient( #7a2af1 0%, #7e9fe8 0%, #c4faf6 100%)"
};
const chip = { margin: 0.5 };

const MovieCast = ( ) => {
 const { id } = useParams();

 
 const { data, error, isPending, isError } = useQuery({
    queryKey: ['cast', { id:id }],
    queryFn: getMovieCast,
  });
 if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }



   console.log(data)
let cast = data.cast;




return (
  <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Cast" sx={{...chip, fontSize: "30px", backgroundColor: "silver",color: "purple", margin: "50px", width: "500px", height: "50px"}} color="primary" />
        </li>
        {cast.map((g) => (
          <li key={g.name}
          style={{ display: "flex", flexDirection: "column",
           alignItems: "center", marginBottom: "20px" }}>

 {g.profile_path && (
          <img 
         src={`https://image.tmdb.org/t/p/w200${g.profile_path}`}
        alt={g.title} 
        style={{ width: "190px", borderRadius: "30px", margin: "30px" }}
      />
     )}

      <Chip label={g.name} sx={{...chip, fontSize: "20px", backgroundColor: "silver", color: "purple",  width: "350px", height: "50px"}} />
   </li>
        ))}
      </Paper>
      )

      };
export default MovieCast ;