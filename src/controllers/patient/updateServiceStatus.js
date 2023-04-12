const Patient = require('../../models/patient');

async function updateServiceStatus (req, res) {

  try {

    const patientInDatabase = await Patient.findByPk(req.params.id)
    const currentStatus = patientInDatabase.service_status

    if (!patientInDatabase) {
      return res.status(404).json({message: `ID ${req.params.id} não encontrado.`})
    } else if (
      !['AGUARDANDO ATENDIMENTO', 'EM ATENDIMENTO', 'ATENDIDO', 'NÃO ATENDIDO'].includes(req.body.service_status)
      ) {
        return res.status(400).json({message: "Informe um status válido ('AGUARDANDO ATENDIMENTO', 'EM ATENDIMENTO', 'ATENDIDO', 'NÃO ATENDIDO')."})
    }

    let total_services = patientInDatabase.total_services
    if (currentStatus == 'EM ATENDIMENTO' && req.body.service_status == 'ATENDIDO') {
      total_services = total_services +1
    }

    patientInDatabase.set({
      service_status: req.body.service_status,
      total_services: total_services
    })

    await patientInDatabase.save()
    res.status(200).json(patientInDatabase)

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = updateServiceStatus;