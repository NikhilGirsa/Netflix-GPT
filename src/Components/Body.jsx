import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Register from "./Register";
import TVShows from "./TVShows";
import Movies from "./Movies";
import NewAndPopular from "./NewAndPopular";
import MyList from "./MyList";
import BrowseByLanguages from "./BrowseByLanguages";
import SearchResults from "./SearchResults";

const appRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/browse", element: <Browse /> },
  { path: "/register", element: <Register /> },
  { path: "/tv-shows", element: <TVShows /> },
  { path: "/movies", element: <Movies /> },
  { path: "/new-and-popular", element: <NewAndPopular /> },
  { path: "/my-list", element: <MyList /> },
  { path: "/browse-by-languages", element: <BrowseByLanguages /> },
  { path: "/search", element: <SearchResults /> },
]);

const Body = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
