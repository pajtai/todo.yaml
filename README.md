# todo.yaml - PRE ALPHA

> A flexible, configurable, and file-based todo tracker.

A GUI for your todo.yaml.

Currently this just lists todos stored in a todo.yaml. The todo.yaml has to have the form:

```yaml
todo:
  - item 1
  - item 2
```

Roadmap:
- ~~Create GUI scaffold~~
- ~~Auto create todo.yaml~~
- ~~List todos in todo.yaml file~~
- Add todo via GUI
- Complete todo via GUI
- Reorder items
- Add optional type, due date, priority, project, completed columns
- Add configuration options that save to todo.yaml

## Getting started

### Try it
```shell
npx todo.yaml
```

### Install it
```shell
npm i -g todo.yaml
```

## Dev Workflow

```shell
git clone
npm link
# now you can test by running "todo"
```
