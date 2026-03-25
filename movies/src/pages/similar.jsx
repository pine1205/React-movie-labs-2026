import React from "react";
import { getsimilarMovies } from "../api/tmdb-api";
import { useLocation } from "react-router";
import PageTemplate from "../components/templateMoviePage";
//import MovieSimilar from "../components/movieSimilar";
import { useParams } from 'react-router';
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";




const MovieSimilar = ({ movie }) => {
  if (!movie) {
    return <p>Waiting for movie details</p>;
  }

  // fetch similar movies only if movie is defined
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['similar', { id: movie.id }],
    queryFn: () => getsimilarMovies(movie.id),
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

console.log(data);
 let similar = data.results;

  return (
    <PageTemplate movie={movie}>
      <h2>Similar Movies</h2>
      <ul>
        {data?.results?.map((m) => (
          <li key={m.id}>{m.title}</li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default MovieSimilar;