"use client";

import { useEffect, useState } from "react";
import CharacterCard from "./ui/CharacterCard";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

async function getPagedCharacter(page: number) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );

  const data = await res.json();
  return data.results;
}

export default function Home() {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<CharacterObject[]>([]);
  const { setTheme } = useTheme();

  useEffect(() => {
    (async () => {
      setCharacters(await getPagedCharacter(1));
    })();
  }, []);

  const loadMoreCharacters = async () => {
    const newCharacters = await getPagedCharacter(page + 1);
    setCharacters((prevCharacters: CharacterObject[]) => [
      ...prevCharacters,
      ...newCharacters,
    ]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main>
      <div className="flex justify-between content-center mx-16 mt-4 h-16 items-center">
        <h1 className="font-bold text-sm md:text-md lg:text-lg">Rick and Morty Characters</h1>
        <div className="flex content-center gap-8">
          <Button variant="link" asChild>
            <Link
              href={{
                pathname: `/location`,
              }}
            >
              Location
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-stretch gap-4 m-4">
          {characters.map((character: CharacterObject) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              status={character.status}
              species={character.species}
              type={character.type}
              gender={character.gender}
              origin={character.origin}
              location={character.location}
              image={character.image}
              episode={character.episode}
              url={character.url}
              created={character.created}
            />
          ))}
        </div>

        <Button className="w-full h-16" onClick={loadMoreCharacters}>
          Load more
        </Button>
      </div>
    </main>
  );
}
