import React from "react";
import { gettopRated } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
//import PlaylistAddIcon from "mui/icons-material/PlaylistAdd";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'




const topRated = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['topRated'],
    queryFn: gettopRated,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;


   return (
      <PageTemplate
        title="Top Rated Movies"
        movies={movies}
       action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
        
      />
  );

}
export default topRated;
