import { dirname, join } from "path";
import { getPackageJSON } from "./getPackageJSON";
import { Archiver } from "archiver";

export const addSource = async (archive: Archiver, directory: string) => {
	const packageJSON = await getPackageJSON(directory);

	const { main } = packageJSON;

	const mainDir = dirname(main);
	if (!mainDir) {
		throw new Error(`Error: could not add source directory at "${mainDir}"`);
	}

	console.info(`adding source code at "${mainDir}"`);

	const absMainDir = join(directory, mainDir);

	archive.directory(absMainDir, mainDir, { name: directory });
};
