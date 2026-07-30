import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
// import StarRating from './StarRating';
// import Challenge from './Challenge';
// import Challenge2 from './Challenge2';
// import Challenge from './Challenge';

// function Test() {
//   const [movieRating, setMovieRating] = useState(0)
//   return <div>
//     <StarRating color='blue' maxRating={10} onSetRating={setMovieRating} />
//     <p>The rating has {movieRating} ratings</p>
//   </div>
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   {/* <StarRating maxRating={5} messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']} onSe />
  //   <StarRating color='red' size={24} className='test' defaultRating={2} />
  //   <Test/> */}
  //   <Challenge/>

  // </React.StrictMode>
  <App />
  // <Challenge2/>
);


