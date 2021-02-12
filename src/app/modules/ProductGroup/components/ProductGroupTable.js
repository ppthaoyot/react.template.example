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
import * as productGroupAxios from "../_redux/productGroupAxios";
import * as swal from "../../Common/components/SweetAlert";
import ProductGroupSearch from "./ProductGroupSearch";
import ProductGroupAdd from "../components/ProductGroupAdd";
import ProductGroupDelete from "../components/ProductGroupDelete";
import ProductGroupEdit from "../components/ProductGroupEdit";
import AddButton from "../../Common/components/Buttons/AddButton";
import EditButton from "../../Common/components/Buttons/EditButton";
import DeleteButton from "../../Common/components/Buttons/DeleteButton";

var flatten = require("flat");
require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ProductGroupTable(props) {
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
  const [productGroupIdEdit, setProductGroupIdEdit] = useState(0);
  const [productGroupIdDelete, setProductGroupIdDelete] = useState(0);
  const [openModal, setOpenModel] = useState(false);

  React.useEffect(() => {
    loadData();
  }, [filter]);

  const handleSearch = (values) => {
    debugger;
    setFilter({
      ...filter,
      page: 1,
      searchValues: values,
    });
  };

  const handleAdd = () => {
    debugger;
    setOpenModel(true);
  };

  const handleEdit = (id) => {
    debugger;
    setProductGroupIdEdit(id);
  };

  const handleDelete = (id) => {
    debugger;
    setProductGroupIdDelete(id);
  };

  const handleReset = (value) => {
    debugger;
    switch (value) {
      case "FROM_ADD_RESET":
        setOpenModel(false);
        break;
      case "FROM_EDIT_RESET":
        setProductGroupIdEdit(0);
        break;
      case "FROM_DELETE_RESET":
        setProductGroupIdDelete(0);
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
      name: "name",
      label: "Name",
      option: {
        sort: false,
      },
    },
    {
      name: "createdBy",
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
    productGroupAxios
      .getProductGroupFilter(
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
              <ProductGroupSearch
                submit={handleSearch.bind(this)}
                name={filter.searchValues.name}
              ></ProductGroupSearch>
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
                  submit={handleReload.bind(this)}
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
            ProductGroup
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
      <ProductGroupAdd
        modal={openModal}
        submit={handleReload.bind(this)}
        reset={handleReset.bind(this)}
      ></ProductGroupAdd>

      <ProductGroupEdit
        productgroupid={productGroupIdEdit}
        submit={handleReload.bind(this)}
        reset={handleReset.bind(this)}
      ></ProductGroupEdit>

      <ProductGroupDelete
        productgroupid={productGroupIdDelete}
        submit={handleReload.bind(this)}
        reset={handleReset.bind(this)}
      ></ProductGroupDelete>
    </div>
  );
}

export default ProductGroupTable;
