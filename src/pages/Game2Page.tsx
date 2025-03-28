import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
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
import debounce from "lodash/debounce";

import MonacoEditor, { EditorProps } from "@monaco-editor/react";
import Phaser from "phaser";

import { createGame, Game2 } from "../games";
import Modal from "@mui/material/Modal";
import { GameLayout } from "@/components";

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

const Game2Page: React.FC = () => {
  const [open, setOpen] = useState(false);
  const editorRef = useRef<Editor | undefined>(undefined);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | undefined>(undefined);
  const defaultValue = [
    "// Доступные действия comment",
    "// 1) move - движение по горизонтали (передавать нужно скорость)",
    "// move(100) - движение вправо",
    "// move(-100) - движение влево",
    "// 2) jump - прыжок (будет выполнен, только если персонаж касается пола)",
    "// jump(100) - подпрыгнет на 100",
    "// 3) wait - просто подождать перед следующим действием",
    "// wait(1000) - подождать 1 секунду (передавать значения нужно в миллисекундах)",
    "",
    "",
    "",
    "",
    "",
  ].join("\n");

  const onMount = useCallback((editor: Editor) => {
    editorRef.current = editor;
  }, []);

  const initGame = useMemo(
    () =>
      debounce(() => {
        const element = gameContainerRef.current;
        const game = gameRef.current;
        if (element && !game) {
          const { width, height } = element.getBoundingClientRect();
          gameRef.current = createGame({
            scene: Game2,
            parent: element,
            width,
            height,
            physics: {
              default: "arcade",
            },
          });
        }
      }, 100),
    [],
  );

  useLayoutEffect(() => {
    setTimeout(() => {
      initGame();
    }, 200);
  }, [initGame]);

  const onReset = useCallback(() => {
    const game = gameRef.current;
    const scene = game?.scene.scenes[0] as Game2 | undefined;
    if (!scene) {
      return;
    }
  }, []);

  const onRun = useCallback(() => {
    const text = editorRef.current?.getValue();
    const game = gameRef.current;
    const scene = game?.scene.scenes[0] as Game2 | undefined;
    if (!text || !scene) {
      return;
    }
    onReset();

    // scene.addAction({ type: ActionEnum.WAIT, ms: 2000 } as WaitAction);
    // const move = (velocity: number) => {
    //   scene.addAction({ type: ActionEnum.MOVE, velocity } as MoveAction);
    // };
    // const jump = (velocity: number) => {
    //   scene.addAction({ type: ActionEnum.JUMP, velocity } as JumpAction);
    // };
    // const wait = (ms: number) => {
    //   scene.addAction({ type: ActionEnum.WAIT, ms } as WaitAction);
    // };

    // TODO: think how to fix that problem
    // if (!move && !jump && !wait) {
    //   console.log(move, jump, wait);
    // }

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
            Первый шаг на пути к программированию завершен!
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Game2Page;
