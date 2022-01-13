const Tutors = artifacts.require("./Tutors.sol");
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

// const Status = {
//   VACANT: 0,
//   RENTED: 1,
//   NOT_AVAILABLE: 2,
// };
const ERR_TUTOR_UNAVAILABLE = "This tutor is not available.";
const ERR_EXACT_AMOUNT = "Please pay exact tuition amount.";
const ERR_NOT_OWNER = "Ownable: caller is not the owner";


const getErrorObj = (obj = {}) => {
    const txHash = Object.keys(obj)[0];
    return obj[txHash];
};


const addTutor1 = async (instance, acc, tx = {}) => {
    await instance.registerTutor(
        "Ann",
        acc,
        web3.utils.toWei("0.015"),
        "Buildings",
        "B.A. Architecture, 7 yrs experience",
        "https://site.com/p1.png",
        tx
    );
};

const addTutor2 = async (instance, acc, tx = {}) => {
    await instance.registerTutor(
        "Bob",
        acc,
        web3.utils.toWei("0.002"),
        "Math",
        "B.A. Math, M.A. Physics",
        "https://site.com/p2.png",
        tx
    );
};

contract("Tutors", function (accounts) {
    const [owner, acc1, acc2] = accounts;

    beforeEach(async () => {
        instance = await Tutors.new();
        await addTutor1(instance, acc1, { from: owner });
        await addTutor2(instance, acc2, { from: owner });
    });

    /**
       * Checks that the contract inherits OpenZeppelin Ownable by using owner()
       */
    it("should add first account as owner using OpenZeppelin Ownable", async () => {
        assert.strictEqual(await instance.owner(), owner);
    });


    /**
     * Attempt to add a tutor booking with the wrong rent amount.
     */
    it("should fail if payment is not exact", async () => {
        try {
            await instance.bookTutor(1, { value: web3.utils.toWei("0.001") });
        } catch (e) {
            const { error, reason } = getErrorObj(e.data);
            assert.equal(error, "revert");
            assert.equal(reason, ERR_EXACT_AMOUNT);
        }
    });

    /**
     * Attempt to add a tutor booking for a tutor not available.
     */
    it("should fail if tutor is not available", async () => {
        try {
            await instance.bookTutor(12, { value: web3.utils.toWei("0.05") });
        } catch (e) {
            const { error, reason } = getErrorObj(e.data);
            assert.equal(error, "revert");
            assert.equal(reason, ERR_TUTOR_UNAVAILABLE);
        }
    });


});
