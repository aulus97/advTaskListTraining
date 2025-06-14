import { TasksCollection } from "../imports/api/TasksCollection";
import "../imports/api/TasksMethods";
import "../imports/api/TasksPublications";

const insertTask = (taskText, user) => TasksCollection.insertAsync({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
});
