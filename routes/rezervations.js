const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    getRezervations,
    createRezervation,
    getRezervation,
    updateRezervation,
    deleteRezervation,
    getRezervationAgency,
    getRezervationVehicle,
    getRezervationEmployee
} = require('../controllers/rezervations');

const { protect } = require('../middleware/auth')

router.route('/').get(protect, getRezervations);
router.route('/:id').get(protect, getRezervation);
router.route('/').post(protect, createRezervation);
router.route('/:id').put(protect, updateRezervation);
router.route('/:id').delete(protect, deleteRezervation);

router.route('/:agencyId/agency').get(protect, getRezervationAgency);
router.route('/:vehicleId/vehicle').get(protect, getRezervationVehicle);
router.route('/:employeeId/employee').get(protect, getRezervationEmployee);

module.exports = router;