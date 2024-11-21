import React, { Component } from "react";
import { rawData } from "./appData";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    Alldata: rawData,
    id: "",
    title: "",
    company: "",
    updateEdit: [],
  };

  getRecord = (id) => {
    const product = this.state.Alldata.find((item) => item.id === id);
    return product;
  };

  onEdit = (id) => {
    const tempProduct = this.state.Alldata;
    const index = tempProduct.indexOf(this.getRecord(id));
    const selectedRecord = tempProduct[index];
    this.setState({
      id: selectedRecord["id"],
      title: selectedRecord["title"],
      info: selectedRecord["info"],
      company: selectedRecord["company"],
      price: selectedRecord["price"],
    });
  };

  updateValue = (e, test) => {
    if (test === "title") {
      this.state.title = e.target.value;
    }
    if (test === "info") {
      this.state.info = e.target.value;
    }
    if (test === "price") {
      this.state.price = e.target.value;
    }
    if (test === "company") {
      this.state.company = e.target.value;
    }

    const tempArr = [
      this.state.id,
      this.state.title,
      this.state.info,
      this.state.price,
      this.state.company,
    ];
    this.setState({
      updateEdit: tempArr,
    });
  };

  onSave = (id) => {
    if (id !== "") {
      const SaveRecord = this.state.Alldata;
      const index = SaveRecord.indexOf(this.getRecord(id));
      const Record = SaveRecord[index];
      Record["title"] = this.state.updateEdit[1];
      Record["price"] = this.state.updateEdit[3];
      Record["info"] = this.state.updateEdit[2];
      Record["company"] = this.state.updateEdit[4];
      this.setState({
        Alldata: [...this.state.Alldata],
        id: "",
        title: "",
        info: "",
        price: "",
        company: "",
      });
    } else {
      const MaxId = Math.max(...this.state.Alldata.map((item) => item.id));
      const id = MaxId + 1;
      const newArr = [];
      newArr["title"] = this.state.updateEdit[1];
      newArr["price"] = this.state.updateEdit[3];
      newArr["info"] = this.state.updateEdit[2];
      newArr["company"] = this.state.updateEdit[4];
      this.setState({
        Alldata: [...this.state.Alldata, newArr],
        id: "",
        title: "",
        info: "",
        price: "",
        company: "",
      });
    }
  };

  onDelete = (id) => {
    const tempProduct = this.state.Alldata.filter((item) => item.id !== id);
    this.setState({
      Alldata: tempProduct,
    });
  };

  render() {
    // console.log(this.state.Alldata);

    return (
      <div>
        <ProductContext.Provider
          value={{
            ...this.state,
            onEdit: this.onEdit,
            updateValue: this.updateValue,
            onSave: this.onSave,
            onDelete: this.onDelete,
          }}
        >
          {this.props.children}
        </ProductContext.Provider>
      </div>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;
export default ProductProvider;
export { ProductConsumer };
