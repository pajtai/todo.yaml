let candidateFile = process.argv[2];

export default {
    CWD: process.cwd(),
    TODO_FILE_NAME: /\.yaml$/.test(candidateFile) ? candidateFile : "todo.yaml"
};
