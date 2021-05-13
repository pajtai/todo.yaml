# todo.yaml

> A flexible, configurable, and file-based todo tracker.

## Getting started

### Try it
```shell
npx todo.yaml
```

### Install it
```shell
npm i -g todo.yaml
```

Now you can run a "todo" or "todo.yaml" command globally, install globally with `npm i -g todo.yaml`.

The command will execute on the todo.yaml in the current directory. If there is none, one will be created for you.

You can have as many todo.yaml files as you want. Each tracks todos based on a todo array. Each is configured within the file itself.

### Features

Out of the box todo.yaml is a simple queue of plain text todos you can add to or remove from.

## API

| Command | Description |
| --- | --- |
| todo | Run the todo CLI in an interactive manner. No need to memorize any arguments |
| todo.yaml | Alias for todo |
| todo list | List all current todos |
| todo ls | Alias for todo list |
| todo help | Show help for running commands with command line arguments |
| todo -h | Alias for todo help |
| todo --help | Alias for todo help |


## Dev Workflow

```shell
git clone
npm link
# now you can test by running "todo"
```

## Motivation

I wanted a todo tracker that can adapt to what I need. Sometimes I just need a flat list, sometimes I need project, parent relationships, or other features. I want to be able to pick and choose the features I'm using. I also want something file based that is easy to save, sync, and edit. I find the idea of todo.txt great; however, I find its formatting constricting. 

For usage of the app, I wanted a CLI, but I didn't want to have to remember any commands.
