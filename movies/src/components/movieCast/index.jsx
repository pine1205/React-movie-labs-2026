 
import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";

import { useQuery } from "@tanstack/react-query";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import {getMovieCast }from "../../api/tmdb-api";

import Button from "@mui/material/Button";
import { Link } from "react-router";



import Spinner from '../spinner';
import { getMovies } from "../../api/tmdb-api";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };
 
 
 const getMovieCast = ( props) => {
  const movie = props.movie

 
 const { data, error, isPending, isError } = useQuery({
    queryKey: ['cast', { id: movie.id }],
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
export default getMovieCast ;