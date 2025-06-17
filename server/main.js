import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import historyApiFallback from 'connect-history-api-fallback'; // NEW IMPORT

import { TasksCollection } from "../imports/api/TasksCollection";
import "../imports/api/TasksMethods";
import "../imports/api/TasksPublications";

const insertTask = (taskText, user) => TasksCollection.insertAsync({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
});

WebApp.connectHandlers.use(historyApiFallback({
    // verbose: true, // to uncomment for debugging
    index: '/main.html', 
    rewrites: [],
}));

