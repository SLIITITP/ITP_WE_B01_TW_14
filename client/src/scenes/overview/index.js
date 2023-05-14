import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select,Button ,useTheme} from "@mui/material";
import Header from "components/Header.jsx";
import OverviewChart from "components/OverviewChart";
import {DownloadOutlined} from "@mui/icons-material";
import { useRef} from "react"
import { toPng } from 'html-to-image'
import download from 'downloadjs'

const Overview = () => {
  const [view, setView] = useState("units");
  const theme = useTheme();
  const chart = useRef(null)

  const handleExportSVG =async () => {
      if (!chart.current) {
        return
      }
      const dataUrl = await toPng(chart.current)
      download(dataUrl, 'chart.png')
    }
  
  return (
    <Box m="1.5rem 2.5rem">
      <Button
            onClick={handleExportSVG}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginBottom: "20px"
              
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Overview Chart
          </Button>
       <div style={{ height: '100%', width: '100%' }} ref={chart}>
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />
      
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
       
        <OverviewChart view={view} />
        
      </Box>
      </div>
    </Box>
  );
};

export default Overview; 