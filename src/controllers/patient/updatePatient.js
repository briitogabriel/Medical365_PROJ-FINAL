const Patient = require('../../models/patient');

async function updatePatient (req, res) {

  try {
    const cpf_numb = req.body.cpf.replace(/\D/g,'')
    const phone_numb = req.body.phone_number.replace(/\D/g,'')

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

    patientInDatabase.set({
      full_name: req.body.full_name,
      gender: req.body.gender,
      date_of_birth: req.body.date_of_birth,
      cpf: cpf_numb,
      phone_number: phone_numb,
      emergency_contact: req.body.emergency_contact,
      allergies: req.body.allergies,
      special_cares: req.body.special_cares,
      health_insurance: req.body.health_insurance
    })

    await patientInDatabase.save()
    res.status(200).json(patientInDatabase)

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = updatePatient;