const Patient = require('../../models/patient');

async function updatePatient (req, res) {

  try {
    if (!req.body.cpf) {
      return res.status(400).json({message: "Informe um CPF válido."})
    }
    const cpf_numb = req.body.cpf.replace(/\D/g,'')

    const patientInDatabase = await Patient.findByPk(req.params.id)

    if (!patientInDatabase) {
      return res.status(404).json({message: `ID ${req.params.id} não encontrado.`})
    } else if (
      !req.body.full_name ||
      !req.body.date_of_birth ||
      !cpf_numb ||
      !req.body.emergency_contact
      ) {
        return res.status(400).json({message: "Os campos 'Full Name', 'Date of Birth', 'CPF' e 'Emergency contact' são obrigatórios."})
    }
    const phone_numb = req.body.phone_number.replace(/\D/g,'')

    patientInDatabase.set({
      full_name: req.body.full_name || patientInDatabase.full_name,
      gender: req.body.gender || patientInDatabase.gender,
      date_of_birth: req.body.date_of_birth || patientInDatabase.date_of_birth,
      cpf: cpf_numb || patientInDatabase.cpf,
      phone_number: phone_numb || patientInDatabase.phone_number,
      emergency_contact: req.body.emergency_contact || patientInDatabase.emergency_contact,
      allergies: req.body.allergies || patientInDatabase.allergies,
      special_cares: req.body.special_cares || patientInDatabase.special_cares,
      health_insurance: req.body.health_insurance || patientInDatabase.health_insurance
    })

    await patientInDatabase.save()
    res.status(200).json(patientInDatabase)

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = updatePatient;