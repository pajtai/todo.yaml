# todo.yaml

> A flexible, configurable, and file-based todo tracker.

## Getting started

```shell
npx todo.yaml
```

If you want to run a "todo" or "todo.yaml" command globally, install globally with `npm i -g todo.yaml`.

The command will execute on the todo.yaml in the current directory. If there is none, one will be created for you.

You can have as many todo.yaml files as you want. Each tracks todos based on a todo array. Each is configured within the file itself.

### Commands

### Features

Out of the box todo.yaml is a simple First-In, First-Out queue of plain text todos.

For each `todo.yaml` file, you can configure additional features using: `todo configure`.

## Dev Workflow

```shell
git clone
npm link
# now you can test by running "todo"
```

## Motivation

I wanted a todo tracker that can adapt to what I need. Sometimes I just need a flat list, sometimes I need project, parent relationships, or other features. I want to be able to pick and choose the features I'm using. I also want something file based that is easy to save, sync, and edit. I find the idea of todo.txt great; however, I find its formatting constricting. 

For usage of the app, I wanted a CLI, but I didn't want to have to remember any commands.
