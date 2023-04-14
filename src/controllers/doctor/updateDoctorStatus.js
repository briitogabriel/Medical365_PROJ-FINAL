const Doctor = require('../../models/doctor');

async function updateDoctorStatus (req, res) {

  try {

    const doctorInDatabase = await Doctor.findByPk(req.params.id)

    if (!doctorInDatabase) {
      return res.status(404).json({message: `ID ${req.params.id} não encontrado.`})
    } else if (
      !['Ativo', 'Inativo'].includes(req.body.system_status)
      ) {
        return res.status(400).json({message: "Informe um status válido ('Ativo' ou 'Inativo')."})
    }

    doctorInDatabase.set({
      system_status: req.body.system_status
    })

    await doctorInDatabase.save()
    res.status(200).json(doctorInDatabase)

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = updateDoctorStatus;