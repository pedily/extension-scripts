import archiver from "archiver";
import { createWriteStream } from "fs";
import { join } from "path";
import { addIcon } from "./addIcon";
import { addReadme } from "./addReadme";
import { getExtensionFileName } from "./getExtensionFileName";
import { getPackageJSON } from "./getPackageJSON";
import { addSource } from "./addSource";
import { addPackageJSON } from "./addPackageJSON";

export const createPackage = async (directory: string) => {
	const packageJSON = await getPackageJSON(directory);
	const packageName = getExtensionFileName(packageJSON);

	const archive = archiver("tar", {
		zlib: {
			level: 9,
		},
	});

	await addPackageJSON(archive);
	await addReadme(archive, directory);
	await addIcon(archive, directory);
	await addSource(archive, directory);

	const ws = createWriteStream(join(directory, packageName));

	return new Promise((resolve, reject) => {
		archive.on("error", reject);
		ws.on("close", resolve);

		archive.pipe(ws);
		archive.finalize();
	});
};
