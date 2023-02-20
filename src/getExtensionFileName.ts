import { packageJSON } from "./PackageJSON";

export const getExtensionFileName = (packageJSON: packageJSON) => {
	return `${packageJSON.name}.tar.gz`;
};
