import React, { useState, useEffect, Component, Fragment } from "react";
import InvestorDataService from "../services/investor";
import "./Modal.css";

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
    const [investorInvestmentMin, setInvestorInvestmentMin] = useState(" ");
    const [investorInvestmentMax, setInvestorInvestmentMax] = useState(" ");

    
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
    }, [searchType])
    
    const onChangeSearchType = e => {
        const searchType = e.target.value;
        setSearchType(searchType);
        // findByMultiple();
    };

    useEffect( () => {
        console.log(searchLocation)
        findByMultiple();
    }, [searchLocation])

    const onChangeSearchLocation = e => {
        const searchLocation = e.target.value;
        setSearchLocation(searchLocation);
        // console.log(searchLocation)
        // findByMultiple();
        // if (searchLocation === "All Locations") {
        //     refreshList();
        // } else {
        //     find(searchLocation, "location")
        // }
    };

    useEffect( () => {
        console.log(searchIndustry)
        findByMultiple();
    }, [searchIndustry])

    const onChangeSearchIndustry = e => {
        const searchIndustry = e.target.value;
        setSearchIndustry(searchIndustry);
        // findByMultiple();
    };

    useEffect( () => {
        console.log(searchInvestmentSize)
        findByMultiple();
    }, [searchInvestmentSize])

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
        // InvestorDataService.getInvestmentSize()
        // .then(response => {
        //     console.log(response.data);
        //     setInvestmentSize(["All Investment Sizes"].concat(response.data));
            
        // })
        // .catch(e => {
        //     console.log(e);
        // });
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

    const findByMultiple = (query, by) => {
        query = [searchType, searchLocation, searchIndustry, searchInvestmentSize]
        by = ["type", "location", "industry", "investmentSize"]
        if (searchType == "All Types" && searchLocation == "All Locations" 
        && searchIndustry == "All Industries" && searchInvestmentSize == "All Investment Sizes") {
            refreshList();
        } else {
            InvestorDataService.findMultiple(query, by)
            .then(response => {
                console.log(response.data);
                setInvestors(response.data.investors);
            })
            .catch(e => {
                console.log(e);
            });
        }
        
        console.log(searchLocation)
        // findMultiple([searchType, searchLocation, searchIndustry], 
        //         ["type", "location", "industry"])
    }

    // const findMultiple = (query, by) => {
    //     InvestorDataService.findMultiple(query, by)
    //     .then(response => {
    //         console.log(response.data);
    //         setInvestors(response.data.investors);
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     });
    //     console.log(searchLocation)
    // };





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

            <div className="row pb-1">
            {/* <div className="input-group col-lg"> */}
                {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Search by location"
                    value={searchLocation}
                    // onChange={onChangeSearchLocation}
                /> */}
                
                {/* </div> */}

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
                {/* <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByInvestmentSize}
                >
                  Search by Investment Size
                </button>
                </div> */}
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

            {/* <div className="input-group col-lg">
              <select onChange={onChangeSearchType}>
                 {types.map(type => {
                   return (
                    <option value={type}> {type} </option>
                  )
                 })}
              </select>
              <select onChange={onChangeSearchLocation}>
                 {locations.map(location => {
                   return (
                    <option value={location}> {location} </option>
                  )
                 })}
              </select>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByMultiple}
                >
                  Search
                </button>
              </div>
            </div> */}

            </div>

            {/* <div className="input-group col-lg">
            <input 
                id="typeinp" 
                type="range" 
                min="0" max="5" 
                // value={this.state.value} 
                // onChange={this.handleChange}
                step="1"/>
            </div> */}

            
            <div className="row">
                {investors.map((investor) => {
                    return (
                        <div className="col-lg-4 pb-1">
                        {/* <div className="card">
                        <div className="card-body"> */}
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
                                // setInvestorInvestmentMin(investor["Investment Size Min"])
                                // setInvestorInvestmentMax(investor["Investment Size Max"])
                                setModalOpen(true)
                                Modal(modalOpen)

                            }}
                        >
                        view details
                        </button>

                        {/* <p className="card-text"> */}
                        {/* <strong>Investor: </strong>{investor.Firm}<br/> */}
                            {/* <strong>Investor Type: </strong>{investor.Type}<br/>
                            <strong>Location: </strong>{investor.HQ}<br/>
                            <strong>Industry: </strong>{investor['Preferred Sectors']}<br/>
                            <strong>Investment Size: </strong>{investor['Preferred Investment Size']}<br/>
                            <strong>Description: </strong>{investor['Description']} */}
                        {/* </p> */}
                        {/* </div>
                        </div> */}
                        
                        </div>
                    );
                })}
            </div>



        {/* {modalOpen && <Modal setOpenModal={setModalOpen} />} */}
        {modalOpen && Modal(modalOpen)}



        </div>
        
      )
}

export default InvestorsList;
