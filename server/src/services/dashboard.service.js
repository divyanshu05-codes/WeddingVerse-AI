const weddingRepository = require("../repositories/wedding.repository");
const guestRepository = require("../repositories/guest.repository");
const vendorRepository = require("../repositories/vendor.repository");
const budgetRepository = require("../repositories/budget.repository");

const getDashboardData = async (userId) => {
  // Get only weddings belonging to logged-in user
  const weddings = await weddingRepository.findAllByOwner(userId);

  let totalGuests = 0;
  let totalVendors = 0;
  let totalExpenses = 0;
  let totalBudget = 0;

  const weddingSummary = await Promise.all(
    weddings.map(async (wedding) => {
      const weddingId = wedding._id;

      const [guests, vendors, expenses] =
        await Promise.all([
          guestRepository.findAllByWedding(weddingId),
          vendorRepository.getVendorsByWedding(weddingId),
          budgetRepository.findAllByWedding(weddingId),
        ]);

      const weddingBudget = Number(
        wedding.estimatedBudget || 0
      );

      const weddingExpenses = expenses.reduce(
        (sum, expense) =>
          sum + Number(expense.amount || 0),
        0
      );

      const remainingBudget =
        weddingBudget - weddingExpenses;

      totalGuests += guests.length;
      totalVendors += vendors.length;
      totalExpenses += weddingExpenses;
      totalBudget += weddingBudget;

      return {
        _id: wedding._id,
        bride: wedding.bride,
        groom: wedding.groom,
        weddingDetails: wedding.weddingDetails,

        estimatedBudget: weddingBudget,

        totalGuests: guests.length,
        totalVendors: vendors.length,
        totalExpenses: weddingExpenses,
        remainingBudget,

        status: wedding.status,
      };
    })
  );

  return {
    totalWeddings: weddings.length,
    totalGuests,
    totalVendors,
    totalExpenses,
    totalBudget,
    totalRemaining: totalBudget - totalExpenses,
    weddings: weddingSummary,
  };
};

module.exports = {
  getDashboardData,
};