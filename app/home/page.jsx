import Link from "next/link";

export default function HomePage() {

  const games = [
    {
      name: "Blackjack",
      link: "/blackjack",
      color: "bg-purple-500",
    },
    {
      name: "Slot Machine",
      link: "/slot",
      color: "bg-pink-500",
    },
    {
      name: "Virtual",
      link: "/virtual",
      color: "bg-orange-500",
    },
    {
      name: "Poker",
      link: "/poker",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">

      <div className="w-[250px] bg-slate-800 p-5">

        <h1 className="text-4xl font-bold text-green-500 mb-10">
          TurboBet
        </h1>

        <div className="flex flex-col gap-4">

          {games.map((game, index) => (
            <Link key={index} href={game.link}>
              <button className={`${game.color} p-4 rounded-xl w-full text-xl font-bold`}>
                {game.name}
              </button>
            </Link>
          ))}

          <Link href="/profile">
            <button className="bg-slate-700 p-4 rounded-xl w-full text-xl font-bold mt-6">
              Profilo
            </button>
          </Link>

        </div>
      </div>

      <div className="flex-1 p-10">

        <h1 className="text-6xl font-bold mb-10">
          Benvenuto su TurboBet
        </h1>

        <div className="grid grid-cols-2 gap-8">

          {games.map((game, index) => (

            <div
              key={index}
              className="bg-slate-800 p-10 rounded-3xl h-[220px] flex flex-col justify-between"
            >

              <div>

                <h2 className="text-4xl font-bold mb-4">
                  {game.name}
                </h2>

                <p className="text-xl text-gray-300">
                  Gioca ora su TurboBet
                </p>

              </div>

              <Link href={game.link}>
                <button className={`${game.color} p-4 rounded-xl text-xl font-bold w-full`}>
                  GIOCA
                </button>
              </Link>

            </div>

          ))}

        </div>
      </div>
    </div>
  );
}