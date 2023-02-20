#!/usr/bin/env node
import { getProgram } from "../getProgram";

(() => {
	const program = getProgram();

	program.parse();
})();
