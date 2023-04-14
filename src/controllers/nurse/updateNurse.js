const Nurse = require('../../models/nurse');

async function updateNurse (req, res) {

  const genderOptions = ['M', 'F'];

  try {
    const cpf_numb = req.body.cpf.replace(/\D/g,'')
    const phone_numb = req.body.phone_number.replace(/\D/g,'')

    const nurseInDatabase = await Nurse.findByPk(req.params.id)

    if (!nurseInDatabase) {
      return res.status(404).json({message: `ID ${req.params.id} não encontrado.`})
    } else if (
      !req.body.full_name ||
      !req.body.date_of_birth ||
      !cpf_numb ||
      !req.body.formation_institution ||
      !req.body.cofen_uf_registry
      ) {
        return res.status(400).json({message: "Os campos 'Full Name', 'Date of Birth', 'CPF' e 'Formation Institution' e 'COFEN/UF Registry' são obrigatórios."})

    } else if (!genderOptions.includes(req.body.gender.toUpperCase())) {
      return res.status(400).json({message: "O campo 'Gender' deve ser 'M' ou 'F'."})
    }

    nurseInDatabase.set({
      full_name: req.body.full_name || nurseInDatabase.full_name,
      gender: req.body.gender || nurseInDatabase.gender,
      date_of_birth: req.body.date_of_birth || nurseInDatabase.date_of_birth,
      cpf: cpf_numb || nurseInDatabase.cpf,
      phone_number: phone_numb || nurseInDatabase.phone_number,
      formation_institution: req.body.formation_institution || nurseInDatabase.formation_institution,
      cofen_uf_registry: req.body.cofen_uf_registry || nurseInDatabase.cofen_uf_registry
    })

    await nurseInDatabase.save()
    res.status(200).json(nurseInDatabase)

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = updateNurse;