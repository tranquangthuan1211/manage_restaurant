import express from "express"
import AssessController from "../controllers/assess.controller"

const router = express.Router()

const useRouteAssess = () => {
    router.get('/', AssessController.getAssess)
    router.post('/', AssessController.createAssess)

    router.put('/:id', AssessController.updateAssess)
    router.delete('/:id', AssessController.deleteAssess)

    return router
}

export default useRouteAssess