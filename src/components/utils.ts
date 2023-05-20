export type RV = {
  id: string;
  name: string;
  address: string;
  gender: string;
  date: string;
  time: string;
  notes: string[];
  returnDate: string;
  returnTime: string;
};

export const uid = () => {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36)
  );
};
