import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Modal,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useReducer, useState } from "react";
import { constructSpriteKeyFromSpriteState } from "../lib/utils";
import { IPokémon } from "../types/pokémon";

type Props = {
  pokémon: IPokémon;
};

export enum PokéGender {
  Male = "default",
  Female = "female",
}

enum PokéFace {
  Front = "front",
  Back = "back",
}

export type SpriteState = {
  gender: PokéGender;
  face: PokéFace;
  shiny: boolean;
};

type SpriteReducerAction =
  | { type: "setGender"; payload: PokéGender }
  | { type: "setFace"; payload: PokéFace }
  | { type: "setShiny"; payload: boolean };

function spriteStateReducer(
  state: SpriteState,
  action: SpriteReducerAction
): SpriteState {
  switch (action.type) {
    case "setGender":
      return {
        ...state,
        gender: action.payload,
      };
    case "setFace":
      return {
        ...state,
        face: action.payload,
      };
    case "setShiny":
      return {
        ...state,
        shiny: action.payload,
      };
    default:
      return state;
  }
}

const defaultSpriteState: SpriteState = {
  face: PokéFace.Front,
  gender: PokéGender.Male,
  shiny: false,
};

function PokémonDetailsModal({ pokémon }: Props) {
  const [opened, setOpened] = useState(false);
  const [spriteState, dispatch] = useReducer(
    spriteStateReducer,
    defaultSpriteState
  );

  const toggleFace = () => {
    dispatch({
      type: "setFace",
      payload:
        spriteState.face === PokéFace.Front ? PokéFace.Back : PokéFace.Front,
    });
  };

  const toggleGender = () => {
    dispatch({
      type: "setGender",
      payload:
        spriteState.gender === PokéGender.Male
          ? PokéGender.Female
          : PokéGender.Male,
    });
  };

  const toggleShiny = () => {
    dispatch({
      type: "setShiny",
      payload: !spriteState.shiny,
    });
  };

  const sprite = constructSpriteKeyFromSpriteState(spriteState);

  useEffect(() => {
    console.log("sprites", pokémon.sprites);
    console.log("sprite", sprite);
  }, [pokémon.sprites, sprite]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title order={3}>{pokémon.name.toUpperCase()}</Title>}
      >
        <Box>
          <Card withBorder>
            <Stack>
              {pokémon.sprites[sprite] ? (
                <Image
                  src={pokémon.sprites[sprite]}
                  height={200}
                  fit="contain"
                  alt={pokémon.name}
                />
              ) : (
                <Text
                  sx={{
                    textAlign: "center",
                    height: 200,
                    lineHeight: "200px",
                    userSelect: "none",
                  }}
                >
                  Sprite not found
                </Text>
              )}

              <Flex
                sx={{
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActionIcon
                  color="red"
                  variant="filled"
                  onClick={toggleFace}
                  title="Toggle face"
                >
                  {spriteState.face === PokéFace.Front ? "👈" : "👉"}
                </ActionIcon>

                <ActionIcon
                  color="red"
                  variant="filled"
                  onClick={toggleGender}
                  title="Toggle gender"
                >
                  {spriteState.gender === PokéGender.Male ? "♂️" : "♀️"}
                </ActionIcon>

                <ActionIcon
                  color="red"
                  variant="filled"
                  onClick={toggleShiny}
                  title="Toggle shiny"
                >
                  {spriteState.shiny ? "✨" : "😐"}
                </ActionIcon>
              </Flex>
            </Stack>
          </Card>

          <Text weight="bold">Stats</Text>

          <Stack>
            {pokémon.stats.map((stat, i) => (
              <Progress
                key={`stat__${i}`}
                radius="xs"
                size="xl"
                value={stat.base_stat}
                label={`${stat.stat.name} - ${stat.base_stat}`}
              />
            ))}
          </Stack>
        </Box>
      </Modal>

      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          fullWidth
          variant="light"
          color="violet"
        >
          Details
        </Button>
      </Group>
    </>
  );
}

export default PokémonDetailsModal;
