const Doctor = require('../../models/doctor');

async function findDoctor (req, res) {

  try {
    const statusParam = req.query.status
    const statusList = ['ATIVO', 'INATIVO'];

    if (statusParam) {
      if (!statusList.includes(statusParam.toUpperCase())) {
        return res.status(400).json({message: "Informe um status válido ('ATIVO', 'INATIVO') ou remova o campo para listar todos os status."})
      }

      const findFilteredDoctors = await Doctor.findAll({ where:
        { system_status: statusParam.charAt(0).toUpperCase() + statusParam.slice(1).toLowerCase() }
      });
      if (findFilteredDoctors.length == 0) {
        return res.status(404).json({message: `Nenhum médico com status '${statusParam.toUpperCase()}' encontrado.`})
      }
      return res.status(200).json(findFilteredDoctors);
    }

    const allDoctors = await Doctor.findAll();
    res.status(200).json(allDoctors);

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Não foi possível processar sua solicitação.'});
  }
}

module.exports = findDoctor;