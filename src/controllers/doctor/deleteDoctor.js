const Doctor = require('../../models/doctor');

async function deleteDoctor (req, res) {

  try {
    const doctorId = req.params.id

    const doctorInDatabase = await Doctor.findByPk(doctorId);
    if (!doctorInDatabase) {
      return res.status(404).json({message: `Médico com ID ${doctorId} não encontrado.`})
    }
    
    await doctorInDatabase.destroy();

    res.status(204).json();

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = deleteDoctor;