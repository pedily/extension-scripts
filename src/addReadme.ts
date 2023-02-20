import { Archiver } from "archiver";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join, resolve } from "path";

export const addReadme = async (archive: Archiver, directory: string) => {
	if (existsSync(join(directory, "README.md"))) {
		archive.file("README.md", { name: "README.md" });
	} else {
		console.info("adding dummy README file");
		archive.append(await readFile(resolve(__dirname, "../assets/README.md")), {
			name: "README.md",
		});
	}
};
