import React, { useState } from "react";

const NewSubmission = () => {
  const [formData, setFormData] = useState({});

  const search = window.location.search;
  const params = new URLSearchParams(search);

  const accountId = params.get("accountId");
  const organizationCode = params.get("organizationCode");
  const organizationName = params.get("organizationName");
  const producerCode = params.get("producerCode");
  const producerName = params.get("producerName");

  const [LOB, setLOB] = useState(""); // Line of Business));
  const [selectedDate, setSelectedDate] = useState<string>("");

  return (
    <div>
      <h2>New Submission</h2>

      <div>
        <p>
          <strong>Account ID: </strong> {accountId}
        </p>

        <p>
          <strong>Organization: </strong> {organizationName} {organizationCode}
        </p>

        {/* <p>
          <strong>Organization Code: </strong> {organizationCode}
        </p> */}

        <p>
          <strong>Producer: </strong> {producerName} {producerCode}
        </p>

        {/* <p>
          <strong>Producer Code: </strong> {producerCode}
        </p> */}

        <p>
          <strong>State: </strong>
          {params.get("primaryLocation.state.name") || ""}
        </p>
      </div>
      <div>
        <h4>Line of Business</h4>

        <select value={LOB} onChange={(e) => setLOB(e.target.value)}>
          <option value="">-- Select Line of Business --</option>
          <option value="Personal Auto">Personal Auto</option>
          <option value="Personal Property">Personal Property</option>
          <option value="Commercial Auto">Commercial Auto</option>
          <option value="General Liability">General Liability</option>
        </select>
      </div>
      <div>
        <h4>Effective Date</h4>

        <input
          type="date"
          value={selectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NewSubmission;
