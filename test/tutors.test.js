const Tutors = artifacts.require("./Tutors.sol");
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";


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


    /**
     * Verifies the amount paid to tutor is the exact amount deducted 
     * from student account
     */
    it("tution payment matches the change in balance for the student account", async () => {

        const TUTOR_ID = 1;
        const TUTOR_FEE = web3.utils.toWei("0.015");
        const balanceBefore = await web3.eth.getBalance(acc1);
        await instance.bookTutor(TUTOR_ID, {
            from: acc2,
            value: TUTOR_FEE,
        });
        const balanceAfter = await web3.eth.getBalance(acc1);
        assert.equal(balanceAfter - balanceBefore, TUTOR_FEE);
    });

    /**
     * Verifies that the list of available tutors is consistent after call to setAvailability
     */
    it("testing availability status change is consistent", async () => {

        let before_avail_tids = await instance.availableTutorIds();
        before_avail_tids = before_avail_tids.toString().split(',');

        await instance.setAvailability(false, { from: acc1 });
        var after_avail_tids = await instance.availableTutorIds();
        after_avail_tids = after_avail_tids.toString().split(',');

        assert.equal(before_avail_tids.length, after_avail_tids.length + 1);
        assert.isTrue(before_avail_tids.includes('1'));
        assert.isFalse(after_avail_tids.includes('1'));

        await instance.setAvailability(true, { from: acc1 });
        after_avail_tids = await instance.availableTutorIds();
        after_avail_tids = after_avail_tids.toString().split(',');

        assert.equal(before_avail_tids.length, after_avail_tids.length);
        assert.isTrue(before_avail_tids.includes('1'));
        assert.isTrue(after_avail_tids.includes('1'));


    });

    /**
     * Verifies that deleteBooking is correct
     */
    it("testing deleteBooking API is consistent", async () => {

        let before_avail_tids = await instance.availableTutorIds();
        before_avail_tids = before_avail_tids.toString().split(',');

        const TUTOR_ID = 1;
        const TUTOR_FEE = web3.utils.toWei("0.015");
        const balanceBefore = await web3.eth.getBalance(acc1);
        await instance.bookTutor(TUTOR_ID, {
            from: acc2,
            value: TUTOR_FEE,
        });

        var after_avail_tids = await instance.availableTutorIds();
        after_avail_tids = after_avail_tids.toString().split(',');


        assert.equal(before_avail_tids.length, after_avail_tids.length + 1);
        assert.isTrue(before_avail_tids.includes('1'));
        assert.isFalse(after_avail_tids.includes('1'));

        await instance.deleteBooking(TUTOR_ID, {
            from: acc2,
        });
        after_avail_tids = await instance.availableTutorIds();
        after_avail_tids = after_avail_tids.toString().split(',');
        assert.equal(before_avail_tids.length, after_avail_tids.length);
        assert.isTrue(before_avail_tids.includes('1'));
        assert.isTrue(after_avail_tids.includes('1'));
    });


    /**
      * Verifies that signups is correct
      */
    it("testing getSignups API is correct", async () => {

        let before_signup_tids = await instance.getSignups({ from: acc1 });
        before_signup_tids = before_signup_tids.toString().split(',');

        const TUTOR_ID = 2;
        const TUTOR_FEE = web3.utils.toWei("0.002");

        await instance.bookTutor(TUTOR_ID, {
            from: acc1,
            value: TUTOR_FEE,
        });

        var after_signup_tids = await instance.getSignups({ from: acc1 });
        after_signup_tids = after_signup_tids.toString().split(',');

        assert.isFalse(before_signup_tids.includes('2'));
        assert.isTrue(after_signup_tids.includes('2'));

        await instance.deleteBooking(TUTOR_ID, {
            from: acc1,
        });
        after_signup_tids = await instance.getSignups({ from: acc1 });

        after_signup_tids = after_signup_tids.toString().split(',');
        assert.equal(before_signup_tids.length, after_signup_tids.length);
        assert.isFalse(after_signup_tids.includes('2'));

    });


});
