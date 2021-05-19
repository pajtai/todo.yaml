let candidateFile = process.argv[2];

export const CWD = process.cwd();
export const TODO_FILE_NAME = /\.yaml$/.test(candidateFile) ? candidateFile : "todo.yaml";
