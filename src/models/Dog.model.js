const { model, Schema } = require("mongoose");

// Um Schema é um conjunto de regras que o Mongoose vai aplicar ANTES da inserção do documento, e impedir a inserção caso qualquer uma das regras seja violada. Campos que não fazem parte do Schema serão IGNORADOS e não farão parte do documento no banco.
const dogSchema = new Schema({
  name: { type: String, required: true },
  breed: { type: String, default: "mixed" },
  color: String,
  age: { type: Number, min: 0, max: 20 },
  size: { type: String, enum: ["small", "medium", "large"] },
  favoriteToy: String,
});

// O nome do modelo (primeiro argumento) é o que determina o nome da coleção no MongoDB, porém no plural. Nesse caso, nossa coleção será chamada de 'dogs'
const dogModel = model("Dog", dogSchema);

module.exports = dogModel;
