import ReactIcon from "../assets/skills_icons/react.tsx";
import NodeIcon from "../assets/skills_icons/nodejs.tsx";
import ExpressIcon from "../assets/skills_icons/express.tsx";
import TypeScriptIcon from "../assets/skills_icons/typescript.tsx";
import TailwindIcon from "../assets/skills_icons/tailwindcss.tsx";
import PythonIcon from "../assets/skills_icons/python.tsx";
import JavaIcon from "../assets/skills_icons/java.tsx";
import PostgreSQLIcon from "../assets/skills_icons/postgresql.tsx";
import GitIcon from "../assets/skills_icons/git.tsx";
import GithubIcon from "../assets/skills_icons/github.tsx";
import TypingEffect from "./TypingEffect.tsx";

export interface Skill {
  name: string;
  Icon: React.FC<{ width: string }>;
  description: string;
}

const skills: Skill[] = [
  {
    name: "React.js",
    Icon: ReactIcon,
    description: "Frontend UI library",
  },
  {
    name: "Node.js",
    Icon: NodeIcon,
    description: "Backend runtime",
  },
  {
    name: "Express.js",
    Icon: ExpressIcon,
    description: "Web framework",
  },
  {
    name: "TypeScript",
    Icon: TypeScriptIcon,
    description: "Typed JS superset",
  },
  {
    name: "Tailwind CSS",
    Icon: TailwindIcon,
    description: "Utility-first CSS",
  },
  {
    name: "Python",
    Icon: PythonIcon,
    description: "Programming language",
  },
  {
    name: "Java",
    Icon: JavaIcon,
    description: "General-purpose language",
  },
  {
    name: "PostgreSQL",
    Icon: PostgreSQLIcon,
    description: "Relational DB",
  },
  {
    name: "Git",
    Icon: GitIcon,
    description: "Version control",
  },
  {
    name: "GitHub",
    Icon: GithubIcon,
    description: "Code hosting",
  },
];

interface PortfolioSectionProps {
  id: string;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ id }) => {
  return (
    <div
      id={id}
      className="container mx-auto   rounded-[40px]  flex flex-col items-center p-7 "
    >
      <h1 className="text-5xl font-bold">
        Let's talk <span className="font-special">technical</span>
      </h1>
      <div className="text-left w-full mt-4">
        <h3 className="text-3xl font-semibold">My skills:</h3>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex  items-center p-4 bg-gray-100 rounded-lg min-w-300px h-[100px] hover:bg-[#5dccf1] hover:shadow-lg group transition duration-300 "
          >
            <skill.Icon width="40px" />
            <div className="ml-4 ">
              <h3 className="text-2xl font-semibold ">{skill.name}</h3>
              <p>{skill.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full mt-4 flex flex-col items-center">
        <div className="text-left w-full">
          <h3 className="text-3xl font-semibold">My projects:</h3>
        </div>
        <div className="h-[200px] justify-center items-center flex font-special text-4xl">
          <TypingEffect strings={["Comming soon..."]}></TypingEffect>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;
