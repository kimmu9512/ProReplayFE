import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
type SummonerCardProps = {
  summoner: {
    name: string;
    profileIconId: number;
    summonerLevel: number;
    id: string;
    region: string;
  };
};

enum Region {
  BR1 = "br",
  EUN1 = "eun",
  EUW1 = "euw",
  JP1 = "jp",
  KR = "kr",
  LA1 = "la",
  LA2 = "la",
  NA1 = "na",
  OC1 = "oce",
  TR1 = "tr",
  RU = "ru",
}

const getRegion = (region: string): Region => {
  return Region[region as keyof typeof Region] || Region.NA1;
};

const SummonerCard: React.FC<SummonerCardProps> = ({ summoner }) => {
  const router = useRouter();

  const handleSubscribe = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!auth.currentUser) {
      router.push("/login");
      return;
    }

    const token = await auth.currentUser.getIdToken();

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ summonerId: summoner.id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Subscribed!");
      } else {
        console.error("Failed to subscribe: ", await response.text());
        alert("Failed to subscribe");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to subscribe");
    }
  };

  const redirectToOpGG = () => {
    const opRegion = getRegion(summoner.region);
    router.push(`https://op.gg/summoners/${opRegion}/${summoner.name}`);
  };

  return (
    <div
      onClick={redirectToOpGG}
      className="flex flex-col items-center justify-center w-64 h-64 p-4 m-4 text-center bg-gray-800 rounded-xl"
    >
      <Image
        src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${summoner.profileIconId}.png`}
        alt="Profile Icon"
        width={128}
        height={128}
        className="rounded-full"
      />
      <h1 className="text-2xl font-bold">{summoner.name}</h1>
      <h1 className="text-xl font-bold">{summoner.summonerLevel}</h1>
      <button
        onClick={handleSubscribe}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Subscribe
      </button>
    </div>
  );
};

export default SummonerCard;
