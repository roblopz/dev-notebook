import { useState } from "react";

export default () => {
  const setDummyState = useState(0)[1];
  return () => setDummyState(s => ++s);
};