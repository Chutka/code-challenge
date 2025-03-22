import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import game1 from "@/assets/game_1.png";
import { Link } from "react-router";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Main: React.FC = () => {
  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: "56.25%",
                }}
                image={game1}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Game 1
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  <Link to="challenge">Запустить</Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
