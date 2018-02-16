const mongoose = require("mongoose");
const Dictionary = require("../models/Dictionary");
const {dbURL} = require('../config');

mongoose.connect(dbURL)
        .then(() => debug(`Connected to ${dbURL}`))
        .catch(e => console.log(e))

const dictionary = [{
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
  combination: ["hombre","tonto","complex","negro"],
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
},{
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
  combination: ["hombre","tonto","gordo","color"],
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
},
{ combination: ["hombre","character","gordo","color"],
  text0: "Cuando España te encontró flotando en el oceano",
  text1: "Te reclamó como Nuevo Continente"
},{
  combination: ["sexo","character","gordo","color"],
  text0: "Cuando fue al casting de Indiana Jones",
  text1: "Se quedó con el papel de la piedra rodante"
},{
  combination: ["hombre","character","gordo","color"],
  text0: "Si tu culo fuera una tostada",
  text1: "habria que untarla con un remo"
},{
  combination: ["mujer","character","gordo","color"],
  text0: "Cuando llevas tu vestido a la lavandería",
  text1: 'Te dijeron "No lavamos cortinas"'
},{
  combination: ["hombre","tonto","complex","color"],
  text0: "Eres mas tonto que los pelos del culo",
  text1: "que ven pasar la mierda y ni se apartan"
},
{
  combination: ["sexo","tonto","complex","color"],
  text0: "Eres tan tonto que vendiste tu moto",
  text1: "Para comprar gasolina"
},{
  combination: ["sexo","feo","complex","color"],
  text0: "Eres tan feo que fuistes a comprar una careta",
  text1: "Y solo te dieron la goma"
},
{
  combination: ["mujer","feo","complex","color"],
  text0: "Eres tan fea que cuando pasas por una obra",
  text1: "Los albañiles se ponen a trabajar"
},{
  combination: ["sexo","feo","complex","color"],
  text0: "Eres tan feo que tu madre",
  text1: "Te contaba cuentos por Walkie-Talkie"
},
{
  combination: ["hombre","character","complex","negro"],
  text0: "Que dijo dios cuando hizo el primer negro?",
  text1: "Mierda este se me ha quemado."
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
