import React from "react";
import ProductTable from "../../Product/components/ProductTable";

function ProductGroupPage(props) {
  return (
    <div>
      <ProductTable history={props.history}></ProductTable>
    </div>
  );
}

export default ProductGroupPage;
