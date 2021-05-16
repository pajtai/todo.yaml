# todo.yaml

> A flexible, configurable, and file-based todo tracker.

A GUI for your todo.yaml file.

## Why?

If you have a todo.yaml, you can already edit it in your favorite editor, but gratuitous GUIs are always nice. 

## Getting started

CD into the directory that has your `todo.yaml` file. If there is not `todo.yaml` in the directory, one will be created for you.

## Configurations
- Option to save completed todos

### Try it
```shell
npx todo.yaml
```

### Install it
```shell
npm i -g todo.yaml
```

## Format

The todo.yaml should have the form:

```yaml
todo:
  - item 1
  - item 2
```

## Dev Workflow

```shell
git clone git@github.com:pajtai/todo.yaml.git
npm run dev
```
