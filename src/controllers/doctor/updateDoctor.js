const Doctor = require('../../models/doctor');

async function updateDoctor (req, res) {

  const genderOptions = ['M', 'F'];
  const specializationOptions = ['Clínico Geral', 'Anestesia', 'Dermatologia', 'Ginecologia', 'Neurologia', 'Pediatra', 'Psiquiatria', 'Ortopedia'];

  try {
    if (!req.body.cpf) {
      return res.status(400).json({message: "Informe um CPF válido."})
    }
    const cpf_numb = req.body.cpf.replace(/\D/g,'')
    
    const doctorInDatabase = await Doctor.findByPk(req.params.id)
    
    if (!doctorInDatabase) {
      return res.status(404).json({message: `ID ${req.params.id} não encontrado.`})
    } else if (
      !req.body.full_name ||
      !req.body.date_of_birth ||
      !cpf_numb ||
      !req.body.formation_institution ||
      !req.body.crm_uf_registry ||
      !req.body.specialization
      ) {
        return res.status(400).json({message: "Os campos 'Full Name', 'Date of Birth', 'CPF' e 'Formation Institution', 'CRM/UF Registry' e 'Specialization' são obrigatórios."})

    } else if (!genderOptions.includes(req.body.gender.toUpperCase())) {
      return res.status(400).json({message: "O campo 'Gender' deve ser 'M' ou 'F'."})
  
    } else if (!specializationOptions.includes(req.body.specialization)) {
      return res.status(400).json({message: "Especializações válidas: 'Clínico Geral', 'Anestesia', 'Dermatologia', 'Ginecologia', 'Neurologia', 'Pediatra', 'Psiquiatria', 'Ortopedia'."})
    }
    const phone_numb = req.body.phone_number.replace(/\D/g,'')

    doctorInDatabase.set({
      full_name: req.body.full_name || doctorInDatabase.full_name,
      gender: req.body.gender || doctorInDatabase.gender,
      date_of_birth: req.body.date_of_birth || doctorInDatabase.date_of_birth,
      cpf: cpf_numb || doctorInDatabase.cpf,
      phone_number: phone_numb || doctorInDatabase.phone_number,
      formation_institution: req.body.formation_institution || doctorInDatabase.formation_institution,
      crm_uf_registry: req.body.crm_uf_registry || doctorInDatabase.crm_uf_registry,
      specialization: req.body.specialization || doctorInDatabase.specialization
    })

    await doctorInDatabase.save()
    res.status(200).json(doctorInDatabase)

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = updateDoctor;