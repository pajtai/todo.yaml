# todo.yaml

> A flexible, configurable, and file-based todo tracker.

## Concepts
- todo.yaml: You can have as many of these as you want. Each tracks todos based on a configuration file in the same directory
- todo-config.yaml: The configuration file for the specific todo.yaml you are working with

## Getting started

```shell
npm i -g todo.yaml
```

You can now run the "todo" command globally

The command will execute on the nearest todo.yaml file found searching the current directory and each parent directory

## Dev Workflow

```shell
git clone
npm link
# now you can test by running "todo"
```

## Motivation

I wanted a todo tracker that can adapt to what I need. Sometimes I just need a flat list, sometimes I need project, parent relationships, or other features. I want to be able to pick and choose the features I'm using. I also want something file based that is easy to save, sync, and edit. I find the idea of todo.txt great; however, I find its formatting constricting. 

For usage of the app, I wanted a CLI, but I didn't want to have to remember any commands.
