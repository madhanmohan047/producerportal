import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Quotes.module.scss";
import { getAllJobs } from "../../api/services/job/jobApi";

// Type based on the API
type Quote = {
  account?: {
    _id?: string;
    accountNumber?: string;
    displayName?: string;
  };

  jobNumber?: string;

  jobStatus?: {
    code?: string;
    name?: string;
  };

  primaryInsured?: {
    type?: { code?: string };
    firstName?: string;
    lastName?: string;
    companyName?: string;
  };

  primaryAddress?: {
    addressLine1?: string;
    city?: string;
    state?: { code?: string };
    postalCode?: string;
    country?: { code?: string };
  };
};

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Fetching the data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        const data = response.data as Quote[];

        setQuotes(data);
        setFilteredQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchJobs();
  }, []);

  const getPrimaryInsuredName = (row: Quote) => {
    const insured = row.primaryInsured;

    if (!insured) return "N/A";

    if (insured.type?.code === "person") {
      return `${insured.firstName ?? ""} ${insured.lastName ?? ""}`.trim();
    }

    return insured.companyName || "N/A";
  };

  const getAddress = (row: Quote) => {
    const addr = row.primaryAddress;

    if (!addr) return "N/A";
    return [
      addr.addressLine1,
      addr.city,
      addr.state?.code,
      addr.postalCode,
      addr.country?.code,
    ]
      .filter(Boolean)
      .join(", ");
  };

  // Reset
  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setCompanyName("");
    setZipCode("");
    setFilteredQuotes(quotes);
  };

  const handleSearch = () => {
    const fName = firstName.trim().toLowerCase();
    const lName = lastName.trim().toLowerCase();
    const comp = companyName.trim().toLowerCase();
    const zip = zipCode.trim().toLowerCase();

    const filtered = quotes.filter((item) => {
      const insured = item.primaryInsured;
      const address = item.primaryAddress;

      const first = insured?.firstName?.toLowerCase() || "";
      const last = insured?.lastName?.toLowerCase() || "";
      const company = insured?.companyName?.toLowerCase() || "";
      const postal = address?.postalCode?.toLowerCase() || "";

      const matchesFirst =
        !fName || first.includes(fName) || company.includes(fName);
      const matchesLast =
        !lName || last.includes(lName) || company.includes(lName);
      const matchesCompany =
        !comp ||
        company.includes(comp) ||
        first.includes(comp) ||
        last.includes(comp);
      const matchesZip = !zip || postal.includes(zip);
      console.log(
        "Print",
        matchesCompany,
        matchesFirst,
        matchesLast,
        matchesZip,
      );

      return matchesFirst && matchesLast && matchesCompany && matchesZip;
    });

    setFilteredQuotes(filtered);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Quotes</h1>
      </div>

      <div className={styles.card}>
        <h2>Quote List</h2>

        <div className={styles.filterSection}>
          <h4>Filter By</h4>

          <div className={styles.filterGrid}>
            <input
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />

            <input
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />

            <input
              placeholder='Company Name'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />

            <input
              placeholder='Zip Code'
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </div>

          <div className={styles.buttonRow}>
            <button className={styles.button} onClick={handleSearch}>
              Search
            </button>
            <button className={styles.button} onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Job Number</th>
              <th>Status</th>
              <th>Primary Insured</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {filteredQuotes.map((row, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to='/AccountDetails'
                    state={{
                      id: row.account?._id,
                      displayName: row.account?.displayName,
                      accountNumber: row.account?.accountNumber,
                    }}>
                    {row.account?.accountNumber || "N/A"}
                  </Link>
                </td>

                <td>{row.jobNumber || "N/A"}</td>

                <td>{row.jobStatus?.name || "N/A"}</td>

                <td>{getPrimaryInsuredName(row)}</td>

                <td>{getAddress(row)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Quotes;
