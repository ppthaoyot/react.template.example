import React from "react";
import ProductGroupTable from "../components/ProductGroupTable";

function ProductGroupPage(props) {
  return (
    <div>
      <ProductGroupTable history={props.history}></ProductGroupTable>
    </div>
  );
}

export default ProductGroupPage;
