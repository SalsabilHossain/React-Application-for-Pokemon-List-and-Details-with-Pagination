import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

const DetailsPage = (): JSX.Element => {
  const [pokeDetails, setPokemonDetails] = React.useState<abilities>();
  const [error, setError] = React.useState<string>();
  const { id } = useParams();

  const getPokemonDetails = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + id)
      .then((response) => {
        setPokemonDetails(response.data);
      })
      .catch(() => {
        setError("There is an error, please refresh");
      });
  };

  useEffect(() => {
    getPokemonDetails();
  },);

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
              Abilities:
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Button
          variant="contained"
          onClick={() => (window.location.href = "/")}
        >
          Go Back
        </Button>
        <Typography>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: "2px",
              transform: "scale(0.8)",
              boxShadow: "5px 5px 10px 10px lightblue",
            }}
          >
            <CardContent>
              <h2>Name: {pokeDetails?.name}</h2>
              <Typography
                variant="h6"
                component="div"
                sx={{ display: "flex", flexGrow: 1, mx: "2px" }}
              >
                List of Abilities:
              </Typography>

              {pokeDetails?.abilities.map((item, i) => {
                return (
                  <ol>
                    {i + 1}. {item.ability.name}
                  </ol>
                );
              })}
            </CardContent>
          </Card>
        </Typography>
      </Box>
    </div>
  );
};

export default DetailsPage;

type abilities = {
  name: string;
  abilities: { ability: { name: string } }[];
};
