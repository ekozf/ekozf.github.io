import { BACKEND_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", async () => {
    const leaderboard = document.getElementById("leaderboard");

    const data = await GetLeaderboard();

    for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        const item = CreateLeaderboardItem(entry, i);
        leaderboard.appendChild(item);
    }
});

function CreateLeaderboardItem(entry, index) {
    const item = document.createElement("li");
    item.classList.add("d-flex");

    const rank = document.createElement("span");
    rank.classList.add("rank");
    rank.innerText = "#" + (index + 1);

    const name = document.createElement("span");
    name.classList.add("name");
    name.innerText = entry.username;

    const wins = document.createElement("span");
    wins.classList.add("wins");
    wins.innerText = "Wins: " + entry.wins;

    const winRate = document.createElement("span");
    winRate.classList.add("win-rate");
    winRate.innerText = "Win Rate: " + Math.floor(entry.wins / (entry.wins + entry.losses) * 100) + "%";

    const winWrapper = document.createElement("div");
    winWrapper.classList.add("win-wrapper");

    winWrapper.appendChild(wins);
    winWrapper.appendChild(winRate);

    item.appendChild(rank);
    item.appendChild(name);
    item.appendChild(winWrapper);

    return item;
}

async function GetLeaderboard() {
    const url = BACKEND_URL + "Leaderboard/all";

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        console.error(response);
        return;
    }

    const data = await response.json();

    return data;
}
