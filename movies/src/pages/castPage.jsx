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
          <Chip label="Cast" sx={{...chip}} color="primary" />
        </li>
        {cast.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      )

      };
export default MovieCast ;