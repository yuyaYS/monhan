import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";

export default async function EndemicLifePage() {
  const jsonDirectory = path.join(
    process.cwd(),
    "public",
    "data",
    "endemicLife.json"
  );
  const fileContents = await fs.readFile(jsonDirectory, "utf8");
  const data = JSON.parse(fileContents);

  const endemicLife = data.endemicLife;

  return (
    <div>
      <h1>Endemic Life</h1>
      <ul>
        {endemicLife.map((creature: any) => (
          <li key={creature.name}>
            <h2>{creature.name}</h2>
            {creature.game.map((gameInfo: any) => (
              <div key={gameInfo.game}>
                <h3>{gameInfo.game}</h3>
                <p>{gameInfo.info}</p>
                {gameInfo.image && (
                  <Image
                    src={`/data/icons/${gameInfo.image}`}
                    alt={`${creature.name} icon`}
                    width={50}
                    height={50}
                  />
                )}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
