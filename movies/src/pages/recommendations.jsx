import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import {getRecommendations }from "../api/tmdb-api";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
     background: "linear-gradient(#7e9fe8 0%, #0b1731 0%, #c4faf6 100%)"
};
const chip = { margin: 0.5 };

const MovieRecommendations = ( ) => {
 const { id } = useParams();

 
 const { data, error, isPending, isError } = useQuery({
    queryKey: ['recommendations', { id:id }],
    queryFn: getRecommendations,
  });
 if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }



   console.log(data)
let recommendations = data.results;




return (
  <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Recommendations" sx={{...chip, fontSize: "30px", backgroundColor: "silver",color: "purple", margin: "50px", width: "500px", height: "50px"}} color="primary" />
        </li>
        {recommendations.map((g) => (
          <li key={g.id}>
            <Typography variant="h3" component="h2" sx={{ margin: 1, color: "turquoise" }}>
                  {g.title}
     </Typography>
     <p style={{ fontSize: "30px", color: "mintcream"}}><strong>Overview:</strong> {g.overview}</p>
      <img 
        src={`https://image.tmdb.org/t/p/w500${g.poster_path}`} 
        alt={g.title} 
        style={{ width: "150px", borderRadius: "8px" }}
      />
      
     <p  style={{ fontSize: "30px", color: "purple" }}><strong>Release:</strong> {g.release_date}</p>
     <p  style={{ fontSize: "30px", color: "purple", textDecoration: "underline" }}><strong>Rating:</strong> {g.vote_average}</p>
          </li>
    
        ))}
      </Paper>
      )

      };
export default MovieRecommendations ;