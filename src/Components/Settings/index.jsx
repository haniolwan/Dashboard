import { useState } from "react";
import Tab from "../common/Tab";
import Home from "../Profile/Home";

const Settings = () => {
  const [nav, setNav] = useState(false);
  const [currentIndex, setIndex] = useState(0);

  const handleChange = (newIndex) => {
    setIndex(newIndex);
  };
  return (
    <>
      <Tab currentTab={currentIndex} onChange={handleChange}>
        <Tab.Container>
          <Tab.Navigation nav={nav} setNav={setNav}>
            <Tab.NavItem index={0} label={"Home"} path={"/home"} />
            {/* <Tab.NavItem index={1} label={"About"} path={"/about"} /> */}
            {/* <Tab.NavItem index={2} label={"services"} path={"/services"} /> */}
            {/* <Tab.NavItem index={3} label={"pricing"} path={"/pricing"} /> */}
          </Tab.Navigation>
          <Tab.ContentContainer>
            <Tab.ContentItem index={0}>
              <Home />
            </Tab.ContentItem>
            <Tab.ContentItem index={1}>
              <div>Hello From About</div>
            </Tab.ContentItem>
            <Tab.ContentItem index={2}>
              <div>Hello From Services</div>
            </Tab.ContentItem>
            <Tab.ContentItem index={3}>
              <div>Hello From Pricing</div>
            </Tab.ContentItem>
          </Tab.ContentContainer>
        </Tab.Container>
      </Tab>
    </>
  );
};

export default Settings;
