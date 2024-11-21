// import logo from "./logo.svg";
import "./App.css";
import ProductProvider, { ProductConsumer } from "./Context";
import Home from "./Components/BaseHome";

function App() {
  return (
    <ProductProvider>
      <div className="App">
        <Home />
      </div>
    </ProductProvider>
  );
}

export default App;
