let candidateFile = process.argv[2];

/**
 * Singleton configuration object
 */
export default {
    CWD: process.cwd(),
    TODO_FILE_NAME: /\.yaml$/.test(candidateFile) ? candidateFile : "todo.yaml",
    CLI: null,
};
