import React,{useContext} from "react";
import { Box, useTheme , IconButton} from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header.jsx";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToastContext from "../../context/ToastContext";
import { useDispatch } from 'react-redux'
import { setData } from '../../state/updateSlice'
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation } from "state/api";

const Admin = () => {
  const { toast } = useContext(ToastContext);
  const dispatch = useDispatch()
  const [deleteUser] = useDeleteUserMutation()
  const navigate = useNavigate();

  const deleteUsers = (data)=>{ 
    
    
    if (window.confirm("Are you sure you want to delete this contact?")) { 
      toast.success("Deleted Successfully");
      deleteUser(data)
    }else{
      toast.error("User Not deleted");
    }

  }  

  const updateUser = (data)=>{  
    dispatch(setData(data));
    navigate("/updateuser");
  }  
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();
    
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    // {
    //   field: "occupation",
    //   headerName: "Occupation",
    //   flex: 1,
    // },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "update",
      headerName: "Update",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 0.3,
      renderCell: (params) => (
        <IconButton aria-label="update" onClick={() => updateUser({id:params.row._id , name:params.row.name,email:params.row.email ,phoneNumber:params.row.phoneNumber ,role:params.row.role })}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 0.3,
      renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => deleteUsers({id:params.row._id})}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Admin;