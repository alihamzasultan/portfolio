"use client";

import { useEffect, useState } from "react";
import Squares from "./reactbits/Squares";
import Antigravity from "./reactbits/Antigravity";

export default function MobileMockup() {
  const [time, setTime] = useState("");
  const [showGame, setShowGame] = useState(false);
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [gameActive, setGameActive] = useState(true);
  const [gameStatus, setGameStatus] = useState("Your turn (X)");

  // Real-time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Tic-Tac-Toe logic
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],             // diagonals
  ];

  const handleCellClick = (index: number) => {
    if (board[index] !== "" || !gameActive || currentPlayer === "O") return;

    // Player X move
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    if (checkWin(newBoard, "X")) {
      setGameStatus("Player X wins!");
      setGameActive(false);
      return;
    }

    if (newBoard.every((cell) => cell !== "")) {
      setGameStatus("Game ended in a draw!");
      setGameActive(false);
      return;
    }

    // Switch to computer
    setCurrentPlayer("O");
    setGameStatus("Computer is thinking...");
  };

  // Computer move
  useEffect(() => {
    if (currentPlayer !== "O" || !gameActive) return;

    const timer = setTimeout(() => {
      const availableCells: number[] = [];
      board.forEach((cell, idx) => {
        if (cell === "") availableCells.push(idx);
      });

      if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cellIndex = availableCells[randomIndex];
        
        const newBoard = [...board];
        newBoard[cellIndex] = "O";
        setBoard(newBoard);

        if (checkWin(newBoard, "O")) {
          setGameStatus("Computer wins!");
          setGameActive(false);
          setCurrentPlayer("X");
          return;
        }

        if (newBoard.every((cell) => cell !== "")) {
          setGameStatus("Game ended in a draw!");
          setGameActive(false);
          setCurrentPlayer("X");
          return;
        }

        setCurrentPlayer("X");
        setGameStatus("Your turn (X)");
      }
    }, 600); // 600ms computer thinking delay

    return () => clearTimeout(timer);
  }, [currentPlayer, board, gameActive]);

  const checkWin = (currentBoard: string[], player: string) => {
    return winningConditions.some((condition) => {
      return condition.every((idx) => currentBoard[idx] === player);
    });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setGameActive(true);
    setGameStatus("Your turn (X)");
  };

  const handleAppIconClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    if (id === "tic-tac-toe") {
      e.preventDefault();
      setShowGame(true);
      resetGame();
      return;
    }

    // Scroll support for local sections
    if (id.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(id.substring(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const appIcons = [
    {
      id: "#about",
      label: "About",
      icon: "lar la-user",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
    },
    {
      id: "#skills",
      label: "Skills",
      icon: "las la-shapes",
      gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    },
    {
      id: "#portfolio",
      label: "Projects",
      icon: "las la-project-diagram",
      gradient: "linear-gradient(135deg, #ec4899, #db2777)",
    },
    {
      id: "github",
      label: "GitHub",
      icon: "lab la-github",
      gradient: "linear-gradient(135deg, #333333, #000000)",
      href: "https://github.com/alihamzasultan",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: "lab la-linkedin",
      gradient: "linear-gradient(135deg, #0A66C2, #004182)",
      href: "https://www.linkedin.com/in/ali-hamza-sultan-1ba7ba267/",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: "lab la-whatsapp",
      gradient: "linear-gradient(135deg, #25D366, #128C7E)",
      href: "https://wa.me/+923339362758",
    },
    {
      id: "telegram",
      label: "Telegram",
      icon: "lab la-telegram",
      gradient: "linear-gradient(135deg, #0088cc, #006699)",
      href: "https://telegram.org",
    },
    {
      id: "medium",
      label: "Medium",
      icon: "lab la-medium",
      gradient: "linear-gradient(135deg, #00ab6c, #008248)",
      href: "https://medium.com",
    },
    {
      id: "youtube",
      label: "YouTube",
      icon: "lab la-youtube",
      gradient: "linear-gradient(135deg, #FF0000, #cc0000)",
      href: "https://youtube.com",
    },
    {
      id: "tic-tac-toe",
      label: "Tic Tac Toe",
      icon: "las la-gamepad",
      gradient: "linear-gradient(135deg, #f97316, #ea580c)",
    },
  ];

  return (
    <div className="w-[300px] h-[580px] sm:w-[340px] sm:h-[660px] xl:w-[360px] xl:h-[720px] border-[10px] border-neutral-800 rounded-[45px] bg-black shadow-2xl p-2.5 relative overflow-hidden flex flex-col">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-neutral-800 rounded-b-2xl z-30 flex items-center justify-center">
        <div className="w-12 h-1 bg-neutral-900 rounded-full" />
      </div>

      {/* Screen Container */}
      <div className="relative w-full h-full rounded-[36px] overflow-hidden flex flex-col bg-[#070710]">
        
        {/* Background Animation */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <Antigravity
            count={150}
            magnetRadius={15}
            ringRadius={12}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={1.5}
            lerpSpeed={0.05}
            color={'#60A5FA'}
            autoAnimate={true}
          />
        </div>

        {/* Status Bar */}
        <div className="relative z-10 flex justify-between items-center px-6 pt-3 pb-2 text-[10px] font-semibold text-white/95">
          <span>{time}</span>
          <div className="flex items-center gap-1.5">
            <i className="las la-signal"></i>
            <i className="las la-wifi"></i>
            <i className="las la-battery-three-quarters"></i>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="relative z-10 grid grid-cols-4 gap-x-2 gap-y-4 p-4 mt-2 flex-grow auto-rows-max">
          {appIcons.map((app) => {
            const isExternal = !!app.href;
            const linkProps = isExternal 
              ? { href: app.href, target: "_blank", rel: "noreferrer" } 
              : { href: app.id };

            const Comp = isExternal || app.id.startsWith("#") ? "a" : "button";

            return (
              <Comp
                key={app.id}
                {...(linkProps as any)}
                onClick={(e: any) => handleAppIconClick(e, app.id)}
                className="flex flex-col items-center justify-start text-center group cursor-pointer border-none bg-none outline-none p-0 animate-app-bounce"
              >
                {/* Icon Wrapper */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-white text-lg shadow-md group-hover:scale-105 active:scale-95 transition-transform duration-200"
                  style={{ background: app.gradient }}
                >
                  <i className={app.icon}></i>
                </div>
                {/* Icon Label */}
                <span className="text-[9px] font-semibold text-white/80 mt-1 group-hover:text-white transition-colors duration-200 truncate w-full max-w-[56px]">
                  {app.label}
                </span>
              </Comp>
            );
          })}
        </div>

        {/* Dock / Footer */}
        <div className="relative z-10 mt-auto px-4 py-3.5 border-t border-white/5 bg-white/[0.02] backdrop-blur-md text-center">
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            Hamza's Playground
          </p>
        </div>

        {/* Tic-Tac-Toe Game Overlay */}
        {showGame && (
          <div className="absolute inset-0 bg-[#06060c] z-20 flex flex-col p-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <i className="las la-gamepad text-orange-500"></i>
                <span>Tic Tac Toe</span>
              </h3>
              <button
                onClick={() => setShowGame(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Game Status */}
            <div className="text-center font-bold text-xs text-gray-200 mb-4 bg-white/3 border border-white/5 rounded-lg py-1.5">
              {gameStatus}
            </div>

            {/* Board */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-[200px] aspect-square mx-auto mb-4">
              {board.map((cell, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCellClick(idx)}
                  className={`w-full h-full rounded-lg bg-neutral-900 border border-white/5 hover:border-white/10 flex items-center justify-center text-xl font-black transition-all cursor-pointer ${
                    cell === "X"
                      ? "text-orange-500 bg-orange-500/5 border-orange-500/10"
                      : cell === "O"
                      ? "text-blue-400 bg-blue-400/5 border-blue-400/10"
                      : "hover:bg-neutral-800"
                  }`}
                >
                  {cell}
                </button>
              ))}
            </div>

            {/* Reset Button */}
            <button
              onClick={resetGame}
              className="mt-auto w-full py-2 bg-blue-500 hover:bg-blue-600 active:scale-98 text-white font-bold text-xs rounded-lg transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              Reset Game
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
