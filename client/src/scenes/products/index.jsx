import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  CardMedia 
} from "@mui/material"; 

import { useGetProductsQuery } from "state/api";
import Header from "components/Header.jsx";

const Product = ({
  _id,
  name,
  description,
  price,
  imageUrl,
  supply,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        {/* <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography> */}
        <Typography variant="h5" component="div" height="45px">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <CardMedia
          component="img"
           height="194"
           image={imageUrl}
            alt="image"
      />
        {/* <Rating value={rating} readOnly /> */}

        <Typography variant="body2" mt="7px"height="20px">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supplier: {supply}</Typography>
          {/* <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography> */}
          {/* <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {

    const { data, isLoading } = useGetProductsQuery();
   
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn:  undefined },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              sellingprice,
              imageUrl,
              category,
              supplier,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={sellingprice}
                imageUrl = {imageUrl}
                category={category}
                supply={supplier}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  )
}

export default Products