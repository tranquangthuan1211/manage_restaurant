use('Restaurant');

const userId = '675c4c949329d57808e5e72e'; // Hong Phuc
const MAX_NUM_OF_PEOPLE = 8;
const MAX_QUANTITY = 10;
const SAMPLE_SIZE = 10;
const RESERVATION_COUNT = 5;

const menuItems = db.getCollection('menu').aggregate([{ $sample: { size: SAMPLE_SIZE } }]).toArray();
const dishIds = menuItems.map(item => item._id.toString());

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomReservationStatus() {
  const statuses = ['confirmed', 'pending', 'canceled'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function randomSpecialRequest() {
  const specialRequests = ['Window seat', 'Vegan meal', 'Birthday celebration', 'No garlic', 'No onion'];
  return specialRequests[Math.floor(Math.random() * specialRequests.length)];
}

function randomNumOfPeople() {
  return Math.floor(Math.random() * MAX_NUM_OF_PEOPLE) + 1;
}

function randomPreorders() {
  const num = Math.floor(Math.random() * MAX_QUANTITY);
  const preorders = [];
  for (let i = 0; i < num; i++) {
    preorders.push({ menuItemId: dishIds[Math.floor(Math.random() * dishIds.length)], quantity: Math.floor(Math.random() * MAX_QUANTITY) + 1 });
  }
  return preorders;
}

function randomReservation() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return {
    userId,
    date_time: randomDate(start, end).toISOString(),
    status: randomReservationStatus(),
    special_request: randomSpecialRequest(),
    num_of_people: randomNumOfPeople(),
    preorders: randomPreorders(),
    createAt: new Date().toISOString(),
  };
}

db.getCollection('reservations').insertMany(Array.from({ length: RESERVATION_COUNT }, randomReservation));