import { Request, Response } from 'express'

async function getReservationDetails() {
  try {
    // Add your code here
  } catch (error: any) {
    throw new Error(error.message);
  }
}

class ReservationController {
  async getReservations(req: Request, res: Response) {
    try{
      const reservations = await getReservationDetails();
      res.status(200).json(reservations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ReservationController;