import React from "react";
import { getupcoming } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import BasicTimeline from '../components/MUI_basicTimeline';

import BasicPagination from '../components/pagination';




const upcoming = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['upcoming'],
    queryFn: getupcoming,
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
        title="Upcoming Movies"
        movies={movies}
       action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
          return <PlaylistAddIcon movie={movie} />
        }}
        
      />
      
  );

}
export default upcoming;
