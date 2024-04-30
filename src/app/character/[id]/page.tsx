"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { toast } from "@/components/ui/use-toast";

async function getCharacter(id: number) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

  const data = await res.json();
  return data;
}

export default function CharacterPage({ params }: { params: { id: number } }) {
  const [character, setCharacter] = useState<CharacterObject>();
  const { setTheme } = useTheme();
  const router = useRouter();

  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacter(params.id);
      setCharacter(data);
    };

    fetchData();
  }, [params.id]);

  function submitLocation() {
    if (!location || !character) {
      return;
    }

    let locationsArray = localStorage.getItem("locations");
    let temp: { [key: string]: CharacterObject[] } = {};

    if (locationsArray !== null) {
      temp = JSON.parse(locationsArray);
    }

    for (const key in temp) {
      temp[key] = temp[key].filter((char) => char.id !== character.id);
      if (temp[key].length === 0) {
        delete temp[key];
      }
    }

    if (!Array.isArray(temp[location])) {
      temp[location] = [];
    }

    temp[location].push(character);

    localStorage.setItem("locations", JSON.stringify(temp));

    toast({
      title: "Character added to location",
      description: `${character.name} is added to ${location}`,
    })
  }

  return (
    <>
      <div className="flex justify-between content-center mx-16 mt-8 items-center">
        <Button variant="outline" size="icon" onClick={router.back}>
          <ChevronLeftIcon className="h-4 w-4" />
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
      <div className="w-auto h-auto m-8">
        <Card>
          <CardContent className="flex mt-6">
            <Image
              src={character?.image as string}
              width={500}
              height={500}
              className="rounded-md max-h-64 max-w-64"
              quality={100}
              objectFit="contain"
              alt={`${character?.name}'s avatar`}
            />
            <div className="ms-16">
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-semibold">{character?.name}</h2>
                <p className="text-gray-500 dark:text-gray-200  mt-4 mb-1">
                  Status
                </p>
                <Badge
                  className={
                    character?.status === "Alive"
                      ? "bg-green-500 hover:bg-green-800"
                      : character?.status === "Dead"
                      ? "bg-red-600 hover:bg-red-800 dark:text-neutral-950"
                      : "bg-gray-400 hover:bg-slate-800 dark:hover:bg-slate-500"
                  }
                >
                  {character?.status}
                </Badge>

                <p className="text-gray-500 dark:text-gray-200 mt-4">Gender</p>
                <p className="font-semibold">{character?.gender}</p>

                <p className="text-gray-500 dark:text-gray-200 mt-4">
                  First seen in
                </p>
                <p className="font-semibold">{character?.origin.name}</p>

                <p className="text-gray-500 dark:text-gray-200 mt-4">
                  Last known location
                </p>
                <p className="font-semibold">{character?.location.name}</p>

                <p className="text-gray-500 dark:text-gray-200 mt-4">
                  List of appearence
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {character?.episode.map((ep: string) => (
                    <Badge
                      className="bg-neutral-900 dark:bg-neutral-300"
                      key={ep.split("/").pop()}
                    >
                      Ep. {ep.split("/").pop()}
                    </Badge>
                  ))}
                </div>

                <div className="grid w-full max-w-sm gap-3 mt-6">
                  <Label htmlFor="location">Assign Location</Label>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      type="text"
                      id="inputLocation"
                      value={location}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setLocation(e.target.value)
                      }
                      placeholder={character?.location.name}
                    />

                    <Button onClick={submitLocation} disabled={!location}>
                      Assign Location
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
