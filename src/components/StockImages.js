import List from "./List";
import {useAuthContext} from "../context/AuthContext";
import {useFirestoreContext} from "../context/FirestoreContext";
import {useMemo} from "react";

const StockImages = () => {
  const {state} = useFirestoreContext();
  const {currentUser} = useAuthContext();

  const items = useMemo(() => {
    const username = currentUser?.displayName.toLowerCase().split(" ").join("");
    return currentUser ? state.items.filter(item => item.user === username) : [];
  }, [state.items, currentUser]);
  return (
      <>
        <h1>My Stock Images</h1>
        <List items={items}/>
      </>
  );
};

export default StockImages;
