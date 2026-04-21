# Task Tracker CLI

A simple command-line tool to manage tasks using a local JSON file.

The application receives commands via terminal arguments and performs operations directly on a JSON file in the current directory. If the file does not exist, it is created automatically.

Each task contains an `id`, `description`, `status` (`todo`, `in-progress`, `done`), and timestamps (`createdAt`, `updatedAt`). The `id` is used to update, delete, or change the task status.

Adding a task creates a new entry with status `todo`. Updating changes the description and refreshes `updatedAt`. Deleting removes the task. Status commands only update the `status` field.

Listing reads the JSON file and prints tasks. You can list all tasks or filter by status.

## Usage

task-cli [command] [arguments]

task-cli add "description"   
task-cli update [id] "description"   
task-cli delete [id]   
task-cli mark-in-progress [id]   
task-cli mark-done [id]   
task-cli list   
task-cli list done   
task-cli list todo   
task-cli list in-progress   
