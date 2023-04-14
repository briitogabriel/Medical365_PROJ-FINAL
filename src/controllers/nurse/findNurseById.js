const Nurse = require('../../models/nurse');

async function findNurseById (req, res) {

  try {
    const nurseId = req.params.id

    const nurseInDatabase = await Nurse.findByPk(nurseId);
    if (!nurseInDatabase) {
      return res.status(404).json({message: `Enfermeiro com ID ${nurseId} não encontrado.`})
    }

    res.status(200).json(nurseInDatabase);

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = findNurseById;