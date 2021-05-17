# todo.yaml

> A flexible, configurable, and file-based todo tracker.

A GUI for your todo.yaml file.

## Why?

If you have a todo.yaml, you can already edit it in your favorite editor, but gratuitous GUIs are always nice. 

## Getting started

CD into the directory that has your `todo.yaml` file. If there is not `todo.yaml` in the directory, one will be created for you.

You can configure your todo.yaml when the file is created, and you can configure it later by running `todo configure`. The configuration lives in the todo.yaml file itself under the `configuration` key/

## Commands

| Command | Description |
| --- | --- |
| todo | Opens the todo GUI. Creates and configures a todo.yaml file in the cwd if one doesn't already exist. Opens the GUI for editing the todo.yaml file at http://0.0.0.0:8080/ |
| todo.yaml | Alias for todo |
| npx todo.yaml | Runs todo without globally installing todo.yaml
| todo configure | Configure the todo.yaml in the cwd |
| todo c | alias for todo configure |

## Configuration
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

The todo.yaml has the following format:

```yaml
todo:
  - item 1
  - item 2
configuration:
  saveCompleted
done:
  - done item 1
  - done item 2  
```

## Tips and Tricks

### Manual Editing
* When editing the todo.yaml by hand, you can add in new todo items as strings. They will automatically be turned into objects the next time the api interacts with them.
* You can edit the configuration file interactively via `todo configure` or manually in your todo.yaml

### GUI Editing
* Double click to edit a todo title.

### Syncing
* You can use Dropbox or other methods to sync your todo.yamls between desktop and mobile. 

### Organization
* You can use as many todo.yaml files as you want. Just make sure each is in its own directory.

## Dev Workflow

```shell
git clone git@github.com:pajtai/todo.yaml.git
npm run dev
```
