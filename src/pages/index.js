import styles from "@/styles/Home.module.css";

import ProductProvider, { ProductConsumer } from "./Context";
import BaseHome from "./Components/BaseHome";

export default function Home() {
  return (
    <ProductProvider>
      <div className="App">
        <BaseHome />
      </div>
    </ProductProvider>
  );
}
