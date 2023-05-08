import React , {useState} from 'react'
import {Box } from "@mui/material"
import {Outlet} from "react-router-dom"
import { useSelector   } from 'react-redux'
import Navbar from "components/Navbar"
import SideBar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

const Layout = () => {
  const [sideBarOpened , setsideBarOpened ] = useState(true)

  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  
  return (
    <Box display={"flex"} width="100%" height="100%" >
      <SideBar
        user={data || {}}
        widthDrawer="300px"
        sideBarOpened = {sideBarOpened}
        setsideBarOpened = {setsideBarOpened}

      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          sideBarOpened = {sideBarOpened}
          setsideBarOpened = {setsideBarOpened}
        />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout