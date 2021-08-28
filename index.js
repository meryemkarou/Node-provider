const cron = require('node-cron');
const express = require('express');

// créer une instance d'Express
app = express();
//tâches à exécuter
cron.schedule('* * * * *', function() {
  console.log('executer la tache chaque minute');
});

app.listen(3000);