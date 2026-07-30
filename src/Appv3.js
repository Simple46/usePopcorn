// import { useEffect, useRef, useState } from "react";
// import StarRating from "./StarRating";

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// const KEY = "23d57b7a";

// export default function App() {
//   const [query, setQuery] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedId, setSelectedId] = useState(null);

//   // const [watched, setWatched] = useState([]);
//   const [watched, setWatched] = useState(function () {
//     const storedValue = localStorage.getItem("watched");
//     return JSON.parse(storedValue);
//   });

//   // const temQuery = "spiderman";

//   const handleSelectMovie = function (id) {
//     setSelectedId(() => (selectedId === id ? null : id));
//   };

//   const handleCloseMovie = function () {
//     setSelectedId(null);
//   };

//   function handleAddWatch(movie) {
//     setWatched((watched) => [...watched, movie]);
//     // localStorage.setItem("watched", JSON.stringify([...watched, movie]))
//   }

//   function handleDeleteWatched(id) {
//     setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
//   }

//   useEffect(
//     function () {
//       localStorage.setItem("watched", JSON.stringify(watched));
//     },
//     [watched],
//   );

//   useEffect(
//     function () {
//       setIsLoading(true);
//       setError("");
//       const controller = new AbortController();

//       async function fetchMovies() {
//         try {
//           const res = await fetch(
//             `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
//             { signal: controller.signal },
//           );

//           if (!res.ok)
//             throw new Error("Something went wrong with fetching movies");

//           const data = await res.json();
//           if (data.Response === "False") throw new Error("Movie not found");
//           setMovies(data.Search);
//         } catch (err) {
//           if (err.name !== "AbortError") {
//             setError(err.message);
//           }
//         } finally {
//           setIsLoading(false);
//         }
//         if (query.length < 3) {
//           setMovies([]);
//           setError("");
//         }
//       }
//       handleCloseMovie();
//       fetchMovies();

//       return function () {
//         controller.abort();
//       };
//     },
//     [query],
//   );

//   return (
//     <>
//       <NavBar>
//         <Logo />
//         <Search query={query} setQuery={setQuery} />
//         <Numresults />
//       </NavBar>
//       <Main>
//         <Box>
//           {/* {isLoading ? <Loader/> : <MovieList movies={movies} />} */}

//           {isLoading && <Loader />}
//           {!isLoading && !error && (
//             <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
//           )}
//           {error && <ErrorMessage message={error} />}
//         </Box>
//         <Box>
//           {selectedId ? (
//             <MovieDetails
//               selectedId={selectedId}
//               onCloseMovie={handleCloseMovie}
//               onAddWatch={handleAddWatch}
//               watched={watched}
//             />
//           ) : (
//             <>
//               <WatchedSummary watched={watched} />
//               <WatchedMovieList
//                 watched={watched}
//                 onDeleteWatch={handleDeleteWatched}
//               />
//             </>
//           )}
//         </Box>
//       </Main>
//     </>
//   );
// }

// function ErrorMessage({ message }) {
//   return <p className="error">Error: {message}</p>;
// }

// function Loader() {
//   return <p className="loader">Loading...</p>;
// }

// function NavBar({ children }) {
//   return <nav className="nav-bar">{children}</nav>;
// }
// function Main({ children }) {
//   return <main className="main">{children}</main>;
// }

// /*
// function WatchedBox() {
//     const [watched, setWatched] = useState(tempWatchedData);
//     const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched } />
//         <WatchedMovieList watched={watched}/>

//         </>
//       )}
//     </div>
//   );
// }
// */

// function Box({ children }) {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen && children}
//     </div>
//   );
// }

// function WatchedMovieList({ watched, onDeleteWatch }) {
//   return (
//     <ul className="list">
//       {watched.map((movie) => (
//         <WatchedMovie
//           movie={movie}
//           key={movie.imdbID}
//           onDeleteWatch={onDeleteWatch}
//         />
//       ))}
//     </ul>
//   );
// }

// function WatchedMovie({ movie, onDeleteWatch }) {
//   return (
//     <li>
//       <img src={movie.Poster} alt={`${movie.Title} poster`} />
//       <h3>{movie.Title}</h3>
//       <div>
//         <p>
//           <span>⭐️</span>
//           <span>{movie.imdbRating}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{movie.userRating}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{movie.runtime} min</span>
//         </p>
//         <button
//           className="btn-delete"
//           onClick={() => onDeleteWatch(movie.imdbID)}
//         >
//           X
//         </button>
//       </div>
//     </li>
//   );
// }

// function MovieDetails({ selectedId, onCloseMovie, onAddWatch, watched }) {
//   const [movie, setMovie] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [userRating, setUserRating] = useState("");

//   const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
//   const watchedUserRating = watched.find(
//     (movie) => movie.imdbID === selectedId,
//   )?.userRating;

//   const {
//     Title: title,
//     Year: year,
//     Poster: poster,
//     Runtime: runtime,
//     imdbRating,
//     Plot: plot,
//     Released: released,
//     Actors: actors,
//     Director: director,
//     Genre: genre,
//   } = movie;

//   const isTop = imdbRating > 8;
//   console.log(isTop);

//   // const [avgRatings, setAvgratings] = useState(0)

//   function handleAdd() {
//     const newWatchedMovie = {
//       imdbID: selectedId,
//       Title: title,
//       Year: year,
//       Poster: poster,
//       runtime: Number(runtime.split(" ").at(0)),
//       imdbRating: Number(imdbRating),
//       userRating: Number(userRating),
//     };
//     onAddWatch(newWatchedMovie);
//     onCloseMovie();

//     // setAvgratings(Number(imdbRating))

//     // setAvgratings(avgRatings =>  (avgRatings + userRating)/2)
//   }

//   useEffect(
//     function () {
//       function callback(e) {
//         console.log("Code:", e.code);
//         if (e.code === "Escape") {
//           onCloseMovie();
//         }
//       }
//       window.addEventListener("keydown", callback);

//       return window.removeEventListener("keydown", callback);
//     },
//     [onCloseMovie],
//   );

//   useEffect(
//     function () {
//       setIsLoading(true);
//       async function getMovieDetails() {
//         const res = await fetch(
//           `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
//         );
//         const data = await res.json();
//         setMovie(data);
//         setIsLoading(false);
//       }

//       getMovieDetails();
//     },
//     [selectedId],
//   );

//   useEffect(
//     function () {
//       if (!title) return;
//       document.title = `Movie | ${title}`;

//       return function () {
//         document.title = "usePopcorn";
//         console.log(`The cleanup function for ${title} is running`);
//       };
//     },
//     [title],
//   );

//   return (
//     <div className="details">
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <header>
//             <button className="btn-back" onClick={onCloseMovie}>
//               &larr;
//             </button>
//             <img src={poster} alt={`Poster of ${title}`} />
//             <div className="details-overview">
//               <h2>{title}</h2>
//               <p>
//                 {released} &bull; {runtime}{" "}
//               </p>
//               <p>{genre}</p>
//               <p>
//                 <span>⭐️</span> {imdbRating} iMDB Ratings
//               </p>
//             </div>

//             {/* <p>{avgRatings}</p> */}
//           </header>

//           <section>
//             <div className="rating">
//               {!isWatched ? (
//                 <>
//                   <StarRating
//                     maxRating={10}
//                     size={24}
//                     onSetRating={setUserRating}
//                   />

//                   {userRating > 0 && (
//                     <button className="btn-add" onClick={handleAdd}>
//                       + Add to list
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <p>
//                   You have watched this movie and rated it {watchedUserRating}
//                   <span>⭐️</span>
//                 </p>
//               )}
//             </div>

//             <p>
//               <em>{plot}</em>
//             </p>
//             <p>{year}</p>
//             <p>Starings {actors}</p>
//             <p>Directed by {director}</p>
//           </section>
//         </>
//       )}
//     </div>
//   );
// }

// function WatchedSummary({ watched }) {
//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));
//   return (
//     <div className="summary">
//       <h2>Movies you watched</h2>
//       <div>
//         <p>
//           <span>#️⃣</span>
//           <span>{watched.length} movies</span>
//         </p>
//         <p>
//           <span>⭐️</span>
//           <span>{avgImdbRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{avgUserRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{avgRuntime.toFixed(2)} min</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// function Search({ query, setQuery }) {
//   const inputEl = useRef(null);

//   useEffect(
//     function () {

//  setQuery("");
//  inputEl.current.focus();
//       function myCallback(e) {
//         if (e.code === "Enter") {

//           console.log("new");
//         }
//       }

//       document.addEventListener("keydown", myCallback);

//       return document.addEventListener("keydown", myCallback);
//     },
//     [setQuery],
//   );

//   return (
//     <input
//       className="search"
//       type="text"
//       placeholder="Search movies..."
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//       ref={inputEl}
//     />
//   );
// }

// function Logo() {
//   return (
//     <div className="logo">
//       <span role="img">🍿</span>
//       <h1>usePopcorn</h1>
//     </div>
//   );
// }
// function Numresults() {
//   return (
//     <p className="num-results">
//       Found <strong>X</strong> results
//     </p>
//   );
// }

// function MovieList({ movies, onSelectMovie }) {
//   return (
//     <ul className="list list-movies">
//       {movies?.map((movie) => (
//         <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
//       ))}
//     </ul>
//   );
// }

// function Movie({ movie, onSelectMovie }) {
//   return (
//     <li onClick={() => onSelectMovie(movie.imdbID)}>
//       <img src={movie.Poster} alt={`${movie.Title} poster`} />
//       <h3>{movie.Title}</h3>
//       <div>
//         <p>
//           <span>🗓</span>
//           <span>{movie.Year}</span>
//         </p>
//       </div>
//     </li>
//   );
// }
