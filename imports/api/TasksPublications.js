import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";
import { check } from "meteor/check";

Meteor.publish("tasks", function () {
  const userId = this.userId;
  if (!userId) {
    return TasksCollection.find({ mode: 1 });
  }
  return TasksCollection.find({
    $or: [
      { mode: 1}, 
      { mode: 2, userId: userId }
    ]
  });  

  /*const query = {};

  if (!userId) {
    query.$or = [{ mode: 1 }];
  } else {
    query.$or = [
      { mode: 1},
      { mode: 2, userId: userId }
    ]
  }

  const tasksCursor = TasksCollection.find(query); // eactive cursor
  const tasksArray = tasksCursor.fetch(); // Fetch the documents into an array

  let userIds = Array.isArray(tasksArray)
    ? tasksArray.map(task => task.userId).filter(Boolean)
    : []; // Default to an empty array if tasksArray is not an array

    // Add the current user's ID to the list if logged in
  if (userId && !userIds.includes(userId)) {
    userIds.push(userId);
  }

  // Also, ensure all user IDs from public tasks are included, even if the current user has no private tasks
  const publicTasks = TasksCollection.find({ mode: 1 }, { fields: { userId: 1 } }).fetch();
  const publicTaskUserIds = publicTasks.map(task => task.userId).filter(Boolean);
  userIds = userIds.concat(publicTaskUserIds);

  const uniqueUserIds = Array.from(new Set(userIds));

  return [
    tasksCursor, // Return the reactive cursor for tasks
    Meteor.users.find(
      {_id: {$in: uniqueUserIds} },
      {fields: {username:1} }
    )
  ];*/
});

Meteor.publish("tasks.singleTask", function (taskId) {//to edit single task at editForm
  check(taskId, String);
  const userId = this.userId;
  if (!userId) {
    return this.ready();
  }
  return TasksCollection.find({
    _id: taskId,
    userId: userId,
  });
});
