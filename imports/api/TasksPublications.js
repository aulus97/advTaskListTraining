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
});
Meteor.publish("tasks.singleTask", function (taskId) {
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
