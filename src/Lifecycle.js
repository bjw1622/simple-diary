import { useEffect, useState } from "react";

const UnMountTest = () => {
  useEffect(() => {
    console.log("Mount!");

    return () => {
      console.log("UnMount!");
    };
  }, []);
  return <div>UnMount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible ? <UnMountTest></UnMountTest> : <></>}
    </div>
  );
};
export default Lifecycle;
