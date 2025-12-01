import { useSelector } from "react-redux";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import PreviewModal from "./PreviewModal";
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTopRatedMovies,
  useUpcomingMovies,
  useMovieTrailer,
} from "../hooks/useMovies";

const Browse = () => {
  const movies = useSelector((store) => store.movies);

  // Fetch all movie data
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  // Fetch trailer for the first movie
  const mainMovieId = movies?.nowPlayingMovies?.[0]?.id;
  useMovieTrailer(mainMovieId);

  return (
    <div className="bg-black min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      {/* HOME PAGE - Video Banner */}
      <MainContainer />
      <SecondaryContainer />
      <PreviewModal />
    </div>
  );
};

export default Browse;
