import {
  Card,
  Group,
  Image,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { usePokémon } from "../lib/pokémonApi";
import PokémonDetailsModal from "./PokémonDetailsModal";

type Props = {
  name: string;
};

function PokémonCard({ name }: Props) {
  const theme = useMantineTheme();

  const { pokémon, isLoading } = usePokémon({ name });

  return (
    <div>
      <Card
        shadow="xs"
        p="md"
        sx={{
          transition: "transform ease-in-out 100ms",
          "&:hover": {
            transform: "scale(1.07)",
          },
        }}
      >
        {isLoading ? (
          <Skeleton height="300px" />
        ) : (
          <>
            <Card.Section>
              <Image
                src={pokémon.sprites.other.home.front_default}
                height={200}
                fit="contain"
                alt={pokémon.name}
              />
            </Card.Section>

            <Group
              position="apart"
              style={{
                marginBottom: 5,
                marginTop: theme.spacing.sm,
              }}
            >
              <Text weight={500} transform="capitalize">
                {pokémon.name}
              </Text>
            </Group>

            <PokémonDetailsModal pokémon={pokémon} />
          </>
        )}
      </Card>
    </div>
  );
}

export default PokémonCard;
