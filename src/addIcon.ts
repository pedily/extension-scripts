import { Archiver } from "archiver";
import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { join, resolve } from "path";

export const addIcon = async (archive: Archiver, directory: string) => {
	if (existsSync(join(directory, "icon.png"))) {
		archive.file("icon.png", { name: "icon.png" });
	} else {
		console.info("adding dummy icon file");
		archive.append(await readFile(resolve(__dirname, "../assets/icon.png")), {
			name: "icon.png",
		});
	}
};
