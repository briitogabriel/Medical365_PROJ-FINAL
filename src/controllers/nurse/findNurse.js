const Nurse = require('../../models/nurse');

async function findNurse (_, res) {

  try {

    const allNurses = await Nurse.findAll({ order: ['id'] });
    res.status(200).json(allNurses);

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = findNurse;