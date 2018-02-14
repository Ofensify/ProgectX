const mongoose = require("mongoose");
const { dbURL } = require("../config");
const Dictionary = require("../models/Dictionary");
mongoose
  .connect(dbURL)
  .then(() => console.log(`Connected to ${dbURL}`))
  .catch(e => console.log(e));

  const dictionary = [{
    combination:"0001",
    text0:"¿Cómo se sacan las fotos los negros?",
    text1: "En negativo"

  },
  {
    combination:"0100",
    text0:"Tu eres tonto?",
    text1: "O le tiras piedras a los aviones?"

  },
  {
    combination:"0100",
    text0:"Tendrían que darte dos medallas",
    text1: "una por tonto y otra por si la pierdes"

  },  {
    combination:"1000",
    text0:"Tírenle agua",
    text1: "Que se seca la ballena"

  },  {
    combination:"1000",
    text0:"La mas tonta de 10 mujeres?",
    text1: "Al azar"

  },  {
    combination:"1000",
    text0:"Cuál es el astro de las mujeres?",
    text1: "el astro-pajo"

  },  {
    combination:"0010",
    text0:"Como se dice en Chino Hombre delgado",
    text1:"fla ku ching"

  },{
    combination:"0001",
    text0:"¿Cómo se sacan las fotos los negros?",
    text1: "En negativo"

  },{
    combination:"1100",
    text0:"¿En qué mes los hombres hacen menos idioteces?",
    text1: "Febrero porque sólo tiene 28 días"

  },{
    combination:"1000",
    text0:"¿Por qué los hombres prefieren rubias tontas?",
    text1: "porque buscan compañía intelectual"

  },{
    combination:"0100",
    text0:"Llegas a nacer mas burro",
    text1: "Y naces con carro y todo"

  },{
    combination:"0100",
    text0:"Eres mas penoso...",
    text1: "Que el dietista de falete"

  },{
    combination:"0100",
    text0:"Eres más inútil...",
    text1: "Que Yamcha"

  },{
    combination:"1000",
    text0:"Eres tan, tan gorda.",
    text1: "Que usas camisetas talla etc..."

  }];


  Dictionary.collection.drop();
  Dictionary.create(dictionary, (err, c) => {
    if (err) {
      throw err;
    }
    c.forEach(dictionary => {
      console.log(dictionary.combination);
    });
  });