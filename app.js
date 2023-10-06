const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

// Sample in-memory storage
const listings = [];

// Create a new listing
app.post('/listings', (req, res) => {
  const listing = req.body;
  listings.push(listing);
  res.status(201).json(listing);
});

// Get all listings
app.get('/listings', (req, res) => {
  res.json(listings);
});

// Get a specific listing by ID
app.get('/listings/:id', (req, res) => {
  const id = req.params.id;
  const listing = listings.find(item => item.id === id);
  if (!listing) {
    res.status(404).json({ error: 'Listing not found' });
  } else {
    res.json(listing);
  }
});

// Update a listing by ID
app.put('/listings/:id', (req, res) => {
  const id = req.params.id;
  const updatedListing = req.body;
  const index = listings.findIndex(item => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Listing not found' });
  } else {
    listings[index] = updatedListing;
    res.json(updatedListing);
  }
});

// Delete a listing by ID
app.delete('/listings/:id', (req, res) => {
  const id = req.params.id;
  const index = listings.findIndex(item => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Listing not found' });
  } else {
    listings.splice(index, 1);
    res.status(204).send();
  }
});


app.get("/", (request, response) => {
   response.send("Hello World");
});