const mongoose = require("mongoose");
const Dictionary = require("../models/Dictionary");
// const {dbURL} = require('../config');
// console.log({dbURL});
mongoose.connect('mongodb://Alberto_soler:1234@ds133558.mlab.com:33558/offensify')
        .then(() => debug(`Connected to ${dbURL}`))
        .catch(e => console.log(e))
const dictionary = [{
  // combination: "2221",
  combination: ["sexo","character","complex","negro"],
  text0: "¿Cómo se sacan las fotos los negros?",
  text1: "En negativo"
},
{
  combination: ["sexo","tonto","complex","color"],
  text0: "Tu eres tonto?",
  text1: "O le tiras piedras a los aviones?"
},
{
  combination: ["sexo","tonto","complex","color"],
  text0: "Tendrían que darte dos medallas",
  text1: "una por tonto y otra por si la pierdes"
}, {
  combination: ["mujer","character","gordo","color"],
  text0: "Tírenle agua",
  text1: "Que se seca la ballena"
}, {
  combination: ["mujer","tonto","complex","color"],
  text0: "La mas tonta de 10 mujeres?",
  text1: "Al azar"
}, {
  combination: ["mujer","tonto","complex","color"],
  text0: "Cuál es el astro de las mujeres?",
  text1: "el astro-pajo"
}, {
  combination: ["hombre","character","flaco","color"],
  text0: "Como se dice en Chino Hombre delgado",
  text1: "fla ku ching"
}, {
  combination: ["sexo","character","complex","negro"],
  text0: "¿Cómo se sacan las fotos los negros?",
  text1: "En negativo"
}, {
  combination: ["hombre","tonto","complex","color"],
  text0: "¿En qué mes los hombres hacen menos idioteces?",
  text1: "Febrero porque sólo tiene 28 días"
}, {
  combination: ["hombre","tonto","complex","color"],
  text0: "¿Por qué los hombres prefieren rubias tontas?",
  text1: "porque buscan compañía intelectual"
}, {
  combination: ["hombre","tonto","complex","color"],
  text0: "Llegas a nacer mas burro",
  text1: "Y naces con carro y todo"
}, {
  combination: ["hombre","tonto","complex","color"],
  text0: "Eres mas penoso...",
  text1: "Que el dietista de falete"
}, {
  combination: ["sexo","tonto","complex","color"],
  text0: "Eres más inútil...",
  text1: "Que Yamcha"
}, {
  combination: ["mujer","character","gordo","color"],
  text0: "Eres tan, tan gorda.",
  text1: "Que usas camisetas talla etc..."
}, {
  combination: ["sexo","tonto","complex","color"],
  text0: "Eres más inútil...",
  text1: "Que el cenicero de una moto"
}];
Dictionary.collection.drop();
Dictionary.create(dictionary, (err, c) => {
  if (err) {
    throw err;
  }
  c.forEach(dictionary => {
    console.log(dictionary.combination);
  });
  mongoose.connection.close();
});
