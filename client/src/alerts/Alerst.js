import React from "react";

function Alerst() {
  return (
    <div>
      <div class="alert simple-alert">
        <h3>Simple Alert Message</h3>
        <a class="close">&times;</a>
      </div>

      <div class="alert success-alert">
        <h3>Success Alert Message</h3>
        <a class="close">&times;</a>
      </div>

      <div class="alert danger-alert">
        <h3>Danger Alert Message</h3>
        <a class="close">&times;</a>
      </div>

      <div class="alert warning-alert">
        <h3>Warning Alert Message</h3>
        <a class="close">&times;</a>
      </div>
    </div>
  );
}

export default Alerst;
