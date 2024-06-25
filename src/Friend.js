import React, { useState } from "react";
import { useEffect } from "react";
const initfriends = [
  {
    id: 1,
    name: "ramesh",
    balance: -20,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/619/142/small/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg",
  },
  {
    id: 2,
    name: "suresh",
    balance: 30,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/619/142/small/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg",
  },
  {
    id: 4,
    name: "ganesh",
    balance: 0,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/619/142/small/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg",
  },
];
export const Friend = () => {
  const [show, setbtn] = useState(false);
  // const [friends, setFriends] = useState(initfriends);
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem("friends")) || initfriends
  );
  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddfriends(friend) {
    setFriends((friends) => [...friends, friend]);
    setbtn(false);
  }

  const handleselectedfri = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setbtn(false);
  };
  function handlesplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  const handleDelete = (id) => {
    const updatetask = friends.filter((friend) => friend.id !== id);
    setFriends(updatetask);
  };
  return (
    <div>
      <div className="flex flew-row  justify-around mt-20 ">
        <div>
          <FriendsList
            friends={friends}
            onSelection={handleselectedfri}
            selectedFriend={selectedFriend}
            onDelete={handleDelete}
          />

          {show === true && <FormAddFriend onAddFriend={handleAddfriends} />}
          <div className=" flex flex-row justify-end">
            <div>
              {show === true && (
                <button
                  onClick={() => setbtn(false)}
                  className="bg-orange-600 font-bold rounded-lg py-2 px-5 mt-5 mb-5 hover:bg-orange-500"
                >
                  Close
                </button>
              )}
            </div>
            <div>
              {show === false && (
                <button
                  onClick={() => setbtn(true)}
                  className="bg-orange-600 font-bold rounded-lg py-2 px-5 mt-5 mb-5 hover:bg-orange-500 "
                >
                  Add friend
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div>
            {" "}
            {selectedFriend && (
              <Formsplitbill
                selectedFriend={selectedFriend}
                onSplitbill={handlesplitBill}
              />
            )}
          </div>

          <div className="mt-5 text-center bg-orange-200 text-black min-w-96">
            <div className="flex justify-around w-90 my-5 font-bold">
              <div className="bg-red-500 h-6 w-6"></div>
              <div className="capitalize">
                You have to pay money to your friend
              </div>
            </div>
            <div className="flex justify-around w-90 my-5 font-bold">
              <div className="bg-green-500 h-6 w-6"></div>
              <div className="capitalize">
                Your friend have to pay money to you{" "}
              </div>
            </div>
            <div className="flex justify-around w-90 my-5 font-bold">
              <div className="bg-gray-500 h-6 w-6 ml-1"></div>
              <div className="capitalize">
                No one has to pay money balance zero
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function FriendsList({ friends, onSelection, selectedFriend, onDelete }) {
  return (
    <ul className="list-none space-y-8 bg-orange-200  ">
      {friends.map((friend) => (
        <Friends
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function Friends({ friend, onSelection, selectedFriend, onDelete }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li
      className={
        isSelected
          ? "bg-orange-400 border-2 border-slate-800 transition-transform ease-in-out delay-150 hover:translate-y-2 hover:scale-110 duration-100 hover:bg-orange-300"
          : "border-2 border-slate-800 transition-transform ease-in-out delay-150 hover:translate-y-2 hover:scale-110 duration-100 hover:bg-orange-300"
      }
    >
      <div className="flex flex-row   p-2  ">
        <img
          src={friend.image}
          alt={friend.name}
          className="rounded-full w-12 h-12 "
        />
        <div className="flex flex-col w-80 ml-5">
          <h1 className="font-bold capitalize">{friend.name}</h1>
          <div>
            {friend.balance < 0 && (
              <p className="text-red-500">
                {" "}
                You owe {friend.name} <span>&#8377;</span>{" "}
                {Math.abs(friend.balance)}
              </p>
            )}
            {friend.balance > 0 && (
              <p className="text-green-500">
                {" "}
                {friend.name} owe You <span>&#8377;</span>{" "}
                {Math.abs(friend.balance)}
              </p>
            )}
            {friend.balance === 0 && (
              <p className="text-gray-500"> {friend.name} </p>
            )}
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="mt-1 mr-4 text-red-600 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => onDelete(friend.id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
          <div>
            <button
              className="bg-orange-600 hover:bg-orange-500 font-bold rounded-lg py-2 px-5"
              onClick={() => onSelection(friend)}
            >
              {isSelected ? "Close" : "Select"}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

const FormAddFriend = ({ onAddFriend }) => {
  const [useName, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  // Function to handle file selection
  const onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  // Function to handle canceling the selected file
  const handleCancel = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!useName || !selectedFile) return;

    const id = crypto.randomUUID(); // Generate a unique ID (you can use your preferred method)

    const newFriend = {
      image: filePreview, // Use the preview URL to display the image
      id: id,
      name: useName,
      balance: 0,
    };

    console.log(newFriend);
    onAddFriend(newFriend); // Call the parent component's function to add the new friend
    setName("");
    handleCancel(); // Clear the file input and preview
  };

  return (
    <div>
      <form
        className="bg-orange-200 mt-10 rounded-lg w-full py-4 px-5"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-around items-center">
          <div className="flex flex-col justify-start space-y-10 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                Friend Name
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                Image Upload
              </label>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-5 items-center">
            <div>
              <input
                type="text"
                className=" p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-[90%]"
                name="friendname"
                value={useName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" flex justify-center items-center h-10">
              <div className="absolute flex justify-center items-center">
                <label htmlFor="fileInput" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    />
                  </svg>
                </label>
              </div>
              <div className="relative">
                <input
                  type="file"
                  name="Image"
                  accept="image/*"
                  className="border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 hidden"
                  onChange={onchange}
                  id="fileInput"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center mt-5">
          <div className="pr-12">
            {filePreview && (
              <img
                src={filePreview}
                alt="Preview"
                className="max-w-10 h-10 transition-opacity duration-500 ease-in-out opacity-100"
              />
            )}
          </div>
          <div className="pr-14">
            {filePreview && (
              <button
                className=" bg-red-500 text-white rounded-lg h-8 mr-3"
                onClick={handleCancel}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            className="bg-orange-600 font-bold rounded-lg py-2 px-5 hover:bg-orange-500"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

function Formsplitbill({ selectedFriend, onSplitbill }) {
  const [bill, setBill] = useState("");
  const [paidbyuser, setPaidbyUser] = useState("");
  const paidbyfriend = bill ? bill - paidbyuser : "";
  const [whoisPay, setWhoIsPay] = useState("user");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidbyuser) return;
    onSplitbill(whoisPay === "user" ? paidbyfriend : -paidbyuser);
  };

  return (
    <form className="bg-orange-200 rounded-lg w-full " onSubmit={handlesubmit}>
      <div className=" w-full py-5 px-12 ">
        <div className="flex justify-center ">
          <h2 className="capitalize font-bold mt-5 mb-5 text-2xl">
            Split a bill with {selectedFriend.name}
          </h2>
        </div>

        <div className="flex flex-row  justify-around my-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mt-2 ">
            Bill value
          </label>
          <input
            type="text"
            className=" ml-8 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/2 text-center"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-row justify-around my-4">
          <label className="block text-sm font-medium text-gray-700 mt-2 ">
            Your expense
          </label>
          <input
            type="text"
            className="  p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/2 text-center"
            value={paidbyuser}
            onChange={(e) =>
              setPaidbyUser(
                Number(e.target.value) > bill
                  ? paidbyuser
                  : Number(e.target.value)
              )
            }
          />
        </div>
        <div className="flex flex-row  justify-around my-4">
          <label className="block text-sm font-medium text-gray-700  mt-2 ">
            {selectedFriend.name} expense
          </label>
          <input
            type="text"
            className="  p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/2 text-center"
            disabled
            value={paidbyfriend}
          />
        </div>
        <div className="flex flex-row  justify-around my-3">
          <label className="block text-sm font-medium text-gray-700  mt-2 ">
            Who is paying
          </label>
          <select
            className="w-1/2 h-8  rounded-lg text-center"
            value={whoisPay}
            onChange={(e) => setWhoIsPay(e.target.value)}
          >
            <option value="user">You</option>
            <option value="friend">{selectedFriend.name}</option>
          </select>
        </div>
        <div className="flex justify-end  mt-5 ">
          <button
            className="bg-orange-600 font-bold rounded-lg  w-1/2 mb-6 mr-5 py-1 hover:bg-orange-500"
            type="submit"
          >
            Split bill
          </button>
        </div>
      </div>
    </form>
  );
}
