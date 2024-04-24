import { Command } from "commander";
import { createPackage } from "./createPackage";
import { getExtensionFileName } from "./getExtensionFileName";
import { getPackageJSON } from "./getPackageJSON";
import {
	getExtensions,
	updateExtension,
	uploadExtension,
} from "./uploadExtension";
import { join } from "path";

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

	program
		.command("deploy")
		.description(
			"Uploads the extension package to a preconfigured Cognigy.AI environment",
		)
		.action(async () => {
			const packageJSON = await getPackageJSON(process.cwd());
			const extensionFileName = getExtensionFileName(packageJSON);

			const env = {
				apiKey: "",
				apiBaseUrl: "",
				projectId: "",
			};

			const existingExtensionId = await (async () => {
				const existingExtensions = await getExtensions(env);
				const existingExtension = existingExtensions.find(
					(extension: unknown) =>
						(extension as { [key: string]: string }).name === packageJSON.name,
				);
				if (existingExtension) {
					return existingExtension._links.self.href.split("/").pop();
				}
			})();

			const response = await (async () => {
				if (!existingExtensionId) {
					console.log("uploading...");
					return await uploadExtension({
						...env,
						filePath: join(process.cwd(), extensionFileName),
					});
				} else {
					console.log("updating...");
					return await updateExtension({
						...env,
						filePath: join(process.cwd(), extensionFileName),
						extensionId: existingExtensionId,
					});
				}
			})();

			console.log(JSON.stringify(response, null, 2));
		});

	return program;
};
