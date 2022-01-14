// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Tutors is Ownable {
    /// @dev Tracks tutor IDs. Next tutor that is registered gets the current value of tutorIdCounter id.
    uint256 private tutorIdCounter = 1;

    /// enum indicating status of a tutor
    /// NotAvailable - tutor is offline and cannot be booked
    /// Tutor is already booked and is freedup only after the signup is closed
    /// Available - any student can book a session with this tutor
    enum Status {
        Available,
        Booked,
        NotAvailable
    }

    /// information captured for each tutor upon their registration
    struct Tutor {
        uint256 tutorId;
        string name;
        uint256 hourlyRate;
        Status status;
        address payable account;
        string subject;
        string description;
        string imgUrl;
    }

    /// @notice List of all tutor ids.
    /// @dev Used as a helper when iterating available tutors.
    uint256[] public idList;

    /// @notice idList length.
    /// @dev Used as a helper when iterating available tutors.
    uint256 public idListLength;

    /// @notice tutorid to tutor details struct
    mapping(uint256 => Tutor) public tutors;

    /// @notice address to tutor id mapping
    mapping(address => uint256) public tutorsByAddress;

    /// @notice tutorid -> is registered status
    mapping(uint256 => bool) public tutorsRegistered;

    /// @notice tutor_id -> student address
    mapping(uint256 => address) public bookings;

    /// @notice Emitted when a tutor is added to the service
    /// @param tutor tutor id
    /// @param name tutor name
    /// @param hourlyrate tutor's hourly rate
    /// @param account tutor's ETH address where payments will be deposited
    event LogTutorAdded(
        uint256 indexed tutor,
        string indexed name,
        uint256 hourlyrate,
        address account
    );

    /// @notice Emitted when a tutor is booked by a student
    /// @param tutor tutor id
    /// @param student address of student who made the booking
    event LogTutorBooked(uint256 indexed tutor, address indexed student);

    /// @notice event emitted when booking is removed (session completed or cancelled)
    /// @param tutorId booking was made with this tutor
    /// @param student booking was made by this student
    event LogDeleteBooking(uint256 indexed tutorId, address indexed student);

    /// @notice event emitted when availability status of tutor changes
    /// @param tutor address
    /// @param isAvail status
    event LogAvailabilityChange(address indexed tutor, bool isAvail);

    /// @notice modifier to check if tutor is available
    /// @param id : tutor id
    modifier isTutorAvailable(uint256 id) {
        require(
            tutorsRegistered[id] && tutors[id].status == Status.Available,
            "This tutor is not available."
        );
        _;
    }

    /// @notice modifier to check the payment matches tutor's hourlyrate
    /// @param id : tutorid
    modifier isExactPayment(uint256 id) {
        require(
            tutorsRegistered[id] && tutors[id].hourlyRate == msg.value,
            "Please pay exact tuition amount."
        );
        _;
    }

    constructor() {}

    /// @notice API to return list of tutor objects containing all details about tutors (to be shown on UI)
    function getTutors() public view returns (Tutor[] memory) {
        Tutor[] memory _tutors = new Tutor[](idListLength);
        for (uint256 i = 0; i < idListLength; i++) {
            _tutors[i] = tutors[idList[i]];
        }
        return _tutors;
    }

    /// @notice API that allows users to register as tutors with the smart contract
    /// @param _name  name of the tutor
    /// @param _account wallet address of tutor (not taking from msg.sender to allow 3rdarty to register tutors)
    /// @param _hourlyRate tutor rate in wei
    /// @param _subject Subjects tutor is willing to teach
    /// @param _description Other details about tutor (experience, education etc)
    /// @param _imgUrl UR for profile picture -- currently not used
    /// ideally we want only msg.sender to register but this allows
    /// easier testing and also some delegate to register a list of tutors
    function registerTutor(
        string memory _name,
        address _account,
        uint256 _hourlyRate,
        string memory _subject,
        string memory _description,
        string memory _imgUrl
    ) public {
        require(_account != address(0), "Address is 0");
        require(tutorsByAddress[_account] == 0, "Address already registered");
        uint256 newTutorId = tutorIdCounter;

        Tutor memory newTutor = Tutor({
            tutorId: newTutorId,
            name: _name,
            hourlyRate: _hourlyRate,
            status: Status.Available,
            account: payable(_account),
            subject: _subject,
            description: _description,
            imgUrl: _imgUrl
        });

        tutorIdCounter += 1;
        idList.push(newTutorId);
        idListLength = idList.length;
        tutors[newTutor.tutorId] = newTutor;
        tutorsRegistered[newTutor.tutorId] = true;
        tutorsByAddress[_account] = newTutorId;

        emit LogTutorAdded(
            newTutor.tutorId,
            newTutor.name,
            newTutor.hourlyRate,
            newTutor.account
        );
    }

    /// @notice Book a session with a tutor. Payment from msg should match hourlyrate of tutor
    /// and the tutor should be available
    /// @param tutorId unique id of the tutor (assigned when tutor is registered)
    function bookTutor(uint256 tutorId)
        public
        payable
        isTutorAvailable(tutorId)
        isExactPayment(tutorId)
    {
        Tutor storage _t = tutors[tutorId];
        _t.status = Status.Booked;
        address tutorAcc = _t.account;
        (bool success, ) = tutorAcc.call{value: msg.value}("");
        require(success, "Booking session with tutor failed.");
        bookings[tutorId] = msg.sender;
        emit LogTutorBooked(tutorId, msg.sender);
    }

    /// @notice internal function to return count of available tutors
    function _getAvailCount() internal view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < idListLength; i++) {
            if (tutors[idList[i]].status == Status.Available) {
                count++;
            }
        }
        return count;
    }

    /// @notice internal function to return count of signups for a student
    /// @param student student's wallet address
    function _getSignupCount(address student) internal view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < idListLength; i++) {
            if (bookings[idList[i]] == student) {
                count++;
            }
        }
        return count;
    }

    /// @notice Returns list of tutorIds who are available for sessions
    function availableTutorIds() external view returns (uint256[] memory) {
        uint256[] memory availIds = new uint256[](_getAvailCount());
        uint256 j = 0;
        for (uint256 i = 0; i < idListLength; i++) {
            if (tutors[idList[i]].status == Status.Available) {
                availIds[j] = idList[i];
                j++;
            }
        }
        return availIds;
    }

    /// @notice Allows tutors to block themselves from being signed up by students
    /// @param isAvail - boolean flag indicating what the new availability status should be
    function setAvailability(bool isAvail) public {
        uint256 _tutorId = tutorsByAddress[msg.sender];
        require(tutorsRegistered[_tutorId], "Tutor not registered");
        if (isAvail) {
            tutors[_tutorId].status = Status.Available;
        } else {
            tutors[_tutorId].status = Status.NotAvailable;
        }
        bookings[_tutorId] = address(0);
        emit LogAvailabilityChange(msg.sender, isAvail);
    }

    /// @notice Allows students to query for which tutors they have upcoming sessions with msg.sender is used to lookup signups
    function getSignups() public view returns (uint256[] memory) {
        address _student = msg.sender;
        uint256[] memory tutorIds = new uint256[](_getSignupCount(_student));
        uint256 j = 0;
        for (uint256 i = 0; i < idListLength; i++) {
            if (bookings[idList[i]] == _student) {
                tutorIds[j] = idList[i];
                j++;
            }
        }
        return tutorIds;
    }

    /// @notice Allows students to close tutor session
    /// @param tutorId msg.sender no longer needed tutorId (either session completed or cancelled)
    function deleteBooking(uint256 tutorId) external {
        require(tutorsRegistered[tutorId], "Tutor is not registered");
        require(
            bookings[tutorId] == msg.sender,
            "Tutor not assigned to student"
        );
        tutors[tutorId].status = Status.Available;
        bookings[tutorId] = address(0);
        emit LogDeleteBooking(tutorId, msg.sender);
    }

    /// @notice Essentially blocks a user in case of unacceptable behavior
    /// only to be done by contract owner. Probably a function better left
    /// for governance
    /// @param userAddr wallet address of the user who is to be blocked from using service
    function blockUser(address userAddr) public onlyOwner {
        /*
        To be implemented
        */
    }
}
