const Patient = require('../../models/patient');

async function findPatient (req, res) {

  try {
    const statusParam = req.query.status
    const statusList = ['AGUARDANDO_ATENDIMENTO', 'EM_ATENDIMENTO', 'ATENDIDO', 'NAO_ATENDIDO'];
    const databaseStatus = ['AGUARDANDO ATENDIMENTO', 'EM ATENDIMENTO', 'ATENDIDO', 'NÃO ATENDIDO'];

    if (statusParam) {
      if (!statusList.includes(statusParam.toUpperCase())) {
        return res.status(400).json({message: "Informe um status válido ('AGUARDANDO_ATENDIMENTO', 'EM_ATENDIMENTO', 'ATENDIDO', 'NAO_ATENDIDO') ou remova o campo para listar todos os status."})
      }
      const indexPosition = statusList.indexOf(statusParam.toUpperCase())
      const statusToFilter = databaseStatus[indexPosition]

      const findFilteredPatients = await Patient.findAll({
        where: { service_status: statusToFilter },
        order: ['id']
      });
      if (findFilteredPatients.length == 0) {
        return res.status(404).json({message: `Nenhum paciente com status '${statusToFilter}' encontrado.`})
      }
      return res.status(200).json(findFilteredPatients);
    }

    const allPatients = await Patient.findAll({ order: ['id'] });
    res.status(200).json(allPatients);

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = findPatient;