import http from "../http-common";

// api calls
class InvestorDataService {
    getAll(page = 0) {
      return http.get(`?page=${page}`);
    }

    get(id) {
      return http.get(`/id/${id}`);
    }
    
    find(query, by = "type", page = 0) {
      return http.get(`?${by}=${query}&page=${page}`);
    } 

    findMultiple(query, by, page = 0) {
      return http.get(`?${by[0]}=${query[0]}&${by[1]}=${query[1]}&${by[2]}=${query[2]}&${by[3]}=${query[3]}&${by[4]}=${query[4]}&page=${page}`);
    } 
    
    getTypes(id) {
      return http.get(`/types`);
    }

    getLocations(id) {
      return http.get(`/locations`);
    }

    getIndustry(id) {
      return http.get(`/industry`);
    }
    getInvestmentSize(id) {
      return http.get(`/investmentSize`);
    }
}

export default new InvestorDataService();