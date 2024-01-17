import React, { useState } from "react";
import "./MainPage.css";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { Pagination } from "./Pagination";

const MainPage = () => {
  const [pokemonList, setPokemonList] = React.useState<pokemonList>();
  const [page, setPage] = useState(1);
  const [error, setError] = React.useState<string>();
  const paginate = (pageNumber: number) => setPage(pageNumber);

  const getPokeMons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
      .then((response) => {
        setPokemonList(response.data);
        console.log(response.data);
      })
      .catch(() => {
        setError("There is an error, please refresh");
      });
  };

  useEffect(() => {
    getPokeMons();
  }, []);

  const idxLast = page * 5;
  const idxFirst = idxLast - 5;
  var paginatedList = pokemonList?.results?.slice(idxFirst, idxLast);

  return (
    <div>
      {error && <span>{error}</span>}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pokemon List
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {pokemonList &&
        paginatedList?.map((item) => {
          return (
            <span
              className="main-page"
              onClick={() => {
                const id = item.url?.split("/")[6];
                window.location.href = "detail/" + id;
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mx: "2px",
                  transform: "scale(0.8)",
                  boxShadow: "5px 5px 5px 5px lightblue",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    Name: {item.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      const id = item.url?.split("/")[6];
                      window.location.href = "detail/" + id;
                    }}
                  >
                    Show Details
                  </Button>
                </CardActions>
              </Card>
            </span>
          );
        })}
      {pokemonList && (
        <Pagination
          postsPerPage={5}
          totalPosts={pokemonList?.results?.length}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default MainPage;

type pokemonList = {
  results: results;
};

type results = { name: string; url: string }[];
