const User = require("../models/Userdata"); 
const Users = require("../models/User"); 
const OverallStat = require("../models/OverallStat.js");
const Transaction = require("../models/Transaction.js");
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.deleteCustomers = async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.send({ message: "User Deleted" });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
};

exports.updateCutomers = async (req, res) => {
  const { id, name, email, phoneNumber, occupation, role } = req.body;
  try {
    const updatedData = await Users.findByIdAndUpdate(
      id,
      { id, name, email, phoneNumber, occupation, role },
      { new: true }
    );
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getDashboardStats = async (req, res) => {
  try {
   
    const currentMonth = "November";
    const currentYear = 2023;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.createCutomers = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;

    const user = new Users({
      name,
      email,
      password,
      phoneNumber,
      role,
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
};
