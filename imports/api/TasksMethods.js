import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert"(doc) {
    return TasksCollection.insertAsync({
      ...doc,
      userId: this.userId,
    });
  },
  "tasks.toggleChecked"({ _id, isChecked }) {
    return TasksCollection.updateAsync(_id, {
      $set: { isChecked: !isChecked },
    });
  },
  "tasks.delete"({ _id }) {
    return TasksCollection.removeAsync(_id);
  },
  "tasks.toggleStatus"({ _id, status }) {
    return TasksCollection.updateAsync(_id, {
      $set: { status: status },
    });
  },
  "tasks.edit"({ _id, title, text, mode}) { 
    if (!this.userId) {
      throw new Meteor.Error("not-authorized", "You must be logged in to edit tasks.");
    }
    const task = TasksCollection.findOne({
      _id: _id,
      userId: this.userId, 
    });
    if (!task) {
      throw new Meteor.Error("not-authorized", "You are not authorized to update this task or the task does not exist.");
    }
    return TasksCollection.updateAsync(_id, {
      $set: { title: title, text: text, mode: mode },
    });
  },
});
