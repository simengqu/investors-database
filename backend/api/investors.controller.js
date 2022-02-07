import InvestorsDAO from "../dao/investorsDAO.js"

export default class InvestorsController {
    static async apiGetInvestors(req, res, next) {
        const investorsPerPage = req.query.investorsPerPage ? parseInt(req.query.investorsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        // let filters = {}
        // if (req.query.type) {
        //     filters.type = req.query.type
        // } else if (req.query.industry) {
        //     filters.industry = req.query.industry
        // } else if (req.query.investmentSize) {
        //     filters.investmentSize = req.query.investmentSize
        // } else if (req.query.location) {
        //     filters.location = req.query.location
        // }

        console.log(req.query)
        let filters = {}
        if (req.query.type) {
            if (req.query.type != "All Types") {
                filters.type = req.query.type
            } else {
                filters.type = {$regex: ""}
            }
        } else {
            filters.type = {$regex: ""}
        }
        if (req.query.industry) {
            if (req.query.industry != "All Industries") {
                filters.industry = {$regex: req.query.industry, $options: 'i'}
            } else {
                filters.industry = {$regex: ""}
            }
        } else {
            filters.industry = {$regex: ""}
        }
        if (req.query.investmentSize != "All Investment Sizes") {
            filters.investmentSize = req.query.investmentSize
        } else {
            filters.investmentSize = {$regex: ""}
        }
        if (req.query.location) {
            if (req.query.location != "All Locations") {
                filters.location = req.query.location
            } else {
                filters.location = {$regex: ""}
            }
        } else {
            filters.location = {$regex: ""}
        }
        if (req.query.investmentSize) {
            if (req.query.investmentSize != "All Investment Size") {
                if (req.query.investmentSize == "Under $1M") {
                    filters.investmentSizeMin = {$gte: 0}
                    filters.investmentSizeMax = {$lte: 1}
                } else if (req.query.investmentSize == "$1M to $10M") {
                    filters.investmentSizeMin = {$lte: 10}
                    filters.investmentSizeMax = {$gte: 1}
                } else if (req.query.investmentSize == "$10M to $100M") {
                    filters.investmentSizeMin = {$lte: 100}
                    filters.investmentSizeMax = {$gte: 10}
                } else if (req.query.investmentSize == "Above $100M") {
                    filters.investmentSizeMin = {$gte: 0}
                    filters.investmentSizeMax = {$gte: 100}
                }
                // ["Under $1M", "$1M to $10M", "$10M to $100M","Above $100M"]
            } else {
                filters.investmentSizeMin = {$regex: ""}
                filters.investmentSizeMax = {$regex: ""}
            }
        }
        if (req.query.text) {
                const searchTextNoSpaces = req.query.text.replace(/\s+/g, '')
                if (searchTextNoSpaces.length == 0) {
                    filters.text = ""
                } else {
                    filters.text = req.query.text
                }
        } else {
            filters.text = ""
        }

        const { investorsList, totalNumInvestors } = await InvestorsDAO.getInvestors({
            filters,
            page,
            investorsPerPage,
        })

        let response = {
            investors: investorsList,
            page: page,
            filters: filters,
            entries_per_page: investorsPerPage,
            total_results: totalNumInvestors,
        }
        res.json(response)
    }

    static async apiGetInvestorType(req, res, next) {
        try {
            let types = await InvestorsDAO.getTypes()
            res.json(types)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetInvestorIndustry(req, res, next) {
        try {
            let industry = await InvestorsDAO.getIndustry()
            res.json(industry)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetInvestorInvestmentSize(req, res, next) {
        try {
            let investmentSize = await InvestorsDAO.getInvestmentSize()
            res.json(investmentSize)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetInvestorLocation(req, res, next) {
        try {
            let types = await InvestorsDAO.getLocations()
            res.json(types)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
    
}