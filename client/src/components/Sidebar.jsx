import React from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
  } from "@mui/material";
  import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
  } from "@mui/icons-material";

  import { useEffect, useState } from "react";
    import { useLocation, useNavigate } from "react-router-dom";
    import FlexBetween from "./FlexBetween";
    import profileImage from "assets/profile.jpg";

    const navItems = [
        {
          text: "Dashboard",
          icon: <HomeOutlined />,
        },
        {
          text: "Client Facing",
          icon: null,
        },
        {
          text: "Products",
          icon: <ShoppingCartOutlined />,
        },
        {
          text: "Users",
          icon: <Groups2Outlined />,
        },
        {
          text: "Transactions",
          icon: <ReceiptLongOutlined />,
        },
       
        {
          text: "Sales",
          icon: null,
        },
        {
          text: "Overview",
          icon: <PointOfSaleOutlined />,
        },
        {
          text: "Daily",
          icon: <TodayOutlined />,
        },
        {
          text: "Monthly",
          icon: <CalendarMonthOutlined />,
        },
        {
          text: "Breakdown",
          icon: <PieChartOutlined />,
        },
        {
          text: "Management",
          icon: null,
        },
        {
          text: "Admin",
          icon: <AdminPanelSettingsOutlined />,
        },
        {
          text: "Performance",
          icon: <TrendingUpOutlined />,
        },
      ];
      
 
const SideBar = ({
    user,
    widthDrawer,
    sideBarOpened,
    setsideBarOpened
}) => {
    const {pathname} = useLocation();
    const [actived , setActived] = useState("")
    const navi = useNavigate();
    const theme = useTheme();

    useEffect(()=>{
        setActived(pathname.substring(1));
    },[pathname])

  return (
  <Box component="nav">
    {sideBarOpened && (
        <Drawer
            open={sideBarOpened}
            onClose={()=>setsideBarOpened(false)}
            variant='persistent'
            anchor='left'
            sx = {{
                width: widthDrawer,
                "& .MuiDrawer-paper":{
                    color:theme.palette.secondary[200],
                    backgroundColor : theme.palette.background.alt,
                    boxSizing : 'border-box',
                    borderWidth : 0,
                    width : widthDrawer
                    
                }
            }}
        >
            <Box width="100%">
                <Box m="1.5rem 1rem 1rem 3rem">{/*top right bot left*/}
                    <FlexBetween color={theme.palette.secondary.main}>
                        <Box display="flex" alignItems="center" gap="0.5rem">
                            <Typography variant="h4" fontWeight="bold">
                                Southern Agro 
                            </Typography>
                        </Box>
                        <IconButton onClick={()=> setsideBarOpened(!sideBarOpened)}>
                            <ChevronLeft/>
                        </IconButton>
                    </FlexBetween>
                </Box> 

              <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "0.5rem 0 0.5rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lowerCaseText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navi(`/${lowerCaseText}`);
                        setActived(lowerCaseText);
                      }}
                      sx={{
                        backgroundColor:
                        actived === lowerCaseText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                        actived === lowerCaseText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                          actived === lowerCaseText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {actived === lowerCaseText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            </Box>

              <Box position="absolute" bottom="2rem">
                <Divider/>
                <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
    ) }

  </Box>
  )
}

export default SideBar