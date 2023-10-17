import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../lib/firebase/firebase";
import { subscribeToSummoner } from "@/lib/backEndService";
type SummonerCardProps = {
  summoner: {
    summonerName: string;
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
  const handleSubscribe = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    subscribeToSummoner({
      summonerName: summoner.summonerName,
      region: summoner.region,
    });
  };

  const redirectToOpGG = () => {
    const opRegion = getRegion(summoner.region);
    window.location.href = `https://op.gg/summoners/${opRegion}/${summoner.summonerName}`;
  };

  return (
    <div
      onClick={redirectToOpGG}
      className="flex flex-col items-center justify-center min-h-64 w-64 p-4 m-4 text-center bg-gray-800 rounded-xl space-y-2" // changed h-64 to min-h-64 and adjusted space-y value
    >
      <h1 className="text-xs mb-2">Click for op.gg link</h1>
      <h2 className="text-s font-bold mb-2">Region: {summoner.region}</h2>
      <Image
        src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${summoner.profileIconId}.png`}
        alt="Profile Icon"
        width={100} // Reduced the image width
        height={100} // Reduced the image height
        className="rounded-full"
      />
      <h1 className="text-2xl font-bold mb-2">{summoner.summonerName}</h1>
      <h1 className="text-xl font-bold mb-2">Lvl. {summoner.summonerLevel}</h1>
      <button
        onClick={handleSubscribe}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Subscribe
      </button>
    </div>
  );
};

export default SummonerCard;
