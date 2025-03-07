const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Grupo-06:grupo06@cursadanodejs.ls9ii.mongodb.net/Node-js')

.then(() => console.log('Conexion exitosa a MongoDb'))
.catch(error => console.error('Error al conectar a MongoDB:', error));

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String
}, { collection: 'Grupo-06' });

//Creacion SuperHeroe
const SuperHero = mongoose.model('SuperHero', superheroSchema);

async function insertSuperHero() {
    const hero = new SuperHero({
        nombreSuperHeroe: 'PonziDuende',
        nombreReal: 'Gabriel Gerardo Miguel',
        edad: 84,
        planetaOrigen: 'Tierra',
        debilidad: 'Papas Fritas',
        poderes: ['Libra', 'Engaño', 'Super idiota', 'Muletillas'],
        aliados: ['Emilia Limones'],
        enemigos: ['El pueblo'],
        creador: 'Ktta'
    });

    await hero.save();
    console.log('Superhéroe insertado:', hero);
}

insertSuperHero();

// Cambio de edad
async function updateSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe },
        { $set: { edad: 53 } }
    );
    console.log('Resultado de la actualización:', result);
}

updateSuperHero('PonziDuende'); 

async function deleteSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
    console.log('Superhéroe eliminado:', result);
  }
  
  deleteSuperHero('PonziDuende');

  async function findSuperHeroes() {
    const heroes = await SuperHero.find({ planetaOrigen: 'Tierra' });
    console.log('Superhéroes encontrados:', heroes);
  }
  
  findSuperHeroes();




