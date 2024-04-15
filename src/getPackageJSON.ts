import { readFile } from "fs/promises";
import { join } from "path";
import { packageJSON } from "./PackageJSON";

export const getPackageJSON = async (directory: string) => {
	const packageJSONString = await readFile(
		join(directory, "package.json"),
		"utf-8",
	);
	const packageJSON = JSON.parse(packageJSONString) as packageJSON;

	return packageJSON;
};
