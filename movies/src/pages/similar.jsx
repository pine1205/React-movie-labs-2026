import React from "react";
import { getsimilarMovies } from "../api/tmdb-api";
import { useLocation } from "react-router";
import PageTemplate from "../components/templateMoviePage";
import MovieSimilar from "../components/movieSimilar";








const similarMovies = (props) => {
  const { id } = useParams();
    const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['similar', {id: id}],
    queryFn: getsimilarMovies,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieSimilar movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default similarMovies;