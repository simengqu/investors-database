let investors

export default class InvestorsDAO {
    static async injectDB(conn) {
        if (investors) {
            return
        }
        try {
            investors = await conn.db(process.env.INVESTORS_NS).collection("investors")
            // investors.updateMany(
            //     { },
            //     [
            //     {
            //       '$addFields': {
            //         'Investment Size Min Double': {
            //           '$toDouble': '$Investment Size Min'
            //         }
            //       }
            //     }, {
            //       '$addFields': {
            //         'Investment Size Max Double': {
            //           '$toDouble': '$Investment Size Max'
            //         }
            //       }
            //     }
            //   ])
            // investors.updateMany(
            //     // {'HQ': {$exists: false}},
            //     // {$set: {'HQ': ''}}
            //     {'HQ': ''},
            //     {$unset: {'HQ': ''}}
            // )
            // investors.updateMany(
            //     // {'Preferred Sectors': {$exists: false}},
            //     // {$set: {'Preferred Sectors': ''}}
            //     {'Preferred Sectors': ''},
            //     {$unset: {'Preferred Sectors': ''}}
            // )
            // investors.updateMany(
            //     {'HQ': {$exists: false}},
            //     {$set: {'HQ': ''}}
            //     // {'HQ': ''},
            //     // {$unset: {'HQ': ''}}
            // )
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in investorsDAO: ${e}`,
            )
        }
    }

    static async getInvestors({
        filters = null,
        page = 0,
        investorsPerPage = 20,
    } = {}) {
        let query
        
        // let filtersLocation
        // let filtersInudstry
        // let filtersInvestment
        // if (filters["location"] == { '$regex': '' }) {
        //     filtersLocation = "Firm"
        // } else {
        //     filtersLocation = "HQ"
        // }
        // if (filters["industry"] == {$regex: ""}) {
        //     filtersInudstry = "Firm"
        // } else {
        //     filtersInudstry = "Preferred Sectors"
        // }
        // if (filters["investmentSize"] == {$regex: ""}) {
        //     filtersInvestment = "Firm"
        // } else {
        //     filtersInvestment = "Preferred Investment Size"
        // }
        if (filters) {
            query = {
                    "Type": filters["type"],
                    'Investment Size Min': filters["investmentSizeMin"],
                    'Investment Size Max': filters["investmentSizeMax"],
                    $and : [
                        {$or: [
                            {"Preferred Sectors": filters["industry"]},
                            {"Preferred Sectors": {$exists: false}}
                        ]},
                    // "Preferred Investment Size": filters["investmentSize"],
                    
                        {$or: [
                            {"HQ": filters["location"]},
                            {"HQ": {$exists: false}}
                        ]},
                    ],
                    // "HQ": filters["location"]
                
                    // 
                
            }

            
            // console.log(query)
            // if ("type" in filters) {
            //     query = { "Type": { $eq: filters["type"]} }
            // } else if ("industry" in filters) {
            //     query = { "Preferred Sectors": {$eq: filters["industry"]}}
            // } else if ("investmentSize" in filters) {
            //     query = { "Preferred Investment Size": {$eq: filters["investmentSize"]}}
            // } else if ("location" in filters) {
            //     query = { "HQ": {$eq: filters["location"]}}
            // }
        }   
        console.log(filters)
        console.log(query)
        // console.log(filters["location"])
        // console.log(filtersLocation)
        let cursor

        try {
            cursor = await investors.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { investorsList: [], totalNumInvestors: 0}
        }

        const displayCursor = cursor.limit(investorsPerPage).skip(investorsPerPage * page)

        try {
            const investorsList = await displayCursor.toArray()
            const totalNumInvestors = await investors.countDocuments(query)

            return { investorsList, totalNumInvestors }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { investorsList: [], totalNumInvestors: 0 }
        }
    }

    // static async getInvestorByID(id)
    static async getTypes() {
        let types = []
        try {
            types = await investors.distinct("Type")
            return types
        } catch(e) {
            console.error(`Unable to get types, ${e}`)
            return types
        }
    }

    static async getLocations() {
        let locations = []
        try {
            locations = await investors.distinct("HQ")
            return locations
        } catch(e) {
            console.error(`Unable to get locations, ${e}`)
            return locations
        }
    }

    static async getIndustry() {
        let industry = []
        try {
            industry = await investors.distinct("Distinct Sectors")
            return industry
        } catch(e) {
            console.error(`Unable to get industry, ${e}`)
            return industry
        }
    }

    static async getInvestmentSize() {
        let investmentSize = []
        try {
            investmentSize = await investors.distinct("Preferred Investment Size")
            return investmentSize
        } catch(e) {
            console.error(`Unable to get investment size, ${e}`)
            return investmentSize
        }
    }
}