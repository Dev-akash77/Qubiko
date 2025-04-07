import React from "react";
import Header_p from "./../UI/Header_p";
import ProDataJson from "../Data/Pro.json";
import ProData from "../UI/ProData";

const Pro = () => {
  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen md:border md:rounded-md cc">
        {/* Outer flex container needs full height */}
        <div className="h-full flex flex-col">
          {/* Sticky/fixed Header */}
         <div>
         <Header_p text="Upgrade to PRO!" logo={false} />
         </div>

          {/* Scrollable content */}
          <div className="grow overflow-auto px-4 py-2 pb-8">
            {ProDataJson.map((cur, id) => (
              <ProData key={id} data={cur} id={id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pro;
