export const dynamic = "force-dynamic";

export default function Home() {
  const now_string = new Date().toLocaleDateString(undefined, {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const ttys_num = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return (
    <div className="flex justify-center min-h-screen p-4 md:p-32">
      <div className="max-w-fit rounded-lg h-fit shadow shadow-black">
        <div className="flex bg-white/20 gap-1 p-2 rounded-t-lg items-center">
          <div className="w-3 h-3 bg-red-400 rounded-full" />
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
          <div className="w-3 h-3 bg-green-400 rounded-full" />
          <h1 className="text-xs text-white/80 flex-grow text-center">
            nobrayner.dev
          </h1>
          <div className="w-3 h-3" />
          <div className="w-3 h-3" />
          <div className="w-3 h-3" />
        </div>
        <main className="p-4 bg-black rounded-b-lg box-content">
          <p className="text-white/70">
            Last login: {now_string} on ttys{ttys_num}
          </p>
          <br />
          <Prompt command="whoami" />
          <WhoamiCommand />
          <br />
          <Prompt command="ls -l" />
          <ListCommand />
        </main>
      </div>
    </div>
  );
}

function Prompt({ command }: { command: string }) {
  return (
    <div className="flex">
      <p className="text-white/70">
        <span className="text-yellow-300/70">$</span> guest@nobrayner.dev:
      </p>
      <p>&nbsp;{command}</p>
    </div>
  );
}

function WhoamiCommand() {
  return (
    <>
      <p>Braydon Hall, Software Engineer based in Australia</p>
    </>
  );
}

function ListCommand() {
  return ITEMS.map((item) => <ListItem {...item} />);
}

const ITEMS: Item[] = [
  {
    type: "link",
    name: "LinkedIn",
    count: 35,
    style: "text-blue-400",
    date: "2024-08-26T13:29:00.000Z",
    size: 51,
    url: "https://www.linkedin.com/in/braydon-hall-6aba72200/",
  },
  {
    type: "link",
    name: "GitHub",
    count: 264,
    style: "text-gray-300",
    date: "2018-07-02T00:00:00.000Z",
    size: 28,
    url: "https://github.com/nobrayner",
  },
  {
    type: "file",
    name: "resume.pdf",
    count: 78,
    style: "text-gray-400",
    date: "2024-06-10T12:43:00.000Z",
    size: 278094,
    url: "/Braydon Hall - Software Engineer.pdf",
  },
  {
    type: "link",
    name: "Contact me",
    count: 377,
    style: "text-green-400",
    date: "2024-01-01T00:00:00.000Z",
    size: 0,
    url: "mailto:braydon@nobrayner.dev",
  },
];

const LONGEST_ITEM_CHARS = Math.max(
  ...ITEMS.map((i) => i.size.toString().length),
);
const LONGEST_ITEM_COUNT = Math.max(
  ...ITEMS.map((i) => i.count.toString().length),
);

function ListItem({
  type,
  name,
  count,
  style,
  size,
  date: date_string,
  url,
}: Item) {
  const date = new Date(date_string);
  const six_months_ago = new Date();
  six_months_ago.setMonth(six_months_ago.getMonth() - 6);

  return (
    <div>
      <a href={url} className="group">
        <pre className="inline">
          {TYPE_MAP[type]} {count.toString().padStart(LONGEST_ITEM_COUNT, " ")}{" "}
          nobrayner visitors {size.toString().padStart(LONGEST_ITEM_CHARS, " ")}
        </pre>
        <wbr />{" "}
        <pre className="inline">
          {date.getDate().toString().padStart(2, " ")}{" "}
          {date.toLocaleString(undefined, {
            month: "short",
          })}{" "}
          {date.getTime() > six_months_ago.getTime()
            ? `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
            : date.getFullYear().toString().padStart(5, " ")}{" "}
          <span className={`${style} group-hover:underline underline-offset-2`}>
            {name}
          </span>
        </pre>
      </a>
    </div>
  );
}

const TYPE_MAP: Record<Item["type"], string> = {
  link: "lr-x",
  file: "-r--",
};

type Item = {
  name: string;
  style: string;
  size: number;
  date: string;
  count: number;
  type: "link" | "file";
  url: string;
};
