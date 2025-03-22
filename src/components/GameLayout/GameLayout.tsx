import React, { ReactElement } from "react";
import { Grid2 } from "@mui/material";

interface GameInterfaceProps {
  game: ReactElement;
  editor: ReactElement;
}

export const GameLayout: React.FC<GameInterfaceProps> = ({ game, editor }) => (
  <Grid2 container spacing={2}>
    <Grid2 size={{ xs: 12, sm: 6 }}>{game}</Grid2>
    <Grid2 size={{ xs: 12, sm: 6 }}>{editor}</Grid2>
  </Grid2>
);
