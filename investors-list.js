import React, { useState, useEffect, Component, Fragment } from "react";
import InvestorDataService from "../services/investor";
import "./Modal.css";
import "../App.css";
import ReactPaginate from "react-paginate";
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, FormGroup, FormControl, ControlLabel,Label,Input } from "react-bootstrap";



function InvestorsList () {
    const [investors, setInvestors] = useState([]);
    const [searchType, setSearchType ] = useState("");
    const [types, setTypes] = useState(["All Types"]);
    const [searchLocation, setSearchLocation ] = useState("");
    const [locations, setLocation ] = useState(["All Locations"]);
    const [searchIndustry, setSearchIndustry ] = useState("");
    const [industry, setIndustry ] = useState(["All Industries"]);
    const [searchInvestmentSize, setSearchInvestmentSize ] = useState("");
    const [investmentSize, setInvestmentSize ] = useState(["All-InvestmentSize"]);
    const [modalOpen, setModalOpen] = useState(false);
    const [investorFirm, setInvestorFirm] = useState(" ");
    const [investorTitle, setInvestorTitle] = useState(" ");
    const [investorType, setInvestorType] = useState(" ");
    const [investorLocation, setInvestorLocation] = useState(" ");
    const [investorDescription, setInvestorDescription] = useState(" ");
    const [investorSectors, setInvestorSectors] = useState(" ");
    const [investorInvestment, setInvestorInvestment] = useState(" ");
    const [pageCount, setPageCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [investorsCount, setInvestorsCount] = useState(0);
    const [searchText, setSearchText ] = useState("");
    
    useEffect(() => {
        console.log("\n\n\\useEffect\n\n\n")
        retrieveInvestors();
        retrieveTypes();
        retrieveLocations();
        retrieveIndustry();
        retrieveInvestmentSize();
    }, []);
    
    useEffect( () => {
        console.log(searchType)
        findByMultiple();
    }, [searchType, searchLocation, searchIndustry, searchInvestmentSize, 
        investorsCount, pageCount, pageNumber])

    useEffect( () => {
        const timeOutId = setTimeout(() => {
            setSearchText(searchText)
            findByMultiple();
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [searchText])
    
    const onChangePage = ({ selected }) => {
        setPageNumber(selected);
        console.log("page number\n"+pageNumber)
    }

    const onChangeSearchText = e => {
        const searchText = e.target.value;
        setSearchText(searchText);
        
    };

    const onChangeSearchType = e => {
        const searchType = e.target.value;
        if(e.target.value.length) {
            setSearchType(searchType);
            
        } else {
            setSearchType("search...");
        }
        
        // findByMultiple();
    };



    const onChangeSearchLocation = e => {
        const searchLocation = e.target.value;
        setSearchLocation(searchLocation);

    };



    const onChangeSearchIndustry = e => {
        const searchIndustry = e.target.value;
        setSearchIndustry(searchIndustry);
        // findByMultiple();
    };


    const onChangeSearchInvestmentSize = e => {
        const searchInvestmentSize = e.target.value;
        setSearchInvestmentSize(searchInvestmentSize);
        // findByMultiple();
    };
    
    
    const retrieveInvestors = () => {
        InvestorDataService.getAll()
        .then(response => {
            console.log(response.data);
            setInvestors(response.data.investors);
            
        })
        .catch(e => {
            console.log(e);
        });
    };
    
    const retrieveTypes = () => {
        InvestorDataService.getTypes()
        .then(response => {
            console.log(response.data);
            // console.log(types);
            setTypes(["All Types"].concat(response.data));
            
        })
        .catch(e => {
            console.log(e);
        });
    };

    const retrieveLocations = () => {
        InvestorDataService.getLocations()
        .then(response => {
            console.log(response.data);
            // console.log(locations);
            setLocation(["All Locations"].concat(response.data));
            
        })
        .catch(e => {
            console.log(e);
        });
    };

    const retrieveIndustry = () => {
        InvestorDataService.getIndustry()
        .then(response => {
            console.log(response.data);
            setIndustry(["All Industries"].concat(response.data));
            
        })
        .catch(e => {
            console.log(e);
        });
    };

    const retrieveInvestmentSize = () => {
        let investmentSizeArr = ["Under $1M", "$1M to $10M", "$10M to $100M","Above $100M"];
        setInvestmentSize(["All Investment Sizes"].concat(investmentSizeArr));
    };

    const refreshList = () => {
        retrieveInvestors();
    };

    const find = (query, by) => {
        InvestorDataService.find(query, by)
        .then(response => {
            console.log(response.data);
            setInvestors(response.data.investors);
        })
        .catch(e => {
            console.log(e);
        });
    };
    
    const findByType = () => {
        if (searchType === "All Types") {
            refreshList();
        } else {
            find(searchType, "type")
        }
    };

    const findByLocation = () => {
        if (searchLocation === "All Locations") {
            refreshList();
        } else {
            find(searchLocation, "location")
        }
    };
    
    const findByIndustry = () => {
        if (searchIndustry === "All Industries") {
            refreshList();
        } else {
            find(searchIndustry, "industry")
        }
    };

    const findByInvestmentSize = () => {
        if (searchInvestmentSize === "All Investment Sizes") {
            refreshList();
        } else {
            find(searchInvestmentSize, "investmentSize")
        }
    };

    const findByMultiple = (query, by, page) => {
        console.log("search text"+searchText.length+"end")
        query = [searchType, searchLocation, searchIndustry, searchInvestmentSize, searchText]
        by = ["type", "location", "industry", "investmentSize", "text"]
        page = pageNumber
        const searchTextNoSpaces = searchText.replace(/\s+/g, '')
        InvestorDataService.findMultiple(query, by, page)
            .then(response => {
                console.log(response.data);
                setInvestorsCount(response.data.total_results)
                setPageCount(Math.ceil(response.data.total_results / response.data.entries_per_page))
                console.log("number of investors\n"+response.data.total_results+" "+investorsCount)
                console.log(pageCount)
                setInvestors(response.data.investors);
            })
            .catch(e => {
                console.log(e);
            });
        
    }


    const Modal = ({ setOpenModal }) => {
        return (
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                                setModalOpen(false);
                            }}
                        >
                        X
                        </button>
                    </div>

                    <div className="title">
                        <h1>Overview</h1>
                        {/* Investor Name: {investor.Firm}<br/> */}
                    </div>

                    <div className="body">
                        Company name: {investorFirm}{"\n"}
                        Title: {investorTitle}{"\n"}
                        Type: {investorType}{"\n"}
                        Location: {investorLocation}{"\n"}
                        Description: {investorDescription}{"\n"}
                        Preferred Sectors: {investorSectors}{"\n"}
                        Preferred Investment Size: {investorInvestment}{"\n"}
                        {/* Preferred Investment Size: ${investorInvestmentMin}M - ${investorInvestmentMax}M{"\n"} */}
                    </div>

                    <div className="footer">
                        <button
                            onClick={() => {
                                setModalOpen(false);
                            }}
                            id="cancelBtn"
                        >
                        Cancel
                        </button>
                    </div>
                    
                </div>
            </div>
        );
      }



    return (

         <div>
              <div class="d-flex" id="wrapper">

            <div class="border-end bg-white" id="sidebar-wrapper">
                
                <div class="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
                <div class="list-group list-group-flush">
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Dashboard</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Shortcuts</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Overview</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Events</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Profile</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Status</a>
                </div>
                
                

                





            </div>
   
            <div id="page-content-wrapper">

                <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                     <div className="row pb-1">
                adsasd
             <div className="input-group col-lg">
                <input
                    type="text"
                    className="form-control"
                    placeholder="search..."
                    value={searchText}
                    onChange={onChangeSearchText}
                />
                
                </div> 

            <div className="input-group col-lg">
                <select onChange={onChangeSearchType}>
                    {types.map(type => {
                        return (
                        <option value={type}> {type} </option>
                        )
                    })}
                </select>
            </div>

            <div className="input-group col-lg">
                <select onChange={onChangeSearchLocation}>
                    {locations.map(location => {
                        return (
                        <option value={location}> {location} </option>
                    )
                    })}
                </select>
            </div>

            <div className="input-group col-lg">
                <select onChange={onChangeSearchIndustry}>
                    {industry.map(ind => {
                        return (
                        <option value={ind}> {ind} </option>
                        )
                    })}
                </select>
            </div>
            
            <div className="input-group col-lg">
                <select onChange={onChangeSearchInvestmentSize}>
                    {investmentSize.map(inv => {
                        return (
                        <option value={inv}> {inv} </option>
                        )
                    })}
                </select>
              
            </div>

            <div className="input-group col-lg">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByMultiple}
                    >
                    Search
                    </button>
            </div> 

            </div> 

                </nav>
  
                <div class="container-fluid">
                    <h1 class="mt-4">asdasds</h1>
                    <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
                    <p>
                        Make sure to keep all page content within the
                        <code>#page-content-wrapper</code>
                        . The top navbar is optional, and just for demonstration. Just create an element with the
                        <code>#sidebarToggle</code>
                        ID which will asdsadtoggle the menu when clicked.
                    </p>
                </div>
            </div>
        </div>
           

           
         

            
            <div className="row">
                {investors.map((investor) => {
                    return (
                        <div className="col-lg-4 pb-1">
                        <h5 className="card-title">
                            {investor.Firm}
                        </h5>
                        <button
                            className="openModalBtn"
                            onClick={() => {
                                setInvestorFirm(investor.Firm)
                                setInvestorTitle(investor.Title)
                                setInvestorType(investor.Type)
                                setInvestorLocation(investor.HQ)
                                setInvestorDescription(investor.Description)
                                setInvestorSectors(investor["Preferred Sectors"])
                                setInvestorInvestment(investor["Preferred Investment Size"])
                                setModalOpen(true)
                                Modal(modalOpen)

                            }}
                        >
                        view details
                        </button>

                  
                        </div>
                    );
                })}
            </div>




            {modalOpen && Modal(modalOpen)}


            <div className="App">
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={onChangePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
            </div>

        </div>
        
      )
}

export default InvestorsList;
