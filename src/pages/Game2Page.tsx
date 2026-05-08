import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";

import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import Phaser from "phaser";

import Modal from "@mui/material/Modal";
import { GameLayout } from "@/components";
import {
  ActionEnum,
  BaseAction,
  Game2,
  MoveXAction,
  MoveYAction,
} from "@/games/Game2";
import { createGame } from "@/games";

type Editor = Parameters<Required<EditorProps>["onMount"]>[0];

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

const defaultValue = [
  "// Доступные действия:",
  "// 1) moveX(n) — движение по горизонтали на n клеток",
  "//    moveX(1)  — на 1 клетку вправо",
  "//    moveX(-1) — на 1 клетку влево",
  "// 2) moveY(n) — движение по вертикали на n клеток",
  "//    moveY(1)  — на 1 клетку вниз",
  "//    moveY(-1) — на 1 клетку вверх",
  "//",
  "// Команды выполняются по очереди. Соберите все книги!",
  "",
  "",
  "",
].join("\n");

const Game2Page: React.FC = () => {
  const [open, setOpen] = useState(false);
  const editorRef = useRef<Editor | undefined>(undefined);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | undefined>(undefined);

  const onMount = useCallback((editor: Editor) => {
    editorRef.current = editor;
  }, []);

  useLayoutEffect(() => {
    const element = gameContainerRef.current;
    const game = gameRef.current;
    if (element && !game) {
      const { width, height } = element.getBoundingClientRect();
      gameRef.current = createGame({
        scene: Game2,
        parent: element,
        width,
        height,
      });

      setTimeout(() => {
        const scene = gameRef.current?.scene.scenes[0] as Game2 | undefined;
        scene?.onFinish(() => setOpen(true));
      }, 500);
    }
  }, []);

  const onReset = useCallback(() => {
    const scene = gameRef.current?.scene.scenes[0] as Game2 | undefined;
    scene?.reset();
  }, []);

  const onRun = useCallback(() => {
    const text = editorRef.current?.getValue();
    const scene = gameRef.current?.scene.scenes[0] as Game2 | undefined;
    if (!text || !scene) {
      return;
    }
    onReset();

    const moveX = (x: number) => {
      const action: MoveXAction = { type: ActionEnum.MOVE_X, x };
      scene.addAction(action as BaseAction);
    };
    const moveY = (y: number) => {
      const action: MoveYAction = { type: ActionEnum.MOVE_Y, y };
      scene.addAction(action as BaseAction);
    };

    if (!moveX || !moveY) {
      console.log(moveX, moveY);
    }

    eval(text);
  }, [onReset]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <GameLayout
        game={
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Game
              </Typography>
              <Box
                sx={{ height: "500px" }}
                component="div"
                ref={gameContainerRef}
              ></Box>
            </CardContent>
          </Card>
        }
        editor={
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Code
              </Typography>
              <MonacoEditor
                height="500px"
                defaultLanguage="javascript"
                defaultValue={defaultValue}
                onMount={onMount}
                options={{ renderWhitespace: "all", insertSpaces: true }}
              />
            </CardContent>
            <CardActions>
              <Button
                type="button"
                size="small"
                color="warning"
                onClick={onReset}
              >
                Сбросить
              </Button>
              <Button
                type="button"
                size="small"
                color="secondary"
                variant="outlined"
                onClick={onRun}
              >
                Запустить
              </Button>
            </CardActions>
          </Card>
        }
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            <StarIcon /> Вы справились!!! Молодец
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Все книги собраны!
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Game2Page;
