const mongoose = require("mongoose");
// Por convenção, modelos de banco de dados começam com letra maiúscula
const DogModel = require("./models/Dog.model");

const dogArr = require("./data");

const DB_NAME = "dogDB";

async function init() {
  try {
    // Criando uma uma conexão com o banco. Todas as operações precisam ficar abaixo dessa conexão.
    const connection = await mongoose.connect(
      `mongodb://localhost:27017/${DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(
      "Conectado ao banco com sucesso: ",
      connection.connections[0].name
    );

    // ATENÇÃO: a linha abaixo DELETA o banco inteiro. NÃO USE em projetos ou labs. Só estamos implementando isso nesse exemplo porque ainda não estamos usando o Express.
    connection.connections[0].dropDatabase();

    // Criando um novo documento no banco
    const result = await DogModel.create({
      name: "Tyrion",
      breed: "French Bulldog",
      color: "Yellow",
      age: 4,
      size: "medium",
      favoriteToy: "Bones",
    });
    console.log(result);

    // Inserir vários documentos de uma vez
    const resultMany = await DogModel.insertMany(dogArr);
    console.log(resultMany);

    // Listar todos os documentos do banco
    const allDogs = await DogModel.find();

    console.log("TODOS OS DOGS =>", allDogs);

    // Filtrar vários documentos
    const filteredDogs = await DogModel.find({ breed: "mixed" });

    console.log("DOGS VIRA-LATAS => ", filteredDogs);

    // Filtrar somente um documento
    const specificDog = await DogModel.findOne({ _id: allDogs[1]._id });

    console.log("SOMENTE UM DOG FILTRADO POR ID => ", specificDog);

    // Atualizar um documento

    const updatedDog = await DogModel.findOneAndUpdate(
      { _id: allDogs[0]._id },
      { $set: { age: 5 } },
      // Este terceiro argumento é um objeto de configuração e a chave new configura o método para retornar o objeto atualizado ao invés do objeto antigo
      { new: true }
    );

    console.log("DOG ATUALIZADO => ", updatedDog);

    // Deletar um documento

    const deletedDog = await DogModel.deleteOne({ name: "Demonio" });

    console.log("DOG DELETADO => ", deletedDog);
  } catch (err) {
    console.error(err);
  }
}

init();
