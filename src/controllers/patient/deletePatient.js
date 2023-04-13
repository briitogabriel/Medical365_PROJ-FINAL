const Patient = require('../../models/patient');

async function deletePatient (req, res) {

  try {
    const patientId = req.params.id

    const patientInDatabase = await Patient.findByPk(patientId);
    if (!patientInDatabase) {
      return res.status(404).json({message: `Paciente com ID ${patientId} não encontrado.`})
    }
    
    await patientInDatabase.destroy();

    res.status(204).json();

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = deletePatient;