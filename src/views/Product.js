import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Product = (data) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "https://dummyjson.com/products";
      try {
        setLoading(true);
        const response = await axios.get(url);
        setItems(response.data.products);
        setLoading(false);
        console.log("data", response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345, marginTop: "20px", marginLeft: "20px" }}>
                <CardMedia
                  component="img"
                  alt="image"
                  height="250"
                  image={item.thumbnail}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.category} - ${item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.rating}-rating
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.discountPercentage}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleOpen(item)}>View Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedItem && (
            <div>
                 <CardMedia
                  component="img"
                  alt="image"
                  height="250"
                  image={selectedItem.images}
                />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedItem.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedItem.description}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Category: {selectedItem.category}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Brand: {selectedItem.brand}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Rating: {selectedItem.rating}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Price: {selectedItem.price}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Discount: {selectedItem.discountPercentage}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Stock: {selectedItem.stock}
              </Typography>

            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Product;
