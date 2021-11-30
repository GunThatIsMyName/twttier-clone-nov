import { useEffect, useState } from "react";
import { firebaseAuth } from "./firebase";
import Router from "./components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLogin] = useState(firebaseAuth.currentUser);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? 
      <Router isLoggedIn={isLoggedIn} /> : <h1>Pending ....</h1>
      }
      <footer>2001 copy@ gani # </footer>
    </>
  );
}

export default App;
