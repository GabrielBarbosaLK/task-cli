const fs = require('fs'); // Native File System.

// Global Variables.
let data;
let date;
let args;
let index;
let total;
let save = false;

// Returns the index in the task list by ID.
function get_index_tasks(tasks, id) {
    let index = -1

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            index = i;
            break;
        }
    }

    if (index == -1) {
        return null;
    }

    return index;
}

// List all tasks based on their status and return number of tasks.
function list_tasks(tasks, condition) {
    let count = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status == condition) {
            console.log(
                'Id:', tasks[i].id, '|',
                'Description:', tasks[i].description, '|',
                'Status:', tasks[i].status, '|',
                'Created At:', tasks[i].createdAt, '|',
                'Updated At:', tasks[i].updatedAt
            );

            count += 1;
        }
    }

    return count;
}

// Create a JSON file without exist.
if (!fs.existsSync('./data.json')) {
    fs.writeFileSync('./data.json', '{"count_id": 1, "tasks": []}');
}

// Read JSON file
data = fs.readFileSync('./data.json', 'utf-8');
data = JSON.parse(data);

// Get the current date and time.
date = new Date();

// Get arguments on CLI
args = process.argv.slice(2);

switch (args[0]) {
    // Command "ADD"
    case 'add':
        // Check number of arguments
        if (args.length == 2) {

            // Add to array of tasks
            data.tasks.push({
                "id": data.count_id, 
                "description": args[1], 
                "status": "todo", 
                "createdAt": date.toLocaleString(), 
                "updatedAt": date.toLocaleString()
            });

            console.log("Task added successfully (ID: " + data.count_id + ")");

            // Increment ID tasks
            data.count_id += 1;

            save = true;

        } else {
            console.log('Command "add" expected 1 argument, received: ' + (args.length - 1));
            console.log('Example: task-cli.js add "Description"');

        }

        break;

    // Command "UPDATE"
    case 'update':
        if (args.length == 3) {
            index = get_index_tasks(data.tasks, args[1]);

            // Case tasks index is not null, change description and update date/time
            if (index != null) {
                data.tasks[index].description = args[2];
                data.tasks[index].updatedAt = date.toLocaleString();

                console.log("Task updated sucessfully (ID: " + args[1] + ")");

                save = true;

            } else {
                console.log("Task with id: " + args[1] + ", Not exist");

            }

        } else {
            console.log('Command "update" expected 2 arguments, received: ' + (args.length - 1));
            console.log('Example: task-cli.js update id "Description"');

        }

        break;

    // Command "DELETE"
    case 'delete':
        if (args.length == 2) {
            index = get_index_tasks(data.tasks, args[1]);

            if (index != null) {
                
                // Delete task
                data.tasks.splice(index, 1);

                console.log("Task deleted sucessfully (ID: " + args[1] + ")");

                save = true;

            } else {
                console.log("Task with id: " + args[1] + ", Not exist");

            }

        } else {
            console.log('Command "delete" expected 1 arguments, received: ' + (args.length - 1));
            console.log('Example: task-cli.js delete id');

        }

        break;

    // Command "MARK-IN-PROGRESS"
    case 'mark-in-progress':
        if (args.length == 2) {
            index = get_index_tasks(data.tasks, args[1]);

            if (!(index == null)) {
                // Change task status
                data.tasks[index].status = 'in-progress';
                data.tasks[index].updatedAt = date.toLocaleString();

                console.log("Task marked in progress (ID: " + args[1] + ")");

                save = true;

            } else {
                console.log("Task with id: " + args[1] + ", Not exist");

            }

        } else {
            console.log('Command "mark-in-progress" expected 1 arguments, received: ' + (args.length - 1));
            console.log('Example: task-cli.js mark-in-progress id');

        }

        break;

    // Command "MARK-DONE"
    case 'mark-done':
        if (args.length == 2) {
            index = get_index_tasks(data.tasks, args[1]);
                
            if (index != null) {
                data.tasks[index].status = 'done';
                data.tasks[index].updatedAt = date.toLocaleString();

                console.log("Task marked done (ID: " + args[1] + ")");

                save = true;

            } else {
                console.log("Task with id: " + args[1] + ", Not exist");

            }

        } else {
            console.log('Command "mark-done" expected 1 arguments, received: ' + (args.length - 1));
            console.log('Example: task-cli.js mark-done id');

        }   

        break;

    // Command "LIST"
    case 'list':
        // Command "LIST DONE"
        if (args[1] == 'done') {
            if (args.length == 2) {
                count = list_tasks(data.tasks, 'done');

                console.log("Tasks done listed (Total: " + count + ")");

            } else {
                console.log('Command "list" expected 0 argument for all tasks or 1 argument for status choice, received: ' + (args.length - 1));
            }

        // Command "LIST TODO"
        } else if (args[1] == 'todo') {
            if (args.length == 2) {
                count = list_tasks(data.tasks, 'todo');

                console.log("Tasks todo listed (Total: " + count + ")");

            } else {
                console.log('Command "list" expected 0 argument for all tasks or 1 argument for status choice, received: ' + (args.length - 1));
            }

        // Command "LIST IN-PROGRESS"
        } else if (args[1] == 'in-progress') {
            if (args.length == 2) {
                count = list_tasks(data.tasks, 'in-progress');

                console.log("Tasks in-progress listed (Total: " + count + ")");

            } else {
                console.log('Command "list" expected 0 argument for all tasks or 1 argument for status choice, received: ' + (args.length - 1));
            }

        // list all
        } else if (args.length == 1) {
            for (let i = 0; i < data.tasks.length; i++) {
                console.log(
                    'Id:', data.tasks[i].id, '|',
                    'Description:', data.tasks[i].description, '|',
                    'Status:', data.tasks[i].status, '|',
                    'Created At:', data.tasks[i].createdAt, '|',
                    'Updated At:', data.tasks[i].updatedAt
                );
            }

            console.log("All tasks listed (Total: " + data.tasks.length + ")");
        }

        break;

    // Case invalid command
    default:
        console.log("The command does not exist: " + args[0]);
        console.log("Try: add, update, delete, mark-in-progress, mark-done, list")
}

// Save changes in JSON file
if (save) {
    data = JSON.stringify(data);
    fs.writeFileSync("./data.json", data);
}
