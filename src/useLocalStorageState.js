import { useEffect, useState } from "react";

 
    
export function useLocalStorageState() {

   const [watched, setWatched] = useState(() => {
     const storedValue = localStorage.getItem("watched");

     return storedValue ? JSON.parse(storedValue) : [];
   });
      
    useEffect(
        function () {
          localStorage.setItem("watched", JSON.stringify(watched));
        },
        [watched],
    );
    
    return { watched, setWatched }
    
}