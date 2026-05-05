import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFileInvoiceDollar } from "react-icons/fa";
import styles from "./Quotes.module.scss";
import { getAllJobs } from "../../api/services/job/jobApi";

type Quote = {
  account?: {
    id?: string;
    displayName?: string;
    accountNumber?: string;
  };
  jobNumber?: string;
  jobStatus?: { name: string };
  primaryInsured?: { displayName: string };
  primaryLocation?: { displayName: string };
  _related?: {
    account?: {
      id?: string;
      displayName?: string;
      accountNumber?: string;
    };
    primaryInsured?: {
      firstName?: string;
      lastName?: string;
      companyName?: string;
    };
    primaryLocation?: { postalCode?: string };
  };
};

const Quotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    const sampleQuotes: Quote[] = [
      {
        account: {
          id: "ACC-001",
          displayName: "John Smith Insurance",
          accountNumber: "ACC-12345",
        },
        jobNumber: "JOB-2026-001",
        jobStatus: { name: "Draft" },
        primaryInsured: { displayName: "John Smith" },
        primaryLocation: { displayName: "123 Main St, New York, NY 10001" },
        _related: {
          primaryInsured: {
            firstName: "John",
            lastName: "Smith",
            companyName: "Smith Enterprises",
          },
          primaryLocation: { postalCode: "10001" },
        },
      },
      {
        account: {
          id: "ACC-002",
          displayName: "Sarah Johnson Corp",
          accountNumber: "ACC-12346",
        },
        jobNumber: "JOB-2026-002",
        jobStatus: { name: "Active" },
        primaryInsured: { displayName: "Sarah Johnson" },
        primaryLocation: { displayName: "456 Oak Ave, Los Angeles, CA 90001" },
        _related: {
          primaryInsured: {
            firstName: "Sarah",
            lastName: "Johnson",
            companyName: "Johnson & Co",
          },
          primaryLocation: { postalCode: "90001" },
        },
      },
      {
        account: {
          id: "ACC-003",
          displayName: "Mike Chen Services",
          accountNumber: "ACC-12347",
        },
        jobNumber: "JOB-2026-003",
        jobStatus: { name: "Pending" },
        primaryInsured: { displayName: "Mike Chen" },
        primaryLocation: { displayName: "789 Pine Rd, Chicago, IL 60601" },
        _related: {
          primaryInsured: {
            firstName: "Mike",
            lastName: "Chen",
            companyName: "Chen Industries",
          },
          primaryLocation: { postalCode: "60601" },
        },
      },
      {
        account: {
          id: "ACC-004",
          displayName: "Emma Williams LLC",
          accountNumber: "ACC-12348",
        },
        jobNumber: "JOB-2026-004",
        jobStatus: { name: "Completed" },
        primaryInsured: { displayName: "Emma Williams" },
        primaryLocation: { displayName: "321 Elm St, Houston, TX 77001" },
        _related: {
          primaryInsured: {
            firstName: "Emma",
            lastName: "Williams",
            companyName: "Williams Group",
          },
          primaryLocation: { postalCode: "77001" },
        },
      },
    ];

    setQuotes(sampleQuotes);
    setFilteredQuotes(sampleQuotes);
  }, []);

  const handleSearch = () => {
    const filtered = quotes.filter((item) => {
      return (
        (firstName
          ? item._related?.primaryInsured?.firstName
              ?.toLowerCase()
              .includes(firstName.toLowerCase())
          : true) &&
        (lastName
          ? item._related?.primaryInsured?.lastName
              ?.toLowerCase()
              .includes(lastName.toLowerCase())
          : true) &&
        (companyName
          ? item._related?.primaryInsured?.companyName
              ?.toLowerCase()
              .includes(companyName.toLowerCase())
          : true) &&
        (zipCode
          ? item._related?.primaryLocation?.postalCode?.includes(zipCode)
          : true)
      );
    });

    setFilteredQuotes(filtered);
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setCompanyName("");
    setZipCode("");
    setFilteredQuotes(quotes);
  };

  //   useEffect(() => {

  //     const fetchJobs = async () => {
  //       try {
  //         const response = await getAllJobs();
  //         const data = response.data as Quote[];
  //         //console.log('First item:', data[0]);
  //         setQuotes(data);
  //         setFilteredQuotes(data);
  //       } catch (error) {
  //         console.error('Error fetching quotes:', error);
  //       }
  //     };

  //     fetchJobs();
  //   }, []);

  //   const handleSearch = () => {
  //     const filtered = quotes.filter((item) => {
  //       return (
  //         (firstName
  //           ? item._related?.primaryInsured?.firstName
  //               ?.toLowerCase()
  //               .includes(firstName.toLowerCase())
  //           : true) &&
  //         (lastName
  //           ? item._related?.primaryInsured?.lastName
  //               ?.toLowerCase()
  //               .includes(lastName.toLowerCase())
  //           : true) &&
  //         (companyName
  //           ? item._related?.primaryInsured?.companyName
  //               ?.toLowerCase()
  //               .includes(companyName.toLowerCase())
  //           : true) &&
  //         (zipCode
  //           ? item._related?.primaryLocation?.postalCode?.includes(zipCode)
  //           : true)
  //       );
  //     });

  //     setFilteredQuotes(filtered);
  //   };

  // Reset filters and show all quotes
  //   const handleReset = () => {
  //     setFirstName('');
  //     setLastName('');
  //     setCompanyName('');
  //     setZipCode('');
  //     setFilteredQuotes(quotes);
  //   };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          <FaFileInvoiceDollar size={40} /> Quotes
        </h1>
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
            />
            <input
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              placeholder='Company Name'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
              placeholder='Zip Code'
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className={styles.buttonRow}>
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleReset}>Reset</button>
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
                      id: row.account?.id || row._related?.account?.id,
                      displayName:
                        row.account?.displayName ||
                        row._related?.account?.displayName,
                      accountNumber:
                        row.account?.accountNumber ||
                        row._related?.account?.accountNumber,
                    }}>
                    {row.account?.accountNumber ||
                      row._related?.account?.accountNumber ||
                      "N/A"}
                  </Link>
                </td>
                <td>{row.jobNumber}</td>
                <td>{row.jobStatus?.name}</td>
                <td>{row.primaryInsured?.displayName}</td>
                <td>{row.primaryLocation?.displayName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Quotes;
