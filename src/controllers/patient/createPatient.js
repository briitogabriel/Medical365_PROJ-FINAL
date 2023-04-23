const Patient = require('../../models/patient');

async function createPatient (req, res) {

  const genderOptions = ['M', 'F'];

  try {
    if (!req.body.cpf) {
      return res.status(400).json({message: "Informe um CPF válido."})
    }
    const cpf_numb = req.body.cpf.replace(/\D/g,'')

    const patientInDatabase = await Patient.findOne({ where:
      { cpf: cpf_numb }
    })

    if (patientInDatabase) {
      return res.status(409).json({message: `CPF ${req.body.cpf} já está cadastrado.`})

    } else if (
      !req.body.full_name ||
      !req.body.date_of_birth ||
      !cpf_numb ||
      !req.body.emergency_contact
      ) {
        return res.status(400).json({message: "Os campos 'Full Name', 'Date of Birth', 'CPF' e 'Emergency contact' são obrigatórios."})

    } else if (!genderOptions.includes(req.body.gender.toUpperCase())) {
      return res.status(400).json({message: "O campo 'Gender' deve ser 'M' ou 'F'."})
    }
    
    const phone_numb = req.body.phone_number.replace(/\D/g,'')

    const patientData = {
      full_name: req.body.full_name,
      gender: req.body.gender,
      date_of_birth: req.body.date_of_birth,
      cpf: cpf_numb,
      phone_number: phone_numb,
      emergency_contact: req.body.emergency_contact,
      allergies: req.body.allergies,
      special_cares: req.body.special_cares,
      health_insurance: req.body.health_insurance
    }

    const newPatient = await Patient.create(patientData);
    res.status(201).json(newPatient);

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = createPatient;