const Tutors = artifacts.require("./Tutors.sol");

module.exports = function (deployer) {
  deployer.deploy(Tutors);
};
