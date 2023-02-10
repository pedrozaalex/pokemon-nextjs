import {
  Alert,
  Box,
  Grid,
  SimpleGrid,
  Skeleton,
  Switch,
  useMantineColorScheme,
} from "@mantine/core";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery, useQuery } from "react-query";
import PokémonCard from "../components/PokémonCard";
import { useInfinitePokémons } from "../lib/pokémonApi";
import { IPokémon } from "../types/pokémon";

function Home() {
  const { pokémons, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfinitePokémons();

  if (isLoading)
    return Array(16)
      .fill(0)
      .map((_, i) => (
        <Skeleton height="50px" mb="10px" key={`skeleton__${i}`} />
      ));

  if (isError)
    return (
      <Alert title="Error!" color="red">
        {(error as any).message}
      </Alert>
    );

  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage as any} hasMore={hasNextPage}>
        <SimpleGrid
          cols={5}
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
          spacing="lg"
          my="xl"
        >
          {pokémons.map((poke) => {
            return <PokémonCard key={poke.id} name={poke.name} />;
          })}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
}

export default Home;
