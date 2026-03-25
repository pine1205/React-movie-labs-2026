import React from "react";
import { getsimilarMovies } from "../api/tmdb-api";
import { useLocation } from "react-router";
import PageTemplate from "../components/templateMoviePage";
import MovieSimilar from "../components/movieSimilar";
import { useParams } from 'react-router';
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";





const SimilarMovies = (props) => {
  const { id } = useParams();
    const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['similar', {id: movie.id}],
    queryFn: getsimilarMovies,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


 console.log(movie)
let similar = movie.results;

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieSimilar movie={similar} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default SimilarMovies;