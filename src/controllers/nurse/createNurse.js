const Nurse = require('../../models/nurse');

async function createNurse (req, res) {

  const genderOptions = ['M', 'F'];

  try {
    const cpf_numb = req.body.cpf.replace(/\D/g,'')
    const phone_numb = req.body.phone_number.replace(/\D/g,'')

    const nurseInDatabase = await Nurse.findOne({ where:
      { cpf: cpf_numb }
    })

    if (nurseInDatabase) {
      return res.status(409).json({message: `CPF ${req.body.cpf} já está cadastrado.`})
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

    const nurseData = {
      full_name: req.body.full_name,
      gender: req.body.gender,
      date_of_birth: req.body.date_of_birth,
      cpf: cpf_numb,
      phone_number: phone_numb,
      formation_institution: req.body.formation_institution,
      cofen_uf_registry: req.body.cofen_uf_registry
    }

    const newNurse = await Nurse.create(nurseData);
    res.status(201).json(newNurse);

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = createNurse;