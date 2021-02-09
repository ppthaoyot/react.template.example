/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, CircularProgress, Chip } from "@material-ui/core";
import { Block, CheckCircle } from "@material-ui/icons";
import * as productGroupAxios from "../_redux/productGroupAxios";
import * as swal from "../../Common/components/SweetAlert";
import DeleteButton from "../../Common/components/Buttons/DeleteButton";
import EditButton from "../../Common/components/Buttons/EditButton";
import ProductGroupSearch from "./ProductGroupSearch";

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
      pgName: "",
    },
  });

  const [totalRecords, setTotalRecords] = React.useState(0);

  const [data, setData] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    //load data from api
    loadData();
  }, [filter]);

  const handleDelete = (id) => {
    //confirm
    swal.swalConfirm("Confirm delete?", `Confirm delete ${id}?`).then((res) => {
      if (res.isConfirmed) {
        //delete
        productGroupAxios
          .deleteProductGroup(id)
          .then((res) => {
            if (res.data.isSuccess) {
              //reload
              swal.swalSuccess("Success", `Delete ${id} success.`).then(() => {
                loadData();
              });
            }
          })
          .catch((err) => {
            //network error
            swal.swalError("Error", err.message);
          });
      }
    });
  };

  // const handleEdit = (id) => {
  //   props.history.push(`/employee/edit/${id}`);
  // };

  const handleSearch = (values) => {
    setFilter({
      ...filter,
      page: 1,
      searchValues: values,
    });
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
        // sort: false,
        // setCellHeaderProps: () => ({ align: "center" }),
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
                  alert(data[dataIndex].id);
                  //(data[dataIndex].id);
                }}
              >
                Edit
              </EditButton>
              <DeleteButton
                onClick={() => {
                  alert(data[dataIndex].id);
                  //handleDelete(data[dataIndex].id);
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
        filter.searchValues.pgName
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
            console.log(flatData);
          }
          setTotalRecords(res.data.totalAmountRecords);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
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
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          setFilter({ ...filter, page: tableState.page + 1 });
          break;
        case "sort":
          setFilter({
            ...filter,
            orderingField: `${tableState.sortOrder.name}`,
            ascendingOrder:
              tableState.sortOrder.direction === "asc" ? true : false,
          });
          break;
        case "changeRowsPerPage":
          setFilter({
            ...filter,
            recordsPerPage: tableState.rowsPerPage,
          });
          break;
        default:
          console.log(`action not handled. [${action}]`);
      }
    },
  };

  return (
    <div>
      {/* search */}
      <ProductGroupSearch
        submit={handleSearch.bind(this)}
        // submit={setSearchValues.bind(this)}
      ></ProductGroupSearch>
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
    </div>
  );
}

export default ProductGroupTable;
