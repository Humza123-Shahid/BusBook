import React, { useState,useEffect,useContext } from 'react';
import destinationContext from '../context/destinationContext'
import iconImage from '../images/wallet.png';
import { FaDollarSign , FaTicketAlt} from 'react-icons/fa';

import { Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
  
} from 'chart.js';
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer, 
  Cell
} from "recharts";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartDataLabels
);





const Dashboard = () => {
  const [uCount,setUCount]=useState(0);
  const [bookingsCount,setBookingsCount]=useState(0);
  const [paymentAmount,setPaymentAmount]=useState(0);
  //const [startDate, setStartDate] = useState(new Date());
  const [chartData, setChartData] = useState({});
  
    const [chartData2, setChartData2] = useState([]);
//     const pieData = [
//   { name: 'Group A', value: 400, percent:30, color: '#0088FE' },
//   { name: 'Group B', value: 300, percent:25, color: '#00C49F' },
//   { name: 'Group C', value: 300, percent:25, color: '#FFBB28' },
//   { name: 'Group D', value: 200, percent:25, color: '#FF8042' },
// ];
 const [pieData,setPieData] = useState([]);
//     const dataValues = [100, 100, 100];
//     const labels = ["Bookings", "Expences", "Profit"];
//     const colors = ["#FF6384", "#36A2EB", "#FFCE56"];
//     const total = dataValues.reduce((sum, val) => sum + val, 0);
// const data = {
//     labels: labels,
//     datasets: [
//       {
//         data: dataValues,
//         backgroundColor: colors,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const label = context.label || "";
//             const value = context.raw;
//             const percentage = ((value / total) * 100).toFixed(1); // Format to one decimal place
//             return `${label}: ${percentage}%`;
//           },
//         },
//       },
//       legend: {
//         display: true,
//         position: "right",
//       },
//     },
//   };

  const chartData3=[];
  const context=useContext(destinationContext);
    const {destinations,getDestinations,getDestinationbyId}=context;
//   const options = {
//   scales: {
//     x: {
//       barThickness: 12, // Set a fixed width of 12 pixels
//       maxBarThickness: 20 // Ensure it doesn't exceed 20px   
//     }
//   }
// };
const [filter, setFilter] = useState("today");
  const [customDates, setCustomDates] = useState({ start: "", end: "" });
const [filter2, setFilter2] = useState("today");
  const [customDates2, setCustomDates2] = useState({ start: "", end: "" });
  // Sample data
const chartData4 = [
  { name: "Jan", sales: 4000, profit: 2400, info: "New Year High" },
  { name: "Feb", sales: 3000, profit: 1398, info: "Mid-Winter Dip" },
  { name: "Mar", sales: 2000, profit: 9800, info: "Q1 Close Boom" },
  { name: "Apr", sales: 2780, profit: 3908, info: "Spring Lift" },
  { name: "May", sales: 1890, profit: 4800, info: "Holiday Season Prep" },
  { name: "Jun", sales: 2390, profit: 3800, info: "Mid-Year Steady" },
  { name: "Jul", sales: 3490, profit: 4300, info: "Summer Peak" },
];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
 const handleFilter2Change = (e) => {
    setFilter2(e.target.value);
  };
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setCustomDates((prev) => ({ ...prev, [name]: value }));
  };
  const handleDate2Change = (e) => {
    const { name, value } = e.target;
    setCustomDates2((prev) => ({ ...prev, [name]: value }));
  };
 useEffect(() => {
      if(filter=='today')
      {
        const startDate=new Date();
        const start_date=startDate;
        const endDate=new Date();
        const end_date=endDate;
        loadData(start_date,end_date);

      }
      else if(filter=='lastWeek')
      {
        const startDate=new Date();
        const previousWeek = new Date(startDate);
        previousWeek.setDate(startDate.getDate() - 7); 
        //const start_date=startDate.getDate()-7;
        const endDate=new Date();
        const end_date=endDate;
        console.log(previousWeek);
        loadData(previousWeek,end_date);

      }
      else if(filter=='lastMonth')
      {
        const startDate=new Date();
       const previousMonth = new Date(startDate);
        previousMonth.setDate(startDate.getDate() - 30); 
        //const start_date=startDate;
        const endDate=new Date();
        const end_date=endDate;
        loadData(previousMonth,end_date);

      }
  }, [filter]);
  useEffect(() => {
      if(filter2=='today')
      {
        const startDate=new Date();
        const start_date=startDate;
        const endDate=new Date();
        const end_date=endDate;
        loadData4(start_date,end_date);

      }
      else if(filter2=='lastWeek')
      {
        const startDate=new Date();
        const previousWeek = new Date(startDate);
        previousWeek.setDate(startDate.getDate() - 7); 
        //const start_date=startDate.getDate()-7;
        const endDate=new Date();
        const end_date=endDate;
        console.log(previousWeek);
        loadData4(previousWeek,end_date);

      }
      else if(filter2=='lastMonth')
      {
        const startDate=new Date();
       const previousMonth = new Date(startDate);
        previousMonth.setDate(startDate.getDate() - 30); 
        //const start_date=startDate;
        const endDate=new Date();
        const end_date=endDate;
        loadData4(previousMonth,end_date);

      }
  }, [filter2]);
  const getPreviousYearMonths = () => {
      const result = [];
      const currentDate = new Date();
      
      // 1. Calculate the date one year ago (approximately)
      // We'll use the *current* date, but one year prior.
      const oneYearAgo = new Date(currentDate);
      oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
      
      // Start date for the loop is the 1st day of the month one year ago.
      const currentMonthStart = new Date(
          oneYearAgo.getFullYear(), 
          oneYearAgo.getMonth(), 
          1
      );

      // Loop for 12 months (or until the current month is reached)
      // We want to capture 12 full months + the partial current month if applicable.
      let loopDate = new Date(currentMonthStart);
      
      // The loop runs for 12 full months.
      for (let i = 0; i < 12; i++) {
        // Start date is already set to the 1st of the month
        const monthStartDate = new Date(loopDate);
        
        // Calculate the end date: Move to the *next* month and then set the day to 0 (the day *before* the 1st).
        const monthEndDate = new Date(loopDate.getFullYear(), loopDate.getMonth() + 1, 0);

        result.push({
          monthName: monthStartDate.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
          startDate: monthStartDate.toISOString().split('T')[0], // YYYY-MM-DD
          endDate: monthEndDate.toISOString().split('T')[0],     // YYYY-MM-DD
        });

        // Move to the next month for the next iteration
        loopDate.setMonth(loopDate.getMonth() + 1);
      }

      return result;
    };
    const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // payload[0].payload contains the entire data object for the hovered point
    const dataPoint = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px",
          boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <p className="label">{`Month: ${label}`}</p>
        <p
          className="payments"
          style={{ color: payload[0].color }}
        >{`Payments: ${dataPoint.payment}`}</p>
        
      </div>
    );
  }

  return null;
};
const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name}: ${payload[0].value}`}</p>
        {/* <p className="intro">{`Percentage:${payload[0].percent}%`}</p> */}
      </div>
    );
  }
  return null;
};
   useEffect(() => {
    
    
      //  if(customDates.end=="")
      //  {
      //   setCustomDates(prev => ({
      //     ...prev, // Copy all existing properties from prevUser
      //     end: customDates.start  // Update the 'name' property
      //   }))
      //  }
      //  else if(customDates.start="")
      //  {
      //   //setCustomDates(start=customDates.end);
      //   //customDates.end=customDates.start;
      //    setCustomDates(prev => ({
      //     ...prev, // Copy all existing properties from prevUser
      //     start: customDates.end // Update the 'name' property
      //   }))
      //  }
      console.log('start:'+customDates.start+'end:'+customDates.end)
      const parts = customDates.start.split('-');
      const day = parseInt(parts[2], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[0], 10);
      const newstartDate =new Date(year, month - 1, day);
      //  const newstartDate = new Date(customDates.start); // Create a new Date object to avoid direct state mutation
    newstartDate.setHours(0); // Set hours to 10 AM
    newstartDate.setMinutes(0); // Set minutes to 30
    newstartDate.setSeconds(0); // Set seconds to 0
    newstartDate.setMilliseconds(0); // Set milliseconds to 0

     const parts2 = customDates.end.split('-');
      const day2 = parseInt(parts2[2], 10);
      const month2 = parseInt(parts2[1], 10);
      const year2 = parseInt(parts2[0], 10);
      const newendDate =new Date(year2, month2 - 1, day2);
    //const newendDate = new Date(customDates.end); // Create a new Date object to avoid direct state mutation
    newendDate.setHours(23); // Set hours to 10 AM
    newendDate.setMinutes(59); // Set minutes to 30
    newendDate.setSeconds(59); // Set seconds to 0
    newendDate.setMilliseconds(999); 
    //setDateOnly(newDate);
       //loadData(customDates.start,customDates.end);
       loadData(newstartDate,newendDate);
    }, [customDates]);
      useEffect(() => {
      console.log('start:'+customDates2.start+'end:'+customDates2.end)
       const newstartDate = new Date(customDates2.start); // Create a new Date object to avoid direct state mutation
    newstartDate.setHours(0); // Set hours to 10 AM
    newstartDate.setMinutes(0); // Set minutes to 30
    newstartDate.setSeconds(0); // Set seconds to 0
    newstartDate.setMilliseconds(0); // Set milliseconds to 0
    const newendDate = new Date(customDates2.end); // Create a new Date object to avoid direct state mutation
    newendDate.setHours(0); // Set hours to 10 AM
    newendDate.setMinutes(0); // Set minutes to 30
    newendDate.setSeconds(0); // Set seconds to 0
    newendDate.setMilliseconds(0); 
    //setDateOnly(newDate);
       //loadData(customDates2.start,customDates2.end);
       loadData4(newstartDate,newendDate);
    }, [customDates2]);
const getDestinationById = (id) => destinations.find(d => d._id === id);
  const loadData = async (start_date,end_date) => {
    try {
                    //const res = await axios.get(`/api/data?startDate=${startDate}&endDate=${endDate}`);
                    // Process data for Chart.js
                  //  const start_date=startDate;
                  //  const endDate=new Date();
                  //  const end_date=endDate;
                   //end_date.setDate(end_date.getDate() + 1);
                    start_date.setUTCHours(0, 0, 0, 0); 
                    end_date.setUTCHours(0, 0, 0, 0)

                    const response=await fetch("http://localhost:5000/api/routes/fetchroutesbydate",{
                      method:'GET',
                      headers:{
                          'Content-Type':'application/json',
                          'auth-token':localStorage.getItem('token'),
                          'start_date':start_date,
                          'end_date':end_date
                      },
                    });
                    const json=await response.json()
                    console.log(json.allRoutes);
                    const values = [];
                    const labels=[];
                    for (const route of json.allRoutes) {
                      //const startDestination=getDestinationById(route.start_destination_id)
                      // const endDestination=getDestinationById(route.end_destination_id)
                      const startDestination=await getDestinationbyId(route.start_destination_id)
                    const endDestination=await getDestinationbyId(route.end_destination_id)

                      //labels.push(route.start_destination_id+'-'+route.end_destination_id);
                     // labels.push(startDestination.name+'-'+endDestination.name);
                      labels.push(startDestination.name+'-'+endDestination.name);

                      const loadData2 = async () => {
                      const response2=await fetch("http://localhost:5000/api/bookings/fetchbookingsbyrouteid",{
                      method:'GET',
                      headers:{
                          'Content-Type':'application/json',
                          'auth-token':localStorage.getItem('token'),
                          'routeID':route._id
                      },
                    });
                    const json2=await response2.json()
                    values.push(json2.bookingsCount)
                  }
                  await loadData2();
                  }
                  
                    // const labels1 = res.data.map(item => new Date(item.timestamp).toLocaleDateString());
                    // const values1 = res.data.map(item => item.value);

                    setChartData({
                        labels: labels,
                        datasets: [{
                            label: 'All Bookings Count',
                            data: values,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            barThickness: 100,
                            maxBarThickness: 120, 
                        }]
                    });
                    
                } catch (err) {
                    console.error(err);
                }
  }
    const loadData4 = async (start_date,end_date) => {
    try {
                    //const res = await axios.get(`/api/data?startDate=${startDate}&endDate=${endDate}`);
                    // Process data for Chart.js
                  //  const start_date=startDate;
                  //  const endDate=new Date();
                  //  const end_date=endDate;
                    start_date.setUTCHours(0, 0, 0, 0); 
                    end_date.setUTCHours(0, 0, 0, 0)
                    const response=await fetch("http://localhost:5000/api/bookings/fetchbookingpaymentsbydatefilter",{
                      method:'GET',
                      headers:{
                          'Content-Type':'application/json',
                          'auth-token':localStorage.getItem('token'),
                          'startDate':start_date,
                          'endDate':end_date
                      },
                    });
                    const json=await response.json()
                    console.log(json);
                    //const setPayment=json.totalPayment;
                    // let newObject = { name: "Bookings",
                    //   value: json.totalPayment,color:'#0088FE'};
                    // setPieData([newObject]);

                    const response2=await fetch("http://localhost:5000/api/expences/fetchexpencesbydatefilter",{
                      method:'GET',
                      headers:{
                          'Content-Type':'application/json',
                          'auth-token':localStorage.getItem('token'),
                          'startDate':start_date,
                          'endDate':end_date
                      },
                    });
                    const json2=await response2.json()
                    //const setPayment=json.totalPayment;
                    // let newObject2 = { name: "Expences",
                    //   value: json2.totalExpences,color:'#FF8042'};
                    //setPieData(prev => [...prev, newObject2]);
                    const ProfitAmount=json.totalPayment-json2.totalExpences;
                    let newObject = [{ name: "Bookings",
                      value: json.totalPayment,color:'#0088FE',percent:50},{ name: "Expences",
                      value: json2.totalExpences,color:'#FF8042',percent:50},{ name: "Profit",
                      value: ProfitAmount,color:'#00C49F',percent:50}];
                    setPieData(newObject);
                    
                } catch (err) {
                    console.error(err);
                }
  }
  useEffect(() => {
          const fetchData = async () => {
          //const result = await getQuizzes(); // Call context function
          //const result = await getQuestionsbyId();
        //   const currDate=new Date();
        //   const yesterday = new Date(currDate);
        //   yesterday.setDate(currDate.getDate() - 6);
        let today = new Date();
        let dayOfMonth = today.getDate();
        let dayBeforeYesterday = new Date(today.setDate(dayOfMonth - 0)); 
       
               const year = dayBeforeYesterday.getFullYear();
                const month = (dayBeforeYesterday.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
                const day = dayBeforeYesterday.getDate().toString().padStart(2, '0');
                const dateStringDashes = `${year}-${month}-${day}`; 
          const response2=await fetch("http://localhost:5000/api/bookings/fetchbookingsbydate",{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token'),
                'booking_date':dateStringDashes
            },
          });
          const json2=await response2.json()
          setBookingsCount(json2.bookingsCount);
          setPaymentAmount(json2.totalSum)
          const result2 = await getDestinations();
          //setMyData(result);                     // Set state in same file
        };
    
        fetchData();
        const startDate=new Date();
        const start_date=startDate;
        const endDate=new Date();
        const end_date=endDate;
         loadData(start_date,end_date);
         loadData4(start_date,end_date);
         const fetchData2 = async () => {
         const monthResult=getPreviousYearMonths();
          for (const result of monthResult) {
            console.log("abc23");
            const loadData3 = async () => {
              console.log("abc567");
                      const response=await fetch("http://localhost:5000/api/bookings/fetchbookingpaymentsbymonth",{
                      method:'GET',
                      headers:{
                          'Content-Type':'application/json',
                          'auth-token':localStorage.getItem('token'),
                          'startDate':result.startDate,
                          'endDate':result.endDate
                      },
                    });
                    const json=await response.json()
                    console.log(json.totalPayment)
                    const setPayment=json.totalPayment;
                    let newObject = { month: result.monthName,
                      payment: json.totalPayment};
                    //chartData2 = [...chartData2, newObject];
                    // chartData3 = [...chartData2];
                    // chartData3.push({
                    //   month: result.monthName,
                    //   payment: json.totalPayment
                    // });
                    setChartData2(prev => [...prev, newObject]);
                    //console.log(chartData2);
                    //values.push(json.bookingsCount)
          }
          await loadData3();
        }
      }
      fetchData2();
         
        }, []); 
  useEffect(() => {
        // allSeats.forEach((element,index) => {
        //                     setAllStringSeats(allSeats[index].join(","))
        //                    })
        console.log(chartData2);
    }, [chartData2]);
  return(
  <div className="container-fluid p-4">
    <h2>Welcome, Admin!</h2>
    <div className="row mt-4">
      <div className="col-md-4 mb-3">
        <div className="card text-black border border-3 border-primary firstCard" style={{borderRadius:'1rem'}}>
          {/* <img src={iconImage} alt="Card Icon" className="card-icon" /> */}
           <div className="container2">
          <div className="card-body">
            <h5 className="card-title">{bookingsCount}</h5>
            <p className="card-text">Bookings</p>
          </div>
          <div style={{ 
      backgroundColor: '#EBEBEB', 
      padding: '10px',
      margin: '10px',  
      borderRadius: '50%', 
      width:'12%',
      height:'50%' // Ensures the div wraps the icon tightly
    }}>
          <FaTicketAlt size={24} color="blue"/>
          </div>
          </div>
          <div className='mini-chart' style={{paddingBottom: "10px"}}>
            <div className="chart-bar" style={{height: "60%"}}></div>
            <div className="chart-bar" style={{height: "40%"}}></div>
            <div className="chart-bar" style={{height: "80%"}}></div>
            <div className="chart-bar" style={{height: "65%"}}></div>
            <div className="chart-bar" style={{height: "75%"}}></div>

          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        {/* <div className="card text-white bg-success">
          <div className="card-body">
            <h5 className="card-title">{paymentAmount}</h5>
            <p className="card-text">Total Payments</p>
          </div>
          
        </div> */}
         <div className="card text-black border border-3 border-success secondCard " style={{borderRadius:'1rem'}}>
          {/* <img src={iconImage} alt="Card Icon" className="card-icon" /> */}
           <div className="container2">
          <div className="card-body">
            <h5 className="card-title2">{paymentAmount}</h5>
            <p className="card-text">Total Payments</p>
          </div>
          <div style={{ 
      backgroundColor: '#EBEBEB', 
      padding: '10px',
      margin: '10px',  
      borderRadius: '50%', 
      width:'12%',
      height:'50%' // Ensures the div wraps the icon tightly
    }}>
          <FaDollarSign size={24} color="green"/>
          </div>
          </div>
          <div className='mini-chart' style={{paddingBottom: "10px"}}>
            <div className="chart-bar" style={{height: "60%"}}></div>
            <div className="chart-bar" style={{height: "40%"}}></div>
            <div className="chart-bar" style={{height: "80%"}}></div>
            <div className="chart-bar" style={{height: "65%"}}></div>
            <div className="chart-bar" style={{height: "75%"}}></div>

          </div>
        </div>
      </div>
      {/* <div className="col-md-4 mb-3">
        <div className="card text-white bg-warning">
          <div className="card-body">
            <h5 className="card-title">{quizCount}</h5>
            <p className="card-text">Quizzes</p>
          </div>
        </div>
      </div> */}
    </div>
      <div className="chart-header">
        <div className="filter-container">
          <select value={filter2} onChange={handleFilter2Change}>
            <option value="today">Today</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="custom">Custom</option>
          </select>

          {filter2 === "custom" && (
            <div className="date-range">
              <input
                type="date"
                name="start"
                value={customDates2.start}
                onChange={handleDate2Change}
              />
              <input
                type="date"
                name="end"
                value={customDates2.end}
                onChange={handleDate2Change}
              />
            </div>
          )}
        </div>
      </div>
    {/* <div >
      <div style={{ width: '100%', height: '600px', padding:'5px'}} className="pie-chart-container">
          {data.labels &&  <Pie data={data} options={options} />}
      </div>
    </div> */}
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 500 }}>
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={180}
            fill="#8884d8"
            label
          >
            {/* Map colors from data */}
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          
          {/* 🎯 Tooltip for the Pie Chart */}
          <Tooltip content={<CustomPieTooltip />} /> 
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
      <div className="chart-header">
        <div className="filter-container">
          <select value={filter} onChange={handleFilterChange}>
            <option value="today">Today</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="custom">Custom</option>
          </select>

          {filter === "custom" && (
            <div className="date-range">
              <input
                type="date"
                name="start"
                value={customDates.start}
                onChange={handleDateChange}
              />
              <input
                type="date"
                name="end"
                value={customDates.end}
                onChange={handleDateChange}
              />
            </div>
          )}
        </div>
      </div>
    <div >
      <div style={{ width: '100%', height: '600px', padding:'5px'}}>
          {chartData.labels && <Bar  data={chartData}/>}
      </div>
    </div>
    <div style={{ width: '100%', height: '600px',marginTop:'50px' }}>
      <h3>Yearly Payments Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData2}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          {/* Grid lines */}
          <CartesianGrid strokeDasharray="3 3" /> 
          
          {/* X-Axis for the months */}
          <XAxis dataKey="month" />
          
          {/* Y-Axis for the values */}
          <YAxis />
          
          {/* The key component for showing hover data */}
          {/* Alternatively, use <Tooltip /> for the default style */}
          <Tooltip content={<CustomTooltip />} /> 
          {/* Legend to identify the lines */}
          <Legend /> 
          
          {/* First Line: Sales */}
          <Line 
            type="monotone" 
            dataKey="payment" 
            stroke="#8884d8" 
            strokeWidth={3}
            dot={true} // Explicitly shows the data points (dots)
            activeDot={{ r: 8 }} // Enlarge the dot on hover
            
          />
          
          {/* Second Line: Profit */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

)};

export default Dashboard;
