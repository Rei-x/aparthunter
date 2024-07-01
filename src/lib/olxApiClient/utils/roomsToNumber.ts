type RoomNumber = "one" | "two" | "three" | "four";

export const isRoomNumber = (room: unknown): room is RoomNumber => {
  if (typeof room !== "string") {
    return false;
  }

  return ["one", "two", "three", "four"].includes(room);
};

export const roomsToNumber = (rooms: string | null | undefined) => {
  if (!isRoomNumber(rooms)) {
    return undefined;
  }

  switch (rooms) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
  }
};
