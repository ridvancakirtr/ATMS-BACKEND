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
    getRezervationEmployee,
    getRezervationCustomer,
    updateVehicleOfRezervation,
    updateEmployeeOfRezervation
} = require('../controllers/rezervations');

const { protect } = require('../middleware/auth')

router.route('/').get(protect, getRezervations);
router.route('/:id').get(protect, getRezervation);
router.route('/').post(protect, createRezervation);
router.route('/:id').put(protect, updateRezervation);
router.route('/:id/vehicle').put(protect, updateVehicleOfRezervation);
router.route('/:id/employee').put(protect, updateEmployeeOfRezervation);
router.route('/:id').delete(protect, deleteRezervation);
router.route('/:agencyId/agency').get(protect, getRezervationAgency);
router.route('/:vehicleId/vehicle').get(protect, getRezervationVehicle);
router.route('/:employeeId/employee').get(protect, getRezervationEmployee);
router.route('/:customerId/customer').get(protect, getRezervationCustomer);
module.exports = router;