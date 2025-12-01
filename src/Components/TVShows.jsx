import { useSelector } from "react-redux";
import Header from "./Header";
import TVList from "./TVList";
import TVHero from "./TVHero";
import PreviewModal from "./PreviewModal";
import {
  useAiringTodayShows,
  useOnTheAirShows,
  usePopularShows,
  useTopRatedShows,
} from "../hooks/useTVShows";
import { useTVShowsByGenre, TV_GENRES } from "../hooks/useGenres";

const TVShows = () => {
  const tvShows = useSelector((store) => store.tv);

  // Fetch all TV show data
  useAiringTodayShows();
  useOnTheAirShows();
  usePopularShows();
  useTopRatedShows();

  // Fetch genre-specific TV shows
  const actionShows = useTVShowsByGenre(TV_GENRES.ACTION);
  const comedyShows = useTVShowsByGenre(TV_GENRES.COMEDY);
  const dramaShows = useTVShowsByGenre(TV_GENRES.DRAMA);
  const scifiShows = useTVShowsByGenre(TV_GENRES.SCIFI);
  const crimeShows = useTVShowsByGenre(TV_GENRES.CRIME);
  const documentaryShows = useTVShowsByGenre(TV_GENRES.DOCUMENTARY);
  const kidsShows = useTVShowsByGenre(TV_GENRES.KIDS);
  const animatedShows = useTVShowsByGenre(TV_GENRES.ANIMATION);

  return (
    <div className="bg-black min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      {/* Hero Section with Featured TV Show */}
      <TVHero />
      <div className="bg-black pb-20">
        <div className="-mt-32 md:-mt-40 lg:-mt-52 relative z-20 space-y-8 md:space-y-12">
          <TVList title="Airing Today" shows={tvShows.airingTodayShows} />
          <TVList title="Action & Adventure Shows" shows={actionShows} />
          <TVList title="Comedy Shows" shows={comedyShows} />
          <TVList title="Drama Series" shows={dramaShows} />
          <TVList title="Sci-Fi & Fantasy" shows={scifiShows} />
          <TVList title="Crime & Mystery" shows={crimeShows} />
          <TVList title="Documentaries" shows={documentaryShows} />
          <TVList title="Kids & Family" shows={kidsShows} />
          <TVList title="Animated Series" shows={animatedShows} />
          <TVList title="On The Air" shows={tvShows.onTheAirShows} />
          <TVList title="Popular TV Shows" shows={tvShows.popularShows} />
          <TVList title="Top Rated TV Shows" shows={tvShows.topRatedShows} />
        </div>
      </div>
      <PreviewModal />
    </div>
  );
};

export default TVShows;
