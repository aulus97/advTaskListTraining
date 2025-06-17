import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";
import { check } from "meteor/check";

Meteor.publish("tasks", function () {
  const userId = this.userId;
  if (!userId) {
    return this.ready();
  }
  return TasksCollection.find({ userId });
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
