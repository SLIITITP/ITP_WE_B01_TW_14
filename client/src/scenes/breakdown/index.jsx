import React from "react";
import { Box ,Button,useTheme } from "@mui/material";
import Header from "components/Header.jsx";
import BreakdownChart from "components/BreakdownChart";
import { useRef} from "react"
import { toPng } from 'html-to-image'
import download from 'downloadjs'
import {DownloadOutlined} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
const Breakdown = () => {
  const chart = useRef(null)
  const theme = useTheme();
  const handleExportSVG =async () => {
      if (!chart.current) {
        return
      }
      const dataUrl = await toPng(chart.current)
      download(dataUrl, 'chart.png')
    }
  
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
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
            Download Breakdown Chart
        </Button>
        </FlexBetween>
        <div style={{ height: '100%', width: '100%' }} ref={chart}>
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
      </div>
    </Box>
  );
};

export default Breakdown;