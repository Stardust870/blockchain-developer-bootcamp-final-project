// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Tutors is Ownable {
    /// @dev Tracks tutor IDs. Next tutor that is registered gets the current value of tutorIdCounter id.
    uint256 private tutorIdCounter = 1;

    enum Status {
        Available,
        Booked,
        NotAvailable
    }

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

    mapping(uint256 => Tutor) public tutors;

    mapping(address => uint256) public tutorsByAddress;

    mapping(uint256 => bool) public tutorsRegistered;

    mapping(uint256 => address) public bookings; // tutor_id -> student address

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
    /// @param student students address
    event LogTutorBooked(uint256 indexed tutor, address indexed student);

    event LogDeleteBooking(uint256 indexed tutorId, address indexed student);

    event LogAvailabilityChange(address indexed tutor, bool isAvail);

    modifier isTutorAvailable(uint256 id) {
        require(
            tutorsRegistered[id] && tutors[id].status == Status.Available,
            "This tutor is not available."
        );
        _;
    }

    modifier isExactPayment(uint256 id) {
        require(
            tutorsRegistered[id] && tutors[id].hourlyRate == msg.value,
            "Please pay exact tuition amount."
        );
        _;
    }

    constructor() {}

    function getTutors() public view returns (Tutor[] memory) {
        Tutor[] memory _tutors = new Tutor[](idListLength);
        for (uint256 i = 0; i < idListLength; i++) {
            _tutors[i] = tutors[idList[i]];
        }
        return _tutors;
    }

    // ideally we want only msg.sender to register but this allows
    // easier testing and also some delegate to register a list of tutors
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

    function _getAvailCount() internal view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < idListLength; i++) {
            if (tutors[idList[i]].status == Status.Available) {
                count++;
            }
        }
        return count;
    }

    function _getSignupCount(address student) internal view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < idListLength; i++) {
            if (bookings[idList[i]] == student) {
                count++;
            }
        }
        return count;
    }

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
}
