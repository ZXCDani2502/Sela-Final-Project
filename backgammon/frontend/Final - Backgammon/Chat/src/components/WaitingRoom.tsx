import { Heading, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
interface Chat {
  joinChat: (userName: string | undefined, chatRoom: string | undefined) => void;
}
export const WaitingRoom = ({joinChat} : Chat) => {
    const [userName, setUserName] = useState<string>()
    const [chatRoom, setChatRoom] = useState<string>()

    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        joinChat(userName, chatRoom);
    }
  return (
    <form onSubmit={onSubmit} className="max-w-sm w-full bg-white p-8 rounded shadow-lg">
      <Heading>Global Room</Heading>
      <div className="mb-4">
        <Text fontSize={"sm"}>Enter your name</Text>
        <Input name="userName"  onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name" className="w-full mt-2"/>
      </div>
      <div className="mb-4">
        <Text fontSize={"sm"}>Enter your chat room</Text>
         <Input name="chatRoom" onChange={(e) => setChatRoom(e.target.value)}  placeholder="Enter your name" className="w-full mt-2"/>
      </div>
        <Button colorScheme="blue" type="submit" className="w-full">
            Join Room
        </Button>
    </form>
  );
};
