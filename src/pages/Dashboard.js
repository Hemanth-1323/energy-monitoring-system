/* import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import axios from "axios";
import styles from "./Dashboard.module.css";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [energyData, setEnergyData] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    axios
      .get("/api/energy-data")
      .then((response) => {
        setEnergyData(response.data);
      })
      .catch((error) => console.error("Error fetching energy data", error));
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out.");
      })
      .catch((error) => console.error("Logout Error", error));
  };

  const calculateTotalPower = () => {
    return energyData.reduce((total, day) => total + day.power, 0);
  };

  const filteredData = searchDate
    ? energyData.filter((day) => day.date === searchDate)
    : energyData;

  const chartData = {
    labels: filteredData.map((day) => day.date),
    datasets: [
      {
        label: "Power (kW)",
        data: filteredData.map((day) => day.power),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Voltage (V)",
        data: filteredData.map((day) => day.voltage),
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
      {
        label: "Current (A)",
        data: filteredData.map((day) => day.current),
        borderColor: "rgba(255,159,64,1)",
        fill: false,
      },
      {
        label: "Frequency (Hz)",
        data: filteredData.map((day) => day.frequency),
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1>Energy Monitoring Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </header>

      <div className={styles.dashboardContent}>
        <div className={styles.searchBox}>
          <label>Search by Date:</label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        <div className={styles.chartContainer}>
          <Line data={chartData} />
        </div>

        <p className={styles.totalPower}>
          Total Power Consumed: {calculateTotalPower()} kWh
        </p>
        <p className={styles.totalCost}>
          Total Cost: ₹{calculateTotalPower() * 5} (Rate: ₹5/kWh)
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
 */
/* 
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import axios from "axios";
import styles from "./Dashboard.module.css";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const mockData = [
  {
    date: "2024-10-01",
    current: 5.2,
    power: 1200,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-02",
    current: 4.8,
    power: 1100,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-03",
    current: 5.0,
    power: 1150,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-04",
    current: 6.1,
    power: 1500,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-05",
    current: 5.5,
    power: 1350,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-06",
    current: 4.9,
    power: 1120,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-07",
    current: 5.7,
    power: 1400,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-08",
    current: 5.3,
    power: 1250,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-09",
    current: 5.6,
    power: 1300,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-10",
    current: 4.7,
    power: 1100,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-11",
    current: 5.1,
    power: 1190,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-12",
    current: 6.0,
    power: 1550,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-13",
    current: 5.4,
    power: 1250,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-14",
    current: 5.8,
    power: 1450,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-15",
    current: 4.5,
    power: 1000,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-16",
    current: 5.9,
    power: 1400,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-17",
    current: 5.2,
    power: 1250,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-18",
    current: 4.8,
    power: 1100,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-19",
    current: 5.6,
    power: 1300,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-20",
    current: 5.0,
    power: 1150,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-21",
    current: 6.2,
    power: 1500,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-22",
    current: 5.3,
    power: 1250,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-23",
    current: 4.9,
    power: 1120,
    voltage: 230,
    frequency: 50,
  },
];

const Dashboard = () => {
  const [energyData, setEnergyData] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    // Simulating an API call with mock data
    const fetchData = async () => {
      try {
        // Uncomment this when the real API is ready
        // const response = await axios.get("/api/energy-data");
        // setEnergyData(response.data);

        // Using mock data instead for visualization
        setEnergyData(mockData);
      } catch (error) {
        console.error("Error fetching energy data", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out.");
      })
      .catch((error) => console.error("Logout Error", error));
  };

  const calculateTotalPower = () => {
    return energyData.reduce((total, day) => total + day.power, 0);
  };

  const filteredData = searchDate
    ? energyData.filter((day) => day.date === searchDate)
    : energyData;

  const chartData = {
    labels: filteredData.map((day) => day.date),
    datasets: [
      {
        label: "Power (W)",
        data: filteredData.map((day) => day.power),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Voltage (V)",
        data: filteredData.map((day) => day.voltage),
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
      {
        label: "Current (A)",
        data: filteredData.map((day) => day.current),
        borderColor: "rgba(255,159,64,1)",
        fill: false,
      },
      {
        label: "Frequency (Hz)",
        data: filteredData.map((day) => day.frequency),
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1>Energy Monitoring Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </header>

      <div className={styles.dashboardContent}>
        <div className={styles.searchBox}>
          <label>Search by Date:</label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        <div className={styles.chartContainer}>
          <Line data={chartData} />
        </div>

        <p className={styles.totalPower}>
          Total Power Consumed: {calculateTotalPower()} W
        </p>
        <p className={styles.totalCost}>
          Total Cost: ₹{((calculateTotalPower() * 5) / 1000).toFixed(2)} (Rate:
          ₹5/kWh)
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
 */

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import axios from "axios";
import styles from "./Dashboard.module.css";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const mockData = [
  {
    date: "2024-10-01",
    current: 5.2,
    power: 1200,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-02",
    current: 4.8,
    power: 1100,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-03",
    current: 5.0,
    power: 1150,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-04",
    current: 6.1,
    power: 1500,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-05",
    current: 5.5,
    power: 1350,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-06",
    current: 4.9,
    power: 1120,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-07",
    current: 5.7,
    power: 1400,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-08",
    current: 5.3,
    power: 1250,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-09",
    current: 5.6,
    power: 1300,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-10",
    current: 4.7,
    power: 1100,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-11",
    current: 5.1,
    power: 1190,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-12",
    current: 6.0,
    power: 1550,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-13",
    current: 5.4,
    power: 1250,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-14",
    current: 5.8,
    power: 1450,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-15",
    current: 4.5,
    power: 1000,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-16",
    current: 5.9,
    power: 1400,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-17",
    current: 5.2,
    power: 1250,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-18",
    current: 4.8,
    power: 1100,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-19",
    current: 5.6,
    power: 1300,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-20",
    current: 5.0,
    power: 1150,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-21",
    current: 6.2,
    power: 1500,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-22",
    current: 5.3,
    power: 1250,
    voltage: 230,
    frequency: 50,
  },
  {
    date: "2024-10-23",
    current: 4.9,
    power: 1120,
    voltage: 230,
    frequency: 50,
  },
];

const Dashboard = () => {
  const [energyData, setEnergyData] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Uncomment this when the real API is ready
        // const response = await axios.get("/api/energy-data");
        // setEnergyData(response.data);

        // Using mock data instead for visualization
        setEnergyData(mockData);
      } catch (error) {
        console.error("Error fetching energy data", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out.");
      })
      .catch((error) => console.error("Logout Error", error));
  };

  const calculateTotalPower = () => {
    return energyData.reduce((total, day) => total + day.power, 0);
  };

  const filteredData = searchDate
    ? energyData.filter((day) => day.date === searchDate)
    : energyData;

  const chartData = {
    labels: filteredData.map((day) => day.date),
    datasets: [
      {
        label: "Power (W)",
        data: filteredData.map((day) => day.power),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Voltage (V)",
        data: filteredData.map((day) => day.voltage),
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
      {
        label: "Current (A)",
        data: filteredData.map((day) => day.current),
        borderColor: "rgba(255,159,64,1)",
        fill: false,
      },
      {
        label: "Frequency (Hz)",
        data: filteredData.map((day) => day.frequency),
        borderColor: "rgba(54,162,235,1)",
        fill: false,
      },
    ],
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`${styles.dashboardContainer} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <header className={styles.dashboardHeader}>
        <h1>Energy Monitoring Dashboard</h1>
        <button onClick={toggleDarkMode} className={styles.toggleButton}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </header>

      <div className={styles.dashboardContent}>
        <div className={styles.searchBox}>
          <label>Search by Date:</label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        <div className={styles.chartContainer}>
          <Line data={chartData} />
        </div>

        <p className={styles.totalPower}>
          Total Power Consumed: {calculateTotalPower()} W
        </p>
        <p className={styles.totalCost}>
          Total Cost: ₹{((calculateTotalPower() * 5) / 1000).toFixed(2)} (Rate:
          ₹5/kWh)
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
