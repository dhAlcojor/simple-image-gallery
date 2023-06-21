import {useContext, useEffect, useMemo} from "react";
import Card from "./components/Card";
import Layout from "./components/Layout";
import {FirebaseContext} from "./context/FirebaseContext";
import './App.css';
import {useAuthContext} from "./context/AuthContext";

function App() {
  const {state: {items}} = useContext(FirebaseContext);
  const {authenticate} = useAuthContext();

  const count = useMemo(
      () => `You have ${items.length} photo${items.length > 1 ? 's' : ''} in your gallery`,
      [items]
  );

  useEffect(() => {
    authenticate();
  }, []);

  return (
      <Layout>
        <h1>Gallery</h1>
        {count}
        <div className="row">
          {items.map((item, index) => <Card key={index} {...item} />)}
        </div>
      </Layout>
  );
}

export default App;
