import { Provider } from "react-redux";
import "./App.css";
import Navigation from "./navigation";
import { store } from "./Store/Store";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
