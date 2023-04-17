const Service = require('../../models/service');

async function findService (_, res) {

  try {

    const allServices = await Service.findAll();
    res.status(200).json(allServices);

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = findService;