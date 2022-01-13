// const Rentals = artifacts.require("./Rentals.sol");

// module.exports = function (deployer) {
//   deployer.deploy(Rentals);
// };

const Tutors = artifacts.require("./Tutors.sol");

module.exports = function (deployer) {
  deployer.deploy(Tutors);
};
