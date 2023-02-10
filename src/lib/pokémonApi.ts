import { useInfiniteQuery, useQuery } from "react-query";
import { IPokémon } from "../types/pokémon";

type fetchPokémonsResponse = {
  results: IPokémon[];
  next: string | null;
};

class PokémonAPI {
  static baseURL = "https://pokeapi.co/api/v2";

  async getPokémons(pageUrl: string) {
    const pokémons = await fetch(
      `${pageUrl || `${PokémonAPI.baseURL}/pokemon`}`
    );

    if (!pokémons.ok) {
      throw new Error("Something went wrong");
    }

    const pokémonsJson = await pokémons.json();

    console.log("getPokémons -> pokémonsJson", pokémonsJson);

    return pokémonsJson as fetchPokémonsResponse;
  }

  async getPokémon(pokémon: string) {
    const pokémonData = await fetch(`${PokémonAPI.baseURL}/pokemon/${pokémon}`);

    if (!pokémonData.ok) {
      throw new Error("Something went wrong");
    }

    const pokémonDataJson = await pokémonData.json();

    console.log("getPokémon -> pokémonDataJson", pokémonDataJson);

    return pokémonDataJson as IPokémon;
  }
}

const pokémonApi = new PokémonAPI();

type usePokémonParams =
  | {
      name: string;
      id?: never;
    }
  | {
      id: number;
      name?: never;
    };

export function usePokémon({ name, id }: usePokémonParams) {
  const query = useQuery<IPokémon>(
    ["pokémon", name ?? id],
    () => pokémonApi.getPokémon((name || id).toString()),
    { enabled: !!name || !!id }
  );

  return {
    pokémon: query.data,
    isLoading: query.isLoading,
  };
}

export function useInfinitePokémons() {
  const query = useInfiniteQuery<fetchPokémonsResponse, Error>(
    "pokémons",
    ({ pageParam }) => pokémonApi.getPokémons(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    }
  );

  return {
    pokémons:
      query.data?.pages.flatMap((page) => {
        console.log("useInfinitePokémons -> page", page);

        return page.results;
      }) ?? [],
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
