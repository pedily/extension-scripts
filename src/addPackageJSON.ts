import { Archiver } from "archiver";

export const addPackageJSON = async (archive: Archiver) => {
    console.info("adding package.json and package-lock.json");
    archive.file("package.json", { name: "package.json" });
    archive.file("package-lock.json", { name: "package-lock.json" });
}