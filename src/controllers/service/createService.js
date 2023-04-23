const Doctor = require('../../models/doctor');
const Patient = require('../../models/patient');
const Service = require('../../models/service');

async function createService (req, res) {

  try {
    if (
      !req.body.doctor_id ||
      !req.body.patient_id
      ) {
        return res.status(400).json({message: "Os campos 'Doctor ID' e 'Patient ID' são obrigatórios."})
    }

    const doctorInDatabase = await Doctor.findOne({ where: { id: req.body.doctor_id } });
    const patientInDatabase = await Patient.findOne({ where: { id: req.body.patient_id } });
    
    if (!doctorInDatabase) {
      return res.status(404).json({message: `Médico não encontrado.`})

    } else if (!patientInDatabase) {
      return res.status(404).json({message: `Paciente não encontrado.`})
    } else if (doctorInDatabase.system_status === 'Inativo') {
      return res.status(404).json({message: `Médico inativo, selecione um ID ativo no sistema.`})
    }

    let doctor_services = doctorInDatabase.total_services + 1;
    doctorInDatabase.set({
      total_services: doctor_services
    });
    await doctorInDatabase.save();

    let patient_services = patientInDatabase.total_services + 1;
    patientInDatabase.set({
      service_status: 'ATENDIDO',
      total_services: patient_services
    });
    await patientInDatabase.save();

    const serviceData = {
      doctor_id: req.body.doctor_id,
      patient_id: req.body.patient_id
    }

    const newService = await Service.create(serviceData);

    res.status(200).json({
      newService,
      doctorInDatabase,
      patientInDatabase
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = createService;