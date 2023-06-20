import {useContext, useMemo} from "react";
import Card from "./components/Card";
import Layout from "./components/Layout";
import {Context} from "./context";
import './App.css';

function App() {
  const {state: {items}} = useContext(Context);

  const count = useMemo(
      () => `You have ${items.length} photo${items.length > 1 ? 's' : ''} in your gallery`,
      [items]
  );

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
