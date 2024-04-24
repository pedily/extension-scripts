import { readFile } from "fs/promises";
import { basename, extname } from "path";

interface EnvironmentParameters {
	apiBaseUrl: string;
	apiKey: string;
	projectId: string;
}

interface UploadParameters extends EnvironmentParameters {
	filePath: string;
}

interface UpdateParameters extends UploadParameters {
	extensionId: string;
}

export const getExtensions = async (params: EnvironmentParameters) => {
	const { apiKey, apiBaseUrl, projectId } = params;

	const url = `${apiBaseUrl}/new/v2.0/extensions?projectId=${projectId}`;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"x-api-key": apiKey,
		},
	});

	return (await response.json())._embedded.extensions;
};

export const uploadExtension = async (params: UploadParameters) => {
	const { apiKey, apiBaseUrl, filePath, projectId } = params;

	const extensionFileName = basename(filePath, extname(filePath));
	const extensionBlob = new Blob([await readFile(filePath)]);

	const body = new FormData();
	body.set("projectId", projectId);
	body.set("file", extensionBlob, extensionFileName);

	const url = `${apiBaseUrl}/new/v2.0/extensions/upload`;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"x-api-key": apiKey,
		},
		body,
	});

	console.log(await response.json());
};

export const updateExtension = async (params: UpdateParameters) => {
	const { apiKey, apiBaseUrl, filePath, projectId, extensionId } = params;

	const extensionFileName = basename(filePath, extname(filePath));
	const extensionBlob = new Blob([await readFile(filePath)]);

	const body = new FormData();
	body.set("projectId", projectId);
	body.set("extension", extensionId);
	body.set("file", extensionBlob, extensionFileName);

	const url = `${apiBaseUrl}/new/v2.0/extensions/update`;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"x-api-key": apiKey,
		},
		body,
	});

	console.log(await response.json());
};
