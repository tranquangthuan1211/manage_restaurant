import express from 'express';
import LeaveController from '../controllers/leave.controller';
const router = express.Router();

function useRouteLeave() {
    router.get('/', LeaveController.getLeaves);
    router.post('/', LeaveController.createLeave);
    router.put('/:id', LeaveController.updateLeave);
    router.delete('/:id', LeaveController.deleteLeave);
    return router;
}

export default useRouteLeave;