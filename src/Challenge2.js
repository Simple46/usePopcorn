// import React, { use, useEffect, useState } from 'react'

// function Challenge2() {
//     const [amount, setAmount] = useState(1);
//     // const [curFrom, setCurFrom] = useState('EUR');
//     const [curTo, setCurTo] = useState('USD');
//     const [converted, setConverted] = useState("");
//     const [isLoading, setIsLoading] = useState(false);


//     useEffect(function () {
//         async function convert() {
//             setIsLoading(true);
//             const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${curFrom}&to=${curTo}`);
//             const data = await res.json();
//             setConverted(data.rates[curTo]);
//             setIsLoading(false);
//         }

//         if (curFrom === curTo) return setConverted(amount);
//         if(amount===0) return setConverted(0);
//         convert()
//     },[amount, curFrom, curTo])
   
//   return (
//     <div>
//       <input type="text" value={amount} onChange={e=> setAmount(Number(e.target.value))} disabled={isLoading}  />
//       <select value={curFrom} onChange={(e)=> setCurFrom(e.target.value)} disabled={isLoading} >
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//       </select>
//       <select value={curTo} onChange={(e)=> setCurTo(e.target.value)} disabled={isLoading} >
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//       </select>
//       {isLoading ? <p>Loading...</p> : <p>{converted} {curTo}</p>}
//     </div>
//   );
// }

// export default Challenge2




// // // `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

// // export default function App() {
// //   return (
// //     <div>
// //       <input type="text" />
// //       <select>
// //         <option value="USD">USD</option>
// //         <option value="EUR">EUR</option>
// //         <option value="CAD">CAD</option>
// //         <option value="INR">INR</option>
// //       </select>
// //       <select>
// //         <option value="USD">USD</option>
// //         <option value="EUR">EUR</option>
// //         <option value="CAD">CAD</option>
// //         <option value="INR">INR</option>
// //       </select>
// //       <p>OUTPUT</p>
// //     </div>
// //   );
// // }