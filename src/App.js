import {useContext, useEffect, useMemo} from "react";
import {FirestoreContext} from "./context/FirestoreContext";
import './App.css';
import {useAuthContext} from "./context/AuthContext";
import List from "./components/List";

function App() {
  const {state: {items}} = useContext(FirestoreContext);
  const {authenticate} = useAuthContext();

  const count = useMemo(
      () => `You have ${items.length} photo${items.length > 1 ? 's' : ''} in your gallery`,
      [items]
  );

  useEffect(() => {
    authenticate();
  }, []);

  return (
      <>
        <h1>Gallery</h1>
        {count}
        <List items={items}/>
      </>
  );
}

export default App;
