"use client";

import type { NextPage } from "next";
import Leaderboard from "./components/Leaderboard";
import { LeaderboardEntry, RunningScoreEntry, Scores } from "./types";
import Chris from "@/public/assets/chris dickerson.jpg";
import Philo from "@/public/assets/philo.jpg";
import Ricky from "@/public/assets/ricky_w.jpg";
import LiveStandings from "./components/LiveStandings";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Home: NextPage = () => {
  const [showLiveScores, setShowLiveScores] = useState(false);

  const toggleShowLiveScores = () => {
    setShowLiveScores(!showLiveScores);
  };

  const leaderboardData: LeaderboardEntry[] = [
    { position: 1, name: "Ben Riesenbach", points: 44, currentTag: 6 },
    { position: 2, name: "Brandon Hasko", points: 41, currentTag: 2 },
    { position: 3, name: "Andrew Stocklin", points: 31, currentTag: 4 },
    { position: 4, name: "Scott Gay", points: 26, currentTag: 9 },
    { position: 5, name: "Eric Brigandi", points: 22, currentTag: 16 },
    { position: 6, name: "Steve Finger", points: 20, currentTag: 30 },
    { position: 7, name: "James Hunt", points: 19, currentTag: 23 },
    { position: 8, name: "Josh Millich", points: 18, currentTag: 17 },
    { position: 9, name: "Sean Peterson", points: 16, currentTag: 1 },
    { position: 10, name: "Zack Rofrano", points: 15, currentTag: 14 },
    { position: 11, name: "Sivan Jacoby", points: 14, currentTag: 3 },
    { position: 12, name: "Dustin Patterson", points: 14, currentTag: 18 },
    { position: 13, name: "Sean Carpenter", points: 12, currentTag: 5 },
    { position: 14, name: "Scott Sherry", points: 12, currentTag: 10 },
    { position: 15, name: "Sonny Ciocco", points: 11, currentTag: 22 },
    { position: 16, name: "Rich Bostwick", points: 11, currentTag: 12 },
    { position: 17, name: "Brian Struck", points: 10, currentTag: 7 },
    { position: 18, name: "Stu Kaplan", points: 9, currentTag: 8 },
    { position: 19, name: "James Fulmer", points: 9, currentTag: 28 },
    { position: 20, name: "Chris Deck", points: 8, currentTag: 35 },
    { position: 21, name: "Steve Holroyd", points: 8, currentTag: 29 },
    { position: 22, name: "Brandon F", points: 6, currentTag: 11 },
    { position: 23, name: "Irving", points: 5, currentTag: 32 },
    { position: 24, name: "Daniel Kelly", points: 5, currentTag: 27 },
    { position: 25, name: "Rodney Francis", points: 4, currentTag: 13 },
    { position: 26, name: "Matt Esteves", points: 3, currentTag: 31 },
    { position: 27, name: "Alec Carrozza", points: 2, currentTag: 15 },
    { position: 28, name: "Sean Tighe", points: 2, currentTag: 33 },
    { position: 29, name: "Carter Sloan", points: 1, currentTag: 34 },
    { position: 30, name: "Russ Williams", points: 0, currentTag: 19 },
    { position: 31, name: "Tony W", points: 0, currentTag: 20 },
    { position: 32, name: "Ryan B", points: 0, currentTag: 21 },
    { position: 33, name: "Meg Ott", points: 0, currentTag: 24 },
    { position: 34, name: "Kyle Willis", points: 0, currentTag: 25 },
    { position: 35, name: "Dany Odom", points: 0, currentTag: 26 },
  ];

  const runningScoresData: RunningScoreEntry[] = [
    {
      roundDate: "2024-03-30",
      name: "Sean Peterson",
      place: 1,
      tagIn: null,
      tagOut: 1,
      pointsScored: 16,
    },
    {
      roundDate: "2024-03-30",
      name: "Ben Riesenbach",
      place: 2,
      tagIn: null,
      tagOut: 2,
      pointsScored: 15,
    },
    {
      roundDate: "2024-03-30",
      name: "Sivan Jacoby",
      place: 3,
      tagIn: null,
      tagOut: 3,
      pointsScored: 14,
    },
    {
      roundDate: "2024-03-30",
      name: "Scott Gay",
      place: 4,
      tagIn: null,
      tagOut: 4,
      pointsScored: 13,
    },
    {
      roundDate: "2024-03-30",
      name: "Sean Carpenter",
      place: 5,
      tagIn: null,
      tagOut: 5,
      pointsScored: 12,
    },
    {
      roundDate: "2024-03-30",
      name: "Brandon Hasko",
      place: 6,
      tagIn: null,
      tagOut: 6,
      pointsScored: 11,
    },
    {
      roundDate: "2024-03-30",
      name: "Brian Struck",
      place: 7,
      tagIn: null,
      tagOut: 7,
      pointsScored: 10,
    },
    {
      roundDate: "2024-03-30",
      name: "Stu Kaplan",
      place: 8,
      tagIn: null,
      tagOut: 8,
      pointsScored: 9,
    },
    {
      roundDate: "2024-03-30",
      name: "Chris Deck",
      place: 9,
      tagIn: null,
      tagOut: 9,
      pointsScored: 8,
    },
    {
      roundDate: "2024-03-30",
      name: "James Hunt",
      place: 10,
      tagIn: null,
      tagOut: 10,
      pointsScored: 7,
    },
    {
      roundDate: "2024-03-30",
      name: "Brandon F",
      place: 11,
      tagIn: null,
      tagOut: 11,
      pointsScored: 6,
    },
    {
      roundDate: "2024-03-30",
      name: "Zack Rofrano",
      place: 12,
      tagIn: null,
      tagOut: 12,
      pointsScored: 5,
    },
    {
      roundDate: "2024-03-30",
      name: "Rodney Francis",
      place: 13,
      tagIn: null,
      tagOut: 13,
      pointsScored: 4,
    },
    {
      roundDate: "2024-03-30",
      name: "Steve Finger",
      place: 14,
      tagIn: null,
      tagOut: 14,
      pointsScored: 3,
    },
    {
      roundDate: "2024-03-30",
      name: "Alec Carrozza",
      place: 15,
      tagIn: null,
      tagOut: 15,
      pointsScored: 2,
    },
    {
      roundDate: "2024-03-30",
      name: "Eric Brigandi",
      place: 16,
      tagIn: null,
      tagOut: 16,
      pointsScored: 1,
    },
    {
      roundDate: "2024-03-30",
      name: "Matt Esteves",
      place: 17,
      tagIn: null,
      tagOut: 17,
      pointsScored: 0,
    },
    {
      roundDate: "2024-03-30",
      name: "Russ Williams",
      place: 18,
      tagIn: null,
      tagOut: 19,
      pointsScored: 0,
    },
    {
      roundDate: "2024-03-30",
      name: "Tony W",
      place: 19,
      tagIn: null,
      tagOut: 20,
      pointsScored: 0,
    },
    {
      roundDate: "2024-03-30",
      name: "Ryan B",
      place: 20,
      tagIn: null,
      tagOut: 21,
      pointsScored: 0,
    },
    {
      roundDate: "2024-03-30",
      name: "Sonny Ciocco",
      place: 21,
      tagIn: null,
      tagOut: 22,
      pointsScored: 0,
    },
    {
      roundDate: "2024-03-30",
      name: "Sean Tighe",
      place: 22,
      tagIn: null,
      tagOut: 23,
      pointsScored: 0,
    },
    {
      roundDate: "2024-03-30",
      name: "Meg Ott",
      place: 23,
      tagIn: null,
      tagOut: 24,
      pointsScored: 0,
    },
    {
      roundDate: "2024-03-30",
      name: "Kyle Willis",
      place: 24,
      tagIn: null,
      tagOut: 25,
      pointsScored: 0,
    },
    {
      roundDate: "2024-03-30",
      name: "Dany Odom",
      place: 25,
      tagIn: null,
      tagOut: 26,
      pointsScored: 0,
    },
    {
      roundDate: "2024-04-04",
      name: "Andrew Stocklin",
      place: 1,
      tagIn: null,
      tagOut: 2,
      pointsScored: 16,
    },
    {
      roundDate: "2024-04-04",
      name: "Ben Riesenbach",
      place: 2,
      tagIn: "2",
      tagOut: 6,
      pointsScored: 15,
    },
    {
      roundDate: "2024-04-04",
      name: "Brandon Hasko",
      place: 3,
      tagIn: "6",
      tagOut: 10,
      pointsScored: 14,
    },
    {
      roundDate: "2024-04-04",
      name: "Steve Finger",
      place: 4,
      tagIn: "14",
      tagOut: 14,
      pointsScored: 13,
    },
    {
      roundDate: "2024-04-04",
      name: "Eric Brigandi",
      place: 5,
      tagIn: "16",
      tagOut: 16,
      pointsScored: 12,
    },
    {
      roundDate: "2024-04-04",
      name: "Sonny Ciocco",
      place: 6,
      tagIn: "22",
      tagOut: 22,
      pointsScored: 11,
    },
    {
      roundDate: "2024-04-04",
      name: "Josh Millich",
      place: 7,
      tagIn: null,
      tagOut: 27,
      pointsScored: 10,
    },
    {
      roundDate: "2024-04-04",
      name: "James Fulmer",
      place: 8,
      tagIn: null,
      tagOut: 28,
      pointsScored: 9,
    },
    {
      roundDate: "2024-04-04",
      name: "Steve Holroyd",
      place: 9,
      tagIn: null,
      tagOut: 29,
      pointsScored: 8,
    },
    {
      roundDate: "2024-04-04",
      name: "Dustin Patterson",
      place: 10,
      tagIn: null,
      tagOut: 30,
      pointsScored: 7,
    },
    {
      roundDate: "2024-04-04",
      name: "James Hunt",
      place: 11,
      tagIn: "10",
      tagOut: 31,
      pointsScored: 6,
    },
    {
      roundDate: "2024-04-04",
      name: "Irving",
      place: 12,
      tagIn: null,
      tagOut: 32,
      pointsScored: 5,
    },
    {
      roundDate: "2024-04-18",
      name: "Brandon Hasko",
      place: 1,
      tagIn: "10",
      tagOut: 2,
      pointsScored: 16,
    },
    {
      roundDate: "2024-04-18",
      name: "Andrew Stocklin",
      place: 2,
      tagIn: "2",
      tagOut: 4,
      pointsScored: 15,
    },
    {
      roundDate: "2024-04-18",
      name: "Ben Riesenbach",
      place: 3,
      tagIn: "6",
      tagOut: 6,
      pointsScored: 14,
    },
    {
      roundDate: "2024-04-18",
      name: "Scott Gay",
      place: 4,
      tagIn: "4",
      tagOut: 9,
      pointsScored: 13,
    },
    {
      roundDate: "2024-04-18",
      name: "Scott Sherry",
      place: 5,
      tagIn: "33",
      tagOut: 10,
      pointsScored: 12,
    },
    {
      roundDate: "2024-04-18",
      name: "Rich Bostwick",
      place: 6,
      tagIn: "35",
      tagOut: 12,
      pointsScored: 11,
    },
    {
      roundDate: "2024-04-18",
      name: "Zack Rofrano",
      place: 7,
      tagIn: "12",
      tagOut: 14,
      pointsScored: 10,
    },
    {
      roundDate: "2024-04-18",
      name: "Eric Brigandi",
      place: 8,
      tagIn: "16",
      tagOut: 16,
      pointsScored: 9,
    },
    {
      roundDate: "2024-04-18",
      name: "Josh Millich",
      place: 9,
      tagIn: "27",
      tagOut: 17,
      pointsScored: 8,
    },
    {
      roundDate: "2024-04-18",
      name: "Dustin Patterson",
      place: 10,
      tagIn: "30",
      tagOut: 18,
      pointsScored: 7,
    },
    {
      roundDate: "2024-04-18",
      name: "James Hunt",
      place: 11,
      tagIn: "31",
      tagOut: 23,
      pointsScored: 6,
    },
    {
      roundDate: "2024-04-18",
      name: "Daniel Kelly",
      place: 12,
      tagIn: "18",
      tagOut: 27,
      pointsScored: 5,
    },
    {
      roundDate: "2024-04-18",
      name: "Steve Finger",
      place: 13,
      tagIn: "14",
      tagOut: 30,
      pointsScored: 4,
    },
    {
      roundDate: "2024-04-18",
      name: "Matt Esteves",
      place: 14,
      tagIn: "17",
      tagOut: 31,
      pointsScored: 3,
    },
    {
      roundDate: "2024-04-18",
      name: "Sean Tighe",
      place: 15,
      tagIn: "23",
      tagOut: 33,
      pointsScored: 2,
    },
    {
      roundDate: "2024-04-18",
      name: "Carter Sloan",
      place: 16,
      tagIn: "34",
      tagOut: 34,
      pointsScored: 1,
    },
    {
      roundDate: "2024-04-18",
      name: "Chris Deck",
      place: 17,
      tagIn: "9",
      tagOut: 35,
      pointsScored: 0,
    },
  ];

  return (
    <div className="container mx-auto p-4 gap-4">
      <div className="mt-4 mb-4">
        <Button onClick={toggleShowLiveScores}>
          {showLiveScores ? "Show Leaderboard" : "Show Live Scores"}
        </Button>
      </div>

      {!showLiveScores && (
        <Leaderboard
          leaderboardEntries={leaderboardData}
          runningScoresData={runningScoresData}
        />
      )}
      {showLiveScores && <LiveStandings />}
    </div>
  );
};

export default Home;
