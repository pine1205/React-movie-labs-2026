
import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import {getMovieCast }from "../../api/tmdb-api";
import MovieSimilar from "../movieSimilar";
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

const MovieDetails = ( props) => {
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
console.log(movie);
let simMovies = movie.results;
//cast - name of an array
//results - same



  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

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
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

<Paper component="ul" 
       sx={{...root}}>

       <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>  
  {movie.production_countries.map((country) => (
    <li key={country.iso_3166_1}>
      <Chip label={country.name} sx={{...chip}} />
    </li>
  ))}
</Paper>


 <Link to={`/movie/${movie.id}/similar`}>
          <Button variant="outlined" size="large"  sx={{ fontSize: "1.5rem", backgroundColor: "lightgreen", color: "white"}} 
          color="primary">
            Similar Movies
          </Button>
        </Link>

<Link to={`/movie/${movie.id}/cast`}>
          <Button variant="outlined" size="large"  sx={{ fontSize: "1.5rem", backgroundColor: "lightgreen", color: "white"}} 
          color="primary">
            Movie Cast Page
          </Button>
        </Link>

<Link to={`/movie/${movie.id}/recommendations`}>
          <Button variant="outlined" size="large"  sx={{ fontSize: "1.5rem", backgroundColor: "lightblue", color: "white"}} 
          color="primary">
            Recommendations
          </Button>
        </Link>


      <Fab
        color="secondary"
        variant="extended"
        sx={{
            position: "fixed",
            bottom: 2,
            right: 2
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      </>
  );
};
export default MovieDetails ;



