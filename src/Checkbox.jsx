import React from "react";

const Checkbox = () => {
    <div>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={true}
            onChange={() => 0} />
        </label>
    </div>
}

export default Checkbox;