const Patient = require('../../models/patient');

async function updateServiceStatus (req, res) {

  try {

    const patientInDatabase = await Patient.findByPk(req.params.id)

    if (!patientInDatabase) {
      return res.status(404).json({message: `ID ${req.params.id} não encontrado.`})
    } else if (
      !['AGUARDANDO ATENDIMENTO', 'EM ATENDIMENTO', 'NÃO ATENDIDO'].includes(req.body.service_status)
      ) {
        return res.status(400).json({message: "Informe um status válido ('AGUARDANDO ATENDIMENTO', 'EM ATENDIMENTO', 'NÃO ATENDIDO') ou acesse a rota 'POST/api/services' para registrar um atendimento efetuado."})
    }

    patientInDatabase.set({
      service_status: req.body.service_status
    })

    await patientInDatabase.save()
    res.status(200).json(patientInDatabase)

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = updateServiceStatus;