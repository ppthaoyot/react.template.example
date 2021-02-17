/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Typography,
  CircularProgress,
  Chip,
  Card,
  CardContent,
} from "@material-ui/core";
import { Block, CheckCircle } from "@material-ui/icons";
import * as productAxios from "../../Product/_redux/productAxios";
import * as swal from "../../Common/components/SweetAlert";
import ProductSearch from "../../Product/components/ProductSearch";
import ProductAdd from "../../Product/components/ProductAdd";
import ProductDelete from "../../Product/components/ProductDelete";
import ProductEdit from "../../Product/components/ProductEdit";
import AddButton from "../../Common/components/Buttons/AddButton";
import EditButton from "../../Common/components/Buttons/EditButton";
import DeleteButton from "../../Common/components/Buttons/DeleteButton";

var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ProductTable(props) {
  const [filter, setFilter] = React.useState({
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
    searchValues: {
      name: "",
    },
  });

  const [totalRecords, setTotalRecords] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [productIdEdit, setProductIdEdit] = useState(0);
  const [productIdDelete, setProductIdDelete] = useState(0);
  const [openModal, setOpenModel] = useState(false);

  React.useEffect(() => {
    loadData();
  }, [filter]);

  const handleSearch = (values) => {
    setFilter({
      ...filter,
      page: 1,
      searchValues: values,
    });
  };

  const handleAdd = () => {
    setOpenModel(true);
  };

  const handleEdit = (id) => {
    setProductIdEdit(id);
  };

  const handleDelete = (id) => {
    setProductIdDelete(id);
  };

  const handleReset = (value) => {
    switch (value) {
      case "FROM_ADD_RESET":
        setOpenModel(false);
        break;
      case "FROM_EDIT_RESET":
        setProductIdEdit(0);
        break;
      case "FROM_DELETE_RESET":
        setProductIdDelete(0);
        break;
      default:
        break;
    }
  };

  const handleReload = (value) => {
    switch (value) {
      case "FROM_ADD_SUBMIT":
        setFilter({
          ...filter,
          page: 1,
          searchValues: { name: "" },
        });
        break;
      case "FROM_EDIT_SUBMIT":
      case "FROM_DELETE_SUBMIT":
        loadData();
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      name: "id",
      label: "Id",
      option: {
        sort: false,
      },
    },
    {
      name: "productGroup.name",
      label: "Group",
      option: {
        sort: false,
      },
    },
    {
      name: "name",
      label: "Name",
      option: {
        sort: false,
      },
    },
    {
      name: "price",
      label: "Price",
      option: {
        sort: false,
      },
    },
    {
      name: "name",
      label: "Name",
      option: {
        sort: false,
      },
    },
    {
      name: "stock",
      label: "Stock",
      option: {
        sort: false,
      },
    },
    {
      name: "createdBy.username",
      label: "CreatedBy",
      option: {
        sort: false,
      },
    },
    {
      name: "createdDate",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {dayjs(data[dataIndex].dateOfBirth).format("DD/MM/YYYY")}
            </Grid>
          );
        },
      },
    },
    {
      name: "isActive",
      label: "isActive",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {data[dataIndex].isActive === true ? (
                <Chip
                  icon={<CheckCircle />}
                  label="Active"
                  variant="outlined"
                  color="primary"
                />
              ) : (
                <Chip
                  icon={<Block />}
                  label="Delete"
                  variant="outlined"
                  color="default"
                />
              )}
            </Grid>
          );
        },
      },
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        viewColumns: false,
        setCellHeaderProps: () => ({ align: "center" }),
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Grid
              style={{ padding: 0, margin: 0 }}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <EditButton
                style={{ marginRight: 5 }}
                onClick={() => {
                  handleEdit(data[dataIndex].id);
                }}
              >
                Edit
              </EditButton>
              <DeleteButton
                style={{ marginRight: 5 }}
                disabled={data[dataIndex].isActive === true ? false : true}
                onClick={() => {
                  handleDelete(data[dataIndex].id);
                }}
              >
                Delete
              </DeleteButton>
            </Grid>
          );
        },
      },
    },
  ];

  const loadData = () => {
    setIsLoading(true);
    productAxios
      .getProductFilter(
        filter.orderingField,
        filter.ascendingOrder,
        filter.page,
        filter.recordsPerPage,
        filter.searchValues.name
      )
      .then((res) => {
        if (res.data.isSuccess) {
          //flatten data
          if (res.data.totalAmountRecords > 0) {
            let flatData = [];
            res.data.data.forEach((element) => {
              flatData.push(flatten(element));
            });
            setData(flatData);
          } else {
            setData(res.data.data);
          }
          setTotalRecords(res.data.totalAmountRecords);
        } else {
          swal.swalError("Error", res.data.message);
        }
      })
      .catch((err) => {
        swal.swalError("Error", err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    filter: false,
    search: false,
    selectableRows: "none",
    serverSide: true,
    count: totalRecords,
    page: filter.page - 1,
    rowsPerPage: filter.recordsPerPage,
    searchPlaceholder: "กรอกข้อมูลอย่างน้อย 3 ตัวอักษร..",
    onChangePage: (currentPage) => {
      setFilter({ ...filter, page: currentPage + 1 });
    },
    onChangeRowsPerPage: (numberOfRows) => {
      setFilter({ ...filter, recordsPerPage: numberOfRows });
    },
    onSearchChange: (searchText) => {
      let search = searchText ? searchText : "";
      if (search.length >= 3) {
        setFilter({ ...filter, searchText: search });
      }
    },
    onColumnSortChange: (changedColumn, direction) => {
      setFilter({
        ...filter,
        orderingField: changedColumn,
        ascendingOrder: direction === "asc" ? true : false,
      });
    },
  };

  return (
    <div>
      {/* search */}
      <Card elevation={3} style={{ marginBottom: 5 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <ProductSearch
                returnvalue={handleSearch.bind(this)}
                name={filter.searchValues.name}
              ></ProductSearch>
            </Grid>
            <Grid
              container
              item
              xs={12}
              lg={6}
              direction="row"
              justify="flex-start"
              alignItems="flex-end"
            >
              <Grid item xs={12} lg={2}>
                <AddButton
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  Add
                </AddButton>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <MUIDataTable
        title={
          <Typography variant="h6">
            Product
            {isLoading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        data={data}
        columns={columns}
        options={options}
      />
      <ProductAdd
        modal={openModal}
        returnvalue={handleReload.bind(this)}
        reset={handleReset.bind(this)}
      ></ProductAdd>

      <ProductEdit
        productid={productIdEdit}
        returnvalue={handleReload.bind(this)}
        reset={handleReset.bind(this)}
      ></ProductEdit>

      <ProductDelete
        productid={productIdDelete}
        returnvalue={handleReload.bind(this)}
        reset={handleReset.bind(this)}
      ></ProductDelete>
    </div>
  );
}

export default ProductTable;
