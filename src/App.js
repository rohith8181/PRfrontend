import Modal from "react-modal"
import 'react-toastify/dist/ReactToastify.css';


import RoutesComponent from './Router';
import { Provider } from "react-redux";
import { store } from "./redux/store";

Modal.setAppElement('#root');

function App() {
  return (
    <div>

      <Provider store={store}>
        <RoutesComponent />
      </Provider>
    </div>
  );
}

export default App;
