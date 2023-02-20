import { Command } from "commander";
import { createPackage } from "./createPackage";
import { getExtensionFileName } from "./getExtensionFileName";
import { getPackageJSON } from "./getPackageJSON";

export const getProgram = () => {
	const program = new Command();

	program
		.name("extension-scripts")
		.description("A CLI toolbox for the development of extensions")
		.version("0.0.1");

	program
		.command("package")
		.description("Bundles the source files into an installable extension")
		.action(async () => {
			const packageJSON = await getPackageJSON(process.cwd());
			const extensionFileName = getExtensionFileName(packageJSON);

			console.log(`generating ${extensionFileName}`);

			await createPackage(process.cwd());
		});

	return program;
};
