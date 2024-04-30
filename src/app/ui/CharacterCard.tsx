import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const CharacterCard: React.FC<CharacterObject> = ({
  id,
  name,
  status,
  location,
  image,
}) => {

  return (
    <Card>
      <CardContent>
        <Image
          className="mt-4 rounded-md"
          src={image}
          width={500}
          height={500}
          quality={100}
          alt={`${name}'s avatar`}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white min-h-16">
            {name}
          </h6>

          <div>
            <p className="text-gray-500 dark:text-gray-200">Status:</p>
            <Badge
              className={
                status === "Alive"
                  ? "bg-green-500 hover:bg-green-800"
                  : status === "Dead"
                  ? "bg-red-600 hover:bg-red-800 dark:text-neutral-950"
                  : "bg-gray-400 hover:bg-slate-800 dark:hover:bg-slate-500"
              }
            >
              {status}
            </Badge>
            <p className="text-gray-500 dark:text-gray-200 mt-4">
              Last known location:
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {location.name}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex border-t items-center p-4">
        <Link
          href={{
            pathname: `/character/${encodeURIComponent(id)}`
          }}
        >
          Go to details →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
